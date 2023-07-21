import { Period } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/select';

type Props = {
  value: Period;
  onChange: (value: Period) => void;
};

export function PeriodSelector(props: Props) {
  const { value, onChange } = props;

  return (
    <Select
      value={value}
      onValueChange={(value: Period) => onChange(value)}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="period" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Period).map((period) => (
          <SelectItem
            key={period}
            value={period}
          >
            {period}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
