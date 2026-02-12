type Props = {
  label: string;
  textarea?: boolean;
  required?: boolean;
  value?: string;
  error?: string | null;
  onChange?: (value: string) => void;
};

export const FormItem = ({
  label,
  textarea,
  required,
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

      {textarea ? (
        <textarea
          value={value}
          className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value}
          className={`w-full border rounded p-2 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
