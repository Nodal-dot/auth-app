import {ChangeEvent, FC} from 'react';
import {Input} from "../../../shared/ui/Input/Input.tsx";
import {Select} from "../../Select/Select.tsx";
import {Label} from "../../../shared/ui/Label/Label.tsx";
import cls from './FormFields.module.css'
import {CurrentValues, Errors, FormData, SelectValues} from "../../../shared/types/register/types.ts";
import PhoneInput from "../../../shared/ui/InputPhone/InputPhone.tsx";
import Icon from '../../../shared/assets/svg/Vector (2).svg?react'

interface FormFieldsProps {
    fields: FormData[];
    errors: Errors;
    handleChange: (event: ChangeEvent<HTMLInputElement>)=> void
    handleSelectChange : (name: string, value: string) => void
    selectValues:SelectValues
    currentValues: CurrentValues;
}

const FormFields: FC<FormFieldsProps> = (props) => {
    const {selectValues, currentValues, handleSelectChange, fields, errors, handleChange} = props
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
                            className={errors[field.name] ? cls.errorInput : (currentValues[field.name] ? cls.successInput : '')}
                            placeholder={field.label}
                        />
                    ) : field.type === 'phone' ? (
                        <PhoneInput
                            className={errors[field.name] ? cls.errorInput : ''}
                            onChange={handleChange}
                            name={field.name}
                        />
                    ) : (
                        <>
                            <Input
                                value={currentValues[field.name]}
                                className={errors[field.name] ? cls.errorInput : (currentValues[field.name] ? cls.successInput : '')}
                                onChange={handleChange}
                                onBlur={handleChange}
                                placeholder={field.label}
                                name={field.name}
                                type={field.type}
                            />
                            {currentValues[field.name] && !errors[field.name] && <Icon className={cls.successIcon}/>}
                        </>

                    )}
                    {errors[field.name] && <div className={cls.error}>{errors[field.name]}</div>}
                </div>
            ))}
        </div>
    );
};

export default FormFields;