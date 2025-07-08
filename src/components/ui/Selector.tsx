import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectorProps {
  placeholder?: string;
  items: { value: any; label: string }[];
  value?: any;
  defaultValue?: any;
  onValueChange?: (value: any) => void;
  key?: string | number;
}

const Selector: React.FC<SelectorProps> = ({ placeholder, items, value, defaultValue, onValueChange, key }) => {
  const selectItems = items.map((item, index) => (
    <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
  ))

  return (
    <Select key={key} value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className='w-fit gap-2'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectItems}
      </SelectContent>
    </Select>
  );
};

export default Selector;
