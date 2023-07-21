import { IncomeTag } from '@prisma/client';
import { getContrastTextColor } from '~/shared/lib/get-contrast-text-color';

type Props = {
  tag: IncomeTag;
};

export function IncomeTagBadge(props: Props) {
  const { tag } = props;

  return (
    <span
      className="block rounded-lg p-1"
      style={{
        backgroundColor: tag.color,
        color: getContrastTextColor(tag.color),
      }}
    >
      {tag.label}
    </span>
  );
}
