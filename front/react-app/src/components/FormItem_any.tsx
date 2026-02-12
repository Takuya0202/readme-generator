type Props = {
  label: string;
  textarea?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export const FormItem_any = ({
  label,
  textarea,
  placeholder,
  onChange,
}: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-600">
        {label}
      </label>

      {textarea ? (
        <textarea
          placeholder={placeholder}
          className="w-full border rounded p-2"
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border rounded p-2"
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
};
