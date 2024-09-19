import {FormCheckbox, FormFields, FormSubmission} from "../../../features/Register";
import {FC} from "react";
import useFormFields from "../../../features/Register/useFormFields.ts";
import cls from './RegisterForm.module.css'
import {FormData} from "../../../features/Register/types.ts";

interface RegisterFormProps {
    handleClick: () => void;
    formData: FormData[];
}

const RegisterForm: FC<RegisterFormProps> = ({ formData, handleClick }) => {
    const { fields, errors, handleSubmit, handleChange, selectValues, handleSelectChange } = useFormFields(formData, handleClick);

    return (
        <form className={cls.form} onSubmit={handleSubmit}>
            <FormFields selectValues={selectValues} handleSelectChange={handleSelectChange} handleChange={handleChange} fields={fields} errors={errors} />
            <FormCheckbox />
            <FormSubmission />
        </form>
    );
};

export default RegisterForm;