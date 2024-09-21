import { memo, useState} from 'react';
import cls from './Checkbox.module.css';
import {classNames} from "../../lib/classNames.ts";

interface InputProps {
    value?: string;
    onClick?: ()=> void
    placeholder?: string;
    id?: string;
}

export const Checkbox = memo((props: InputProps) => {
    const { value, placeholder,onClick } = props;
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(!checked);
    };
    const mods = {
        [cls.clicked]: checked
    }
    return (
        <div className={classNames(cls.checkboxWrapper, mods)}>
            <input
                onClick={onClick}
                className={classNames(cls.checkbox)}
                value={value}
                type={'checkbox'}
                placeholder={placeholder}
                checked={checked}
                onChange={handleClick}
            />
        </div>
    );
});