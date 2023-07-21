'use client';

import { useCallback, useState } from 'react';
import { CgMathPlus } from 'react-icons/cg';
import { buttonVariants } from '~/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import { IncomeTagCreateForm } from './income-tag-create-form';

export function IncomeTagCreateDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        className={buttonVariants({
          variant: 'outline',
          className: 'flex items-center gap-2',
        })}
      >
        <span>Create new income tag</span> <CgMathPlus size="1.25rem" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create income tag</DialogTitle>
        </DialogHeader>
        <IncomeTagCreateForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
