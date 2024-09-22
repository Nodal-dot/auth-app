import {FC, useEffect, useState} from "react";
import cls from './RegisterPage.module.css'
import IMAGES from "../../../shared/assets/images/images.ts";
import {Spinner} from "../../../shared/ui/Spinner/Spinner.tsx";
import {CurrentValues, FormData} from '../../../shared/types/register/types.ts'
import RegisterSuccess from "../../../widgets/RegisterSuccess/ui/RegisterSuccess.tsx";
import {RegisterForm} from "../../../widgets/RegisterForm";
import {getFormData} from "../../../shared/api/register/registerFormApi.ts";

interface RegisterPageProps {
    showToast: (text:string)=> void
}

const RegisterPage: FC<RegisterPageProps> = ({showToast}) => {
    const [formData, setFormData] = useState<FormData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userInputValues, setUserInputValues] = useState<CurrentValues>({});

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
        setTimeout(() => {
            showToast('Произошла ошибка!')
            setIsSubmitting(false);
            setIsRegistered(true);
        }, 1000);
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
        </div>
    );
}

export default RegisterPage;