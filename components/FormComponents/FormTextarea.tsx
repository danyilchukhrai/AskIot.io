import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Textarea, { ITextareaProps } from '../Textarea';

interface IFormTextareaProps extends ITextareaProps {}

const FormTextarea: FC<IFormTextareaProps> = (props) => {
  const { name = '' } = props;
  const { control } = useFormContext();
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex flex-col w-full">
      <Textarea {...props} {...inputProps} ref={ref} />
      {invalid && <p className="text-red-500 mt-2 text-s">{error?.message}</p>}
    </div>
  );
};

export default FormTextarea;
