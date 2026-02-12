type Props = {
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: number;
  error?: string | null;
  onChange?: (value: number) => void;
};

export const FormItem_int = ({
  label,
  required,
  placeholder,
  value,
  error,
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
        value={value || ''}
        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            onChange?.(0);
          } else {
            onChange?.(parseInt(value));
          }
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
