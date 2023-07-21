import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { incomeTagCreateDtoSchema } from '~/features/income-tag/create/model';
import { getAuthSession } from '~/shared/auth';
import { db } from '~/shared/db';

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    const incomeTags = await db.incomeTag.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
    });

    return NextResponse.json(incomeTags, { status: 200 });
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

    const validatedDto = incomeTagCreateDtoSchema.parse(dto);

    const tag = await db.incomeTag.create({
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

    revalidatePath('/incomes');
    revalidatePath('/incomes/create');

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
