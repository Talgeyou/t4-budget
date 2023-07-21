import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { expenseUpdateDtoSchema } from '~/features/expense/update';
import { getAuthSession } from '~/shared/auth';
import { db } from '~/shared/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { expenseId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 500 });
    }

    const { expenseId } = params;

    const expense = await db.expense.findUnique({
      where: {
        id: expenseId,
      },
      include: {
        user: true,
      },
    });

    if (!expense || expense.user.email !== session.user.email) {
      return NextResponse.json(null, { status: 400 });
    }

    const deletedExpense = await db.expense.delete({
      where: {
        id: expenseId,
      },
    });

    revalidatePath('/expenses');

    return NextResponse.json(deletedExpense, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { expenseId: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return NextResponse.json(null, { status: 401 });
    }

    const { expenseId } = params;

    const dto = await request.json();

    const validatedDto = expenseUpdateDtoSchema.parse(dto);

    const expenseTags = await db.tagOnExpense.findMany({
      where: {
        expense: {
          id: expenseId,
        },
      },
    });

    const tagsToDelete =
      validatedDto.tagIds.length === 0
        ? expenseTags
        : expenseTags.filter(
            (tag) => !validatedDto.tagIds.some((tagId) => tag.tagId === tagId),
          );
    const tagsToCreate = validatedDto.tagIds.filter(
      (tagId) => !expenseTags.some((tag) => tag.tagId === tagId),
    );

    const expense = await db.expense.update({
      where: {
        id: expenseId,
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

    revalidatePath('/expenses');

    return NextResponse.json(expense, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
