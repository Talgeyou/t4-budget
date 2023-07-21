import { VariantProps, cva } from 'class-variance-authority';
import { Skeleton } from '~/shared/ui/skeleton';

const variants = cva('rounded-full', {
  variants: {
    size: {
      DEFAULT: 'h-10 w-10',
      lg: 'h-16 w-16',
    },
  },
  defaultVariants: {
    size: 'DEFAULT',
  },
});

type Props = {} & VariantProps<typeof variants>;

export function UserAvatarSkeleton(props: Props) {
  const { size } = props;

  return <Skeleton className={variants({ size })} />;
}
