import {memo} from "react";
import cls from "./Spinner.module.css";

export const Spinner = memo(() => {
    return (
        <div className={cls.ldsRing}>
            <div/>
            <div/>
            <div/>
        </div>
    )
})