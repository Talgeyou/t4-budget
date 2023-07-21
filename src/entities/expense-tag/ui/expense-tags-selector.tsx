'use client';

import { useCallback } from 'react';
import { ExpenseTag } from '@prisma/client';
import { buttonVariants } from '~/shared/ui/button';
import { Checkbox } from '~/shared/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '~/shared/ui/popover';

type Props = {
  value: string[];
  options: ExpenseTag[];
  onChange: (value: string[]) => void;
};

export function ExpenseTagsSelector(props: Props) {
  const { value, options, onChange } = props;

  const handleClick = useCallback(
    (tagId: string, checked: boolean) => {
      const isSelected = value.some((item) => item === tagId);

      if (isSelected && !checked) {
        onChange(value.filter((item) => item !== tagId));
      }

      if (!isSelected && checked) {
        onChange([...value, tagId]);
      }
    },
    [onChange, value],
  );

  return (
    <Popover modal>
      <PopoverTrigger
        className={buttonVariants({
          variant: 'outline',
          className: 'font-normal',
        })}
      >
        {value && value.length ? (
          <ul className="flex flex-wrap gap-2">
            {value.map((tagId) => {
              const tag = options.find((tag) => tag.id === tagId);

              return (
                <li
                  className="p-1 rounded-lg"
                  key={tagId}
                  style={{ backgroundColor: tag?.color }}
                >
                  {tag?.label ?? tagId}
                </li>
              );
            })}
          </ul>
        ) : (
          'Select tags...'
        )}
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          {options.map((tag) => (
            <li key={tag.id}>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={value.some((tagId) => tagId === tag.id)}
                  onCheckedChange={(checked) =>
                    handleClick(
                      tag.id,
                      typeof checked === 'boolean' ? checked : false,
                    )
                  }
                />
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: tag.color }}
                />
                <span>{tag.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
