import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { createIncomeDtoSchema } from '~/features/income/create';
import { getAuthSession } from '~/shared/auth';
import { db } from '~/shared/db';

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    const incomes = await db.income.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(incomes, { status: 200 });
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

    const validatedDto = createIncomeDtoSchema.parse(dto);

    const income = await db.income.create({
      data: {
        title: validatedDto.title,
        description: validatedDto.description,
        user: {
          connect: {
            email: session.user.email,
          },
        },
        tags: validatedDto.tagIds.length
          ? {
              createMany: {
                data: validatedDto.tagIds.map((tagId) => ({
                  tagId,
                })),
              },
            }
          : undefined,
        currency: validatedDto.currency,
        period: validatedDto.period,
        value: validatedDto.value,
      },
    });

    revalidatePath('/incomes');

    return NextResponse.json(income, { status: 201 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
