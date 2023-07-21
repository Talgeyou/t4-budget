import { VariantProps, cva } from 'class-variance-authority';
import { CgUser } from 'react-icons/cg';
import { Avatar, AvatarFallback, AvatarImage } from '~/shared/ui/avatar';

const variants = cva('', {
  variants: {
    size: {
      DEFAULT: 'w-10 h-10',
      lg: 'w-16 h-16',
    },
  },
  defaultVariants: {
    size: 'DEFAULT',
  },
});

type Props = {
  user: {
    name?: string | null;
    image?: string | null;
  };
} & VariantProps<typeof variants>;

export function UserAvatar(props: Props) {
  const { user, size } = props;

  return (
    <Avatar className={variants({ size })}>
      {user.image ? (
        <AvatarImage src={user.image} />
      ) : (
        <CgUser size={'2.5rem'} />
      )}
      <AvatarFallback>
        {user.name
          ?.split(' ')
          .slice(0, 2)
          .map((word) => word.charAt(0).toUpperCase())
          .join('')}
      </AvatarFallback>
    </Avatar>
  );
}
