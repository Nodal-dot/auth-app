import {memo} from 'react'
import './Label.css'

interface LabelProps {
    text: string;
    htmlFor?: string;
}

export const Label = memo((props: LabelProps) => {
    const { text, htmlFor } = props
    return (
        <label className={"label"} htmlFor={htmlFor}>
            {text}
        </label>
    )
})
