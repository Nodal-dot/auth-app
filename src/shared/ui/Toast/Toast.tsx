import cls from './Toast.module.css'
import {FC} from "react";
import {Portal} from "../Portal/Portal.tsx";
interface ToastProps {
    message: string;
}

const Toast: FC<ToastProps> = ( props) => {
    const {message} = props
    return (

        <Portal>
            <div className={cls.toast}>
                <span className={cls.toastIcon}>i</span>
                <span>{message}</span>
            </div>

        </Portal>
)
    ;
};

export default Toast;