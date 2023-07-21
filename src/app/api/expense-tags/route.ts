import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { expenseTagCreateDtoSchema } from '~/features/expense-tag/create/model';
import { getAuthSession } from '~/shared/auth';
import { db } from '~/shared/db';

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    const expenseTags = await db.expenseTag.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
    });

    return NextResponse.json(expenseTags, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    const dto = await request.json();

    const validatedDto = expenseTagCreateDtoSchema.parse(dto);

    const tag = await db.expenseTag.create({
      data: {
        label: validatedDto.label,
        color: validatedDto.color,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    revalidatePath('/expenses');
    revalidatePath('/expenses/create');

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
