type Props = {
    label: string;
    required?: boolean;
    placeholder?: string;
    textarea?: boolean;
  };
  
  export function FormItem({
    label,
    required,
    placeholder,
    textarea,
  }: Props) {
    return (
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">必須</span>}
        </label>
  
        {textarea ? (
          <textarea
            className="w-full border rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        ) : (
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
  