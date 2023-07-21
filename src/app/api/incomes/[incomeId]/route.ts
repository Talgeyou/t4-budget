import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { incomeUpdateDtoSchema } from '~/features/income/update';
import { getAuthSession } from '~/shared/auth';
import { db } from '~/shared/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { incomeId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 500 });
    }

    const { incomeId } = params;

    const income = await db.income.findUnique({
      where: {
        id: incomeId,
      },
      include: {
        user: true,
      },
    });

    if (!income || income.user.email !== session.user.email) {
      return NextResponse.json(null, { status: 400 });
    }

    const deletedIncome = await db.income.delete({
      where: {
        id: incomeId,
      },
    });

    revalidatePath('/incomes');

    return NextResponse.json(deletedIncome, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { incomeId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    const { incomeId } = params;

    const dto = await request.json();

    const validatedDto = incomeUpdateDtoSchema.parse(dto);

    const incomeTags = await db.tagOnIncome.findMany({
      where: {
        income: {
          id: incomeId,
        },
      },
    });

    const tagsToDelete =
      validatedDto.tagIds.length === 0
        ? incomeTags
        : incomeTags.filter(
            (tag) => !validatedDto.tagIds.some((tagId) => tag.tagId === tagId),
          );
    const tagsToCreate = validatedDto.tagIds.filter(
      (tagId) => !incomeTags.some((tag) => tag.tagId === tagId),
    );

    const income = await db.income.update({
      where: {
        id: incomeId,
      },
      data: {
        title: validatedDto.title,
        description: validatedDto.description,
        user: {
          connect: {
            email: session.user.email,
          },
        },
        tags: {
          deleteMany:
            tagsToDelete.length > 0
              ? {
                  OR: tagsToDelete.map((tag) => ({
                    id: tag.id,
                  })),
                }
              : undefined,
          createMany:
            tagsToCreate.length > 0
              ? {
                  data: tagsToCreate.map((tagId) => ({
                    tagId,
                  })),
                }
              : undefined,
        },
        currency: validatedDto.currency,
        period: validatedDto.period,
        value: validatedDto.value,
      },
    });

    revalidatePath('/incomes');

    return NextResponse.json(income, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
