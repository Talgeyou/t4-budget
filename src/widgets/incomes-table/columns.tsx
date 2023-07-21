import { Income, IncomeTag, TagOnIncome } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { CgMoreVertical } from 'react-icons/cg';
import { IncomeUpdateForm } from '~/features/income/update';
import { IncomeTagCreateDialog } from '~/features/income-tag/create';
import { sortByConvertedCurrencyValue } from '~/entities/currency';
import { IncomeTagBadge } from '~/entities/income-tag';
import { getFormattedMoney } from '~/shared/lib/get-formatted-money';
import { Button } from '~/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import { CurrenciesData } from '~/shared/api/fetch-currencies';

const COLUMN_IDS = {
  Tags: 'TAGS',
};

type GetIncomesColumnsParams = {
  currenciesData?: CurrenciesData;
  onDelete: (incomeId: string) => void;
};

export function getIncomesColumns(params: GetIncomesColumnsParams): ColumnDef<
  Income & {
    tags: (TagOnIncome & {
      tag: IncomeTag;
    })[];
  }
>[] {
  const { currenciesData, onDelete } = params;

  return [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      id: COLUMN_IDS.Tags,
      accessorFn: ({ tags }) => tags.map((tag) => tag.tag.label),
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.original.tags;

        return (
          <ul className="flex flex-wrap gap-2">
            {tags.map((item) => (
              <li key={item.id}>
                <IncomeTagBadge tag={item.tag} />
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
        const income = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full flex justify-end">
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
                    <DialogTitle>
                      Update income {row.original.title}
                    </DialogTitle>
                  </DialogHeader>
                  <IncomeTagCreateDialog />
                  <IncomeUpdateForm income={row.original} />
                </DialogContent>
              </Dialog>

              <DropdownMenuItem onClick={() => onDelete(income.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
