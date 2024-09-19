import {Button} from "../../../shared/ui/Button/Button.tsx";
import cls from './FormSubmission.module.css'
import {FC} from "react";
const FormSubmission: FC = () => {
    return (
        <div className={cls.submit}>
            <Button type="submit">РЕГИСТРАЦИЯ</Button>
        </div>
    );
};

export default FormSubmission;