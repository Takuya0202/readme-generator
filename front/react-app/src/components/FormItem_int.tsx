type Props = {
  label: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: number) => void;
};

export const FormItem_int = ({
  label,
  required,
  placeholder,
  onChange,
}: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="number"
        min="0"
        step="1"
        placeholder={placeholder}
        className="w-full border rounded p-2"
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            onChange?.(0);
          } else {
            onChange?.(parseInt(value));
          }
        }}
      />
    </div>
  );
};
