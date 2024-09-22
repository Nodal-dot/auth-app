import {FormCheckbox, FormFields, FormSubmission} from "../../../features/Register";
import {FC, useState} from "react";
import useFormFields from "../../../features/Register/useFormFields.ts";
import cls from './RegisterForm.module.css'
import {CurrentValues, FormData} from "../../../shared/types/register/types.ts";

interface RegisterFormProps {
    handleClick: (data:CurrentValues) => void;
    formData: FormData[];
    userInputValues:CurrentValues
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
    const {formData, handleClick,userInputValues } = props
    const {
        fields,
        errors,
        handleSubmit,
        handleChange,
        selectValues,
        currentValues,
        handleSelectChange
    } = useFormFields(formData, handleClick,userInputValues );
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    }
    return (
        <form className={cls.form} onSubmit={handleSubmit}>
            <FormFields selectValues={selectValues} handleSelectChange={handleSelectChange}
                        currentValues={currentValues} handleChange={handleChange} fields={fields} errors={errors}/>
            <FormCheckbox handleCheckboxClick={handleCheckboxClick}/>
            <FormSubmission isActive={isChecked}/>
        </form>
    );
};

export default RegisterForm;