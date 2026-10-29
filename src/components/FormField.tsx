const  FormField = ({
  label, type = "text", value, onChange, placeholder, required = true, minLength,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; minLength?: number;
}) => {
  return (
    <label className="flex flex-col gap-1">

      <span className="text-sm font-medium leading\-[21px]">{label}</span>
      <input
        type={type}

        value={value}
        required={required}

        minLength={minLength}
        placeholder={placeholder}
        
        onChange={(e) => onChange(e.target.value)}

        className="input h-10 w-full rounded-lg border-base-content/20 bg-base-100 text-sm placeholder:text-base-content/50"
      />
    </label>
  );
}

export default FormField;
