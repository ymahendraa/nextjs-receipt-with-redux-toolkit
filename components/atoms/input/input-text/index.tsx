import React from 'react'
import Label from '../../label'

type InputTextProps = {
  classNameInput?: string
  classNameWrapper?: string
  label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

/**
 * @description
 * InputText component is a component that is used to create a text input field.
 * @param className className for input text
 * @param classNameWrapper classNameWrapper for input text
 * @param label label for input text
 * @param props props for input text
 * @returns InputText component
 * 
 * @example
 * <InputText
 *  className='w-full h-10 border border-gray-300 rounded-md px-2'
 * />
 */
const InputText: React.FC<InputTextProps> = ({
  classNameInput,
  classNameWrapper,
  label,
  ...props
}) => {
  const config = {
    classNameInput: classNameInput ?? 'w-full h-8 border border-gray-300 rounded-md px-2 text-black text-lg focus:border-primary focus:outline-none',
    classNameWrapper: classNameWrapper ?? 'flex flex-col gap-y-1'
  }
  return (
    <div className={config.classNameWrapper}>
      {label && <Label label={label} name={props.name} aria-required={props['aria-required']} />}
      <input
        id={props.name}
        className={`${config.classNameInput} `}
        {...props}
      />
    </div>
  )
}

export default InputText