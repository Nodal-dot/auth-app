import {type InputHTMLAttributes, memo} from 'react'
import cls from './Input.module.css'
import {classNames} from "../../lib/classNames.ts";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>

export enum InputTheme {
    CLEAR = 'clear',
    OUTLINE=  'outline'
}

interface InputProps extends HTMLInputProps {
    theme?: InputTheme
    name?: string
    type?: string;
    placeholder?: string
    id?:string
    className?: string
}

const themeClasses = {
    [InputTheme.CLEAR]: cls.clear,
    [InputTheme.OUTLINE]: cls.outline,
}
export const Input = memo((props: InputProps) => {
    const { placeholder,theme = InputTheme.OUTLINE,className, type = 'text',onBlur, onChange,name} = props
    return (
        <input className={classNames(cls.input,{},[themeClasses[theme],className!])}
               type={type}
               placeholder={placeholder}
               onChange={onChange}
               name={name}
               onBlur={onBlur}
        />
    )
})
