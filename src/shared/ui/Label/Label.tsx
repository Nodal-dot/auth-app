import {memo} from 'react'
import cls from './Label.module.css'

interface LabelProps {
    text: string;
    htmlFor?: string;
}

export const Label = memo((props: LabelProps) => {
    const { text, htmlFor } = props
    return (
        <label className={cls.label} htmlFor={htmlFor}>
            {text}
        </label>
    )
})
