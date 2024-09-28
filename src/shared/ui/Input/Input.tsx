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
    className?: string
    value?:string
}

const themeClasses = {
    [InputTheme.CLEAR]: cls.clear,
    [InputTheme.OUTLINE]: cls.outline,
}
export const Input = memo((props: InputProps) => {
    const { theme = InputTheme.OUTLINE,value,className,...otherProps} = props
    return (
        <input  value={value} className={classNames(cls.input,{},[themeClasses[theme],className!])}
               {...otherProps}
        />
    )
})
