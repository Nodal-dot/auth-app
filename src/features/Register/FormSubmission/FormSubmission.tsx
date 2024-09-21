import {Button} from "../../../shared/ui/Button/Button.tsx";
import cls from './FormSubmission.module.css'
import {FC} from "react";

interface FormSubmissionProps {
    isActive: boolean
}

const FormSubmission: FC<FormSubmissionProps> = (props) => {
    const {isActive} = props
    return (
        <div className={cls.submit}>
            <Button isActive={isActive} type="submit">РЕГИСТРАЦИЯ</Button>
        </div>
    );
};

export default FormSubmission;