import {FC} from "react";
import {Button} from "../../../shared/ui/Button/Button.tsx";
import cls from './RegisterSuccess.module.css'

const RegisterSuccess: FC = () => {

    return (
        <div>
            <h1 className={cls.successTitle}>
                Регистрация <br/> прошла успешно!
            </h1>
            <span className={cls.successMessage}>
    Поздравляем, вы успешно зарегистрировались на портале!
    <br/>
    <br/>
    Письмо с подтверждением регистрации было выслано на вашу почту.
  </span>
            <Button className={cls.resendButton}>ОТПРАВИТЬ ПОВТОРНО</Button>
        </div>
    );
};

export default RegisterSuccess;