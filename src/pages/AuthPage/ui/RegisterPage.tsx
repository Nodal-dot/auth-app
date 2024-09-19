import {FunctionComponent, useEffect, useState} from "react";
import cls from './RegisterPage.module.css'
import IMAGES from "../../../shared/assets/images/images.ts";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Spinner} from "../../../shared/ui/Spinner/Spinner.tsx";
import {FormData} from '../../../features/Register/types.ts'
import RegisterSuccess from "../../../widgets/RegisterSuccess/ui/RegisterSuccess.tsx";
import {RegisterForm} from "../../../widgets/RegisterForm";
const mock = new MockAdapter(axios);
const data:FormData[] = [
    {
        "type": "string",
        "label": "Ваш ФИО",
        "required": true,
        "name": "name"
    },
    {
        "type": "email",
        "label": "Ваш email",
        "name": "email"
    },
    {
        "type": "password1",
        "label": "Ваш пароль",
        "name": "password1",
        "required": true,
    },
    {
        "type":"password2",
        "label":'Повторите пароль',
        "name":"password2",
        "required": true,
    },
    {
        "type":"phone",
        "label":'Телефон',
        "name":"phone",
        "required": true,
    },
    {
        "type": "select",
        "label": "Выберите пункт из списка",
        "name": "select1",
        "required":true,
        "placeholder": "Выбор",
        "options": [
            { title: "Выбор1", value: "Выбор1" },
            { title: "Выбор2", value: "Выбор2" }
        ]
    }
]

mock.onGet('/api/form').reply(200, data);

const RegisterPage: FunctionComponent = () => {
    const [formData, setFormData] = useState<FormData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        axios.get('/api/form')
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

    const handleRegister = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsRegistered(true);
        }, 10000);
    };

    return (
        <div className={cls.authPage}>
            <div className={cls.imageWrapper}>
                <div className={cls.imageBlock}>
                    <img className={cls.image} src={IMAGES.authImage} alt="auth-image"/>
                </div>
            </div>

            {isLoaded ? (
                isSubmitting ? (
                    <div className={cls.contentContainer}>
                        <div className={cls.authBlock}>
                            <Spinner/>
                        </div>
                    </div>
                ) : isRegistered ? (
                    <div className={cls.contentContainer}>
                        <div className={cls.authBlock}>
                            <RegisterSuccess/>
                        </div>
                    </div>
                ) : (
                    <div className={cls.contentContainer}>
                        <div className={cls.authBlock}>
                            <RegisterForm handleClick={handleRegister} formData={formData}/>
                        </div>
                    </div>
                )
            ) : (
                <Spinner/>
            )}
        </div>
    );
}

export default RegisterPage;