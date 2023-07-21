import { Expense, ExpenseTag, TagOnExpense } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { CgMoreVertical } from 'react-icons/cg';
import { ExpenseUpdateForm } from '~/features/expense/update';
import { ExpenseTagCreateDialog } from '~/features/expense-tag/create';
import { sortByConvertedCurrencyValue } from '~/entities/currency';
import { ExpenseTagBadge } from '~/entities/expense-tag';
import { getFormattedMoney } from '~/shared/lib/get-formatted-money';
import { Button } from '~/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import { CurrenciesData } from '~/shared/api/fetch-currencies';

const COLUMN_IDS = {
  Tags: 'TAGS',
};

type GetExpensesColumnsParams = {
  currenciesData?: CurrenciesData;
  onDelete: (expenseId: string) => void;
};

export const getExpensesColumns = (
  params: GetExpensesColumnsParams,
): ColumnDef<
  Expense & {
    tags: (TagOnExpense & {
      tag: ExpenseTag;
    })[];
  }
>[] => {
  const { currenciesData, onDelete } = params;

  return [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      id: COLUMN_IDS.Tags,
      accessorFn: ({ tags }) => tags.map((tag) => tag.tag.label),
      getUniqueValues: (row) => {
        const result: string[] = [];

        row.tags.forEach((item) => {
          if (!result.some((label) => label === item.tag.label)) {
            result.push(item.tag.label);
          }
        });

        return result;
      },
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original.tags;

        return (
          <ul className="flex flex-wrap gap-2">
            {tags.map((item) => (
              <li key={item.id}>
                <ExpenseTagBadge tag={item.tag} />
              </li>
            ))}
          </ul>
        );
      },
      enableSorting: false,
      filterFn: 'includesString',
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableSorting: false,
    },
    {
      accessorKey: 'value',
      header: 'Value',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('value'));
        const formatted = getFormattedMoney(amount, row.original.currency);

        return <div className="font-medium">{formatted}</div>;
      },
      sortingFn: (rowA, rowB) => {
        if (!currenciesData) {
          if (rowA.original.value === rowB.original.value) return 0;

          return rowA.original.value < rowB.original.value ? 1 : -1;
        }

        return sortByConvertedCurrencyValue({
          a: rowA.original,
          b: rowB.original,
          currenciesData,
        });
      },
    },
    {
      accessorKey: 'period',
      header: 'Period',
      cell: ({ row }) => {
        const value = String(row.getValue('period'));

        return <div>{`${value.charAt(0)}${value.slice(1).toLowerCase()}`}</div>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const expense = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex w-full justify-end">
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <span className="sr-only">Open menu</span>
                  <CgMoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Dialog>
                <DialogTrigger>Update</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update expense</DialogTitle>
                  </DialogHeader>
                  <ExpenseTagCreateDialog />
                  <ExpenseUpdateForm expense={row.original} />
                </DialogContent>
              </Dialog>
              <DropdownMenuItem onClick={() => onDelete(expense.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
