import { Input } from "./ui/Input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export const SearchBar = ({ value, onChange, autoFocus }: SearchBarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Search characters..."
          value={value}
          onChange={handleChange}
          className="pl-10"
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};
