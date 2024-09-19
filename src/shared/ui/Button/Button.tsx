import cls from './Button.module.css'
import {type ButtonHTMLAttributes, type FC} from 'react'
import {classNames} from "../../lib/classNames.ts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}
export const Button: FC<ButtonProps> = (props) => {
    const { className, children, ...otherProps } = props
    return (
        <button {...otherProps} className={classNames(cls.button, {},[className!])}>
            {children}
        </button>
    )
}
