import cls from './Button.module.css'
import {type ButtonHTMLAttributes, type FC} from 'react'
import {classNames} from "../../lib/classNames.ts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    isActive?:boolean
}
export const Button: FC<ButtonProps> = (props) => {
    const { className, children,isActive, ...otherProps } = props
    return (
        <button disabled={!isActive} {...otherProps} className={classNames(cls.button, {},[className!])}>
            {children}
        </button>
    )
}
