import cls from './Toast.module.css'
import {FC} from "react";
interface ToastProps {
    message: string;
}

const Toast: FC<ToastProps> = ( props) => {
    const {message} = props
    return (
        <div className={cls.toast}>
            <span className={cls.toastIcon}>i</span>
            <span>{message}</span>
        </div>
    );
};

export default Toast;