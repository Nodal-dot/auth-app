import {ChangeEvent, FC} from 'react';
import {Input} from "../../../shared/ui/Input/Input.tsx";
import {Select} from "../../../shared/ui/Select/Select.tsx";
import {Label} from "../../../shared/ui/Label/Label.tsx";
import cls from './FormFields.module.css'
import {Errors, FormData, SelectValues} from "../types.ts";
import PhoneInput from "../../../shared/ui/InputPhone/InputPhone.tsx";

interface FormFieldsProps {
    fields: FormData[];
    errors: Errors;
    handleChange: (event: ChangeEvent<HTMLInputElement>)=> void
    handleSelectChange : (name: string, value: string) => void
    selectValues:SelectValues
}

const FormFields: FC<FormFieldsProps> = ({ selectValues, handleSelectChange, fields, errors, handleChange }) => {
    return (
        <div className={cls.fields}>
            {fields.map((field) => (
                <div className={cls.field} key={field.name}>
                    <Label  htmlFor={field.name} text={field.label} />
                    {field.type === 'select' ? (
                        <Select
                            options={field.options ?? []}
                            selected={selectValues[field.name] ?? ''}
                            onChange={(option) => {
                                handleSelectChange(field.name, option);
                            }}
                            className={errors[field.name] ? cls.errorInput : ''}
                            placeholder={field.label}
                        />
                    ) : field.type === 'phone' ? (
                        <PhoneInput
                            className={errors[field.name] ? cls.errorInput : ''}
                            onChange={handleChange}
                            name={field.name}
                        />
                    ) : (
                        <Input
                            className={errors[field.name] ? cls.errorInput : ''}
                            onChange={handleChange}
                            onBlur={handleChange}
                            placeholder={field.label}
                            name={field.name}
                            type={field.type}
                        />
                    )}
                    {errors[field.name] && <div className={cls.error}>{errors[field.name]}</div>}
                </div>
            ))}
        </div>
    );
};

export default FormFields;