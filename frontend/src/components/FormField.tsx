import { InputHTMLAttributes, forwardRef } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ label, error, ...rest }, ref) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <input ref={ref} className="input-field" {...rest} />
    {error && <p className="field-error">{error}</p>}
  </div>
));

FormField.displayName = "FormField";
export default FormField;
