import {FC, useEffect, useState} from "react";
import cls from './RegisterPage.module.css'
import IMAGES from "../../../shared/assets/images/images.ts";
import {Spinner} from "../../../shared/ui/Spinner/Spinner.tsx";
import {CurrentValues, FormData} from '../../../shared/types/register/types.ts'
import RegisterSuccess from "../../../widgets/RegisterSuccess/ui/RegisterSuccess.tsx";
import {RegisterForm} from "../../../widgets/RegisterForm";
import Toast from "../../../shared/ui/Toast/Toast.tsx";
import {getFormData, postFormData} from "../../../shared/api/register/register.ts";



const RegisterPage: FC = () => {
    const [formData, setFormData] = useState<FormData[]>([]);
    const [isShown, setIsShown] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userInputValues, setUserInputValues] = useState<CurrentValues>({});
    const showToast = (message: string) => {
        setToastMessage(message);
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 3000);
    };
    useEffect(() => {
        getFormData()
            .then(response => {
                if (response.status === 200) {
                    setFormData(response.data);
                    setIsLoaded(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleRegister = (data:CurrentValues) => {
        setUserInputValues(data);
        setIsSubmitting(true);
        postFormData(data).catch((reason)=>{
            const {data} = reason.response
            showToast(data)
        }).finally(()=>{
            setIsSubmitting(false);
            setIsRegistered(true);
        })
    };

    return (
        <div className={cls.authPage}>
            <div className={cls.imageWrapper}>
                <div className={cls.imageBlock}>
                    <img className={cls.image} src={IMAGES.authImage} alt="auth-image"/>
                </div>
            </div>
            {isLoaded && (
                <div className={cls.contentContainer}>
                    <div className={cls.authBlock}>
                        {isSubmitting ? (
                            <Spinner />
                        ) : isRegistered ? (
                            <RegisterSuccess onSendAgain={()=>{
                                setIsSubmitting(false)
                                setIsRegistered(false)
                            }} />
                        ) : (
                            <RegisterForm userInputValues={userInputValues} handleClick={handleRegister} formData={formData} />
                        )}
                    </div>
                </div>
            )}
            {isShown && <Toast message={toastMessage} />}
        </div>
    );
}

export default RegisterPage;