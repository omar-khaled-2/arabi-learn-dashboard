interface FormControlProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  id: string;
  children: React.ReactNode;
  label: string;
}

const FormControl: React.FC<FormControlProps> = ({
  id,
  children,
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2" {...props}>
      <label htmlFor={id} className="text-lg font-thin text-onBackground">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormControl;
