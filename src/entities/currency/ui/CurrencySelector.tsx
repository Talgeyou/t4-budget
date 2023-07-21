import { Currency } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/shared/ui/select';

type Props = {
  value: Currency;
  onChange: (value: Currency) => void;
};

export function CurrencySelector(props: Props) {
  const { value, onChange } = props;

  return (
    <Select
      value={value}
      onValueChange={(value: Currency) => onChange(value)}
    >
      <SelectTrigger className="w-20">
        <SelectValue placeholder="currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Currency).map((currency) => (
          <SelectItem
            key={currency}
            value={currency}
          >
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
