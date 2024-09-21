import {useState, ChangeEvent, FC} from 'react';
import cls from './InputPhone.module.css'
import {classNames} from "../../lib/classNames.ts";
interface PhoneInputProps {
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}
const PhoneInput: FC<PhoneInputProps> = (props) => {
    const {  className,onChange, name } = props
    const [value, setValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = (e.target as HTMLInputElement).value.replace(/\D+/g, '');
        const formattedValue = formatPhoneNumber(input);
        setValue(formattedValue);
        if (onChange) {
            onChange(e);
        }
    };


    const formatPhoneNumber = (input: string) => {
        if (input.length === 0) return '';
        if (input[0] === '9') input = '7' + input;
        const firstSymbols = input[0] === '8' ? '8' : '+7';
        let formattedValue = firstSymbols + ' ';
        if (input.length > 1) {
            formattedValue += '(' + input.substring(1, 4);
        }
        if (input.length >= 5) {
            formattedValue += ') ' + input.substring(4, 7);
        }
        if (input.length >= 8) {
            formattedValue += '-' + input.substring(7, 9);
        }
        if (input.length >= 10) {
            formattedValue += '-' + input.substring(9, 11);
        }
        return formattedValue;
    };


    return (
        <input
            type="tel"
            id={name}
            placeholder="+7 (___) ___-__-__"
            maxLength={18}
            value={value}
            name={name}
            onChange={handleInputChange}
            className={classNames(cls.inputPhone,{},[className!]) }
        />
    );
};

export default PhoneInput;