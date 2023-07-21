import { IncomeTag } from '@prisma/client';
import { getContrastTextColor } from '~/shared/lib/get-contrast-text-color';

type Props = {
  tag: IncomeTag;
};

export function IncomeTagBadge(props: Props) {
  const { tag } = props;

  return (
    <span
      className="block p-1 rounded-lg"
      style={{
        backgroundColor: tag.color,
        color: getContrastTextColor(tag.color),
      }}
    >
      {tag.label}
    </span>
  );
}
