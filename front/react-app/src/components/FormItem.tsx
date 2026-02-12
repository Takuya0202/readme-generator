type Props = {
  label: string;
  textarea?: boolean;
  onChange?: (value: string) => void;
};

export const FormItem = ({ label, textarea, onChange }: Props) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      {textarea ? (
        <textarea
          className="w-full border rounded p-2"
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full border rounded p-2"
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </div>
  );
};
