import { ChangeEvent, FormEvent, useState } from 'react';
import { FormData, SelectValues } from './types.ts';
interface CurrentValues {
    [key: string]: string;
}
const useFormFields = (formData: FormData[], handleClick: () => void) => {
    const [fields, ] = useState(formData);
    const [selectValues, setSelectValues] = useState<SelectValues>({});
    const [errors, setErrors] = useState({});
    const [currentValues, setCurrentValues] = useState<CurrentValues>(() =>
        formData.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {})
    );
    const selectFields = formData.filter(item => item.type === 'select').map(item => item.name);

    const checkRequired = (name: string, value: string) => {
        const item = formData.find(item => item.name === name);
        if (item?.required && !value) {
            return 'Это поле обязательно для заполнения';
        }
        if (item?.type === 'string' && !/^[a-zA-Zа-яА-ЯёЁіІїЇґҐ]+$/.test(value)) {
            return 'Это поле должно содержать только буквы';
        }
        if (item?.type === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            return 'Это поле должно содержать действительный email';
        }
        if (item?.type === 'password') {
            const password1 = currentValues['password1'];
            const password2 = currentValues['password2'];
            if (password1 && password2 && password1 !== password2) {
                return 'Пароли не совпадают';
            }
        }
        return '';
    };

    const handleSelectChange = (name: string, value: string) => {
        setSelectValues(prevSelectValues => ({ ...prevSelectValues, [name]: { title: value, value } }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let hasErrors = false;
        const newErrors: { [key: string]: string } = {...errors};
        selectFields.forEach(field => {
            if (!selectValues[field] || !selectValues[field].value) {
                newErrors[field] = 'Это поле обязательно для заполнения';
                hasErrors = true;
            }
        });
        for (const key in currentValues) {
            const item = formData.find(item => item.name === key);
            if (item?.type !== 'select') {
                const error = checkRequired(key, currentValues[key]);
                if (error) {
                    newErrors[key] = error;
                    hasErrors = true;
                } else {
                    newErrors[key] = '';
                }
            }
        }

        setErrors(newErrors);
        if (!hasErrors) {
            handleClick();
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const error = checkRequired(name, value);
        setErrors({ ...errors, [name]: error });
        setCurrentValues({ ...currentValues, [name]: value });
    };

    return { fields, errors, currentValues, selectValues, handleSubmit, handleChange, handleSelectChange };
};

export default useFormFields;