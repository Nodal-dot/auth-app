import {FormCheckbox, FormFields, FormSubmission} from "../../../features/Register";
import {FC, useState} from "react";
import useFormFields from "../../../features/Register/useFormFields.ts";
import cls from './RegisterForm.module.css'
import {FormData} from "../../../features/Register/types.ts";

interface RegisterFormProps {
    handleClick: () => void;
    formData: FormData[];
}

const RegisterForm: FC<RegisterFormProps> = ({ formData, handleClick }) => {
    const { fields, errors, handleSubmit, handleChange, selectValues, handleSelectChange } = useFormFields(formData, handleClick);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    }
    return (
        <form className={cls.form} onSubmit={handleSubmit}>
            <FormFields selectValues={selectValues} handleSelectChange={handleSelectChange} handleChange={handleChange} fields={fields} errors={errors} />
            <FormCheckbox handleCheckboxClick={handleCheckboxClick} />
            <FormSubmission isActive={isChecked} />
        </form>
    );
};

export default RegisterForm;