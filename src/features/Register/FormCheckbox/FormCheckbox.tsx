import cls from './FormCheckbox.module.css'
import {Checkbox} from "../../../shared/ui/Checkbox/Checkbox.tsx";
import {FC} from "react";
const FormCheckbox: FC = () => {
    return (
        <div className={cls.checkboxContainer}>
            <Checkbox id={'formCheckbox'}/>
            <label htmlFor={'formCheckbox'} className={cls.textForm}>Я подтверждаю, что даю согласие на <span
                className={cls.textHighlight}>обработку персональных данных</span></label>
        </div>
    );
};

export default FormCheckbox;