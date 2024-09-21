import cls from './FormCheckbox.module.css'
import {Checkbox} from "../../../shared/ui/Checkbox/Checkbox.tsx";
import {FC} from "react";

interface FormCheckboxProps {
    handleCheckboxClick: () => void
}

const FormCheckbox: FC<FormCheckboxProps> = ({handleCheckboxClick}) => {
    return (
        <div className={cls.checkboxContainer}>
            <Checkbox id={'formCheckbox'} onClick={handleCheckboxClick}/>
            <label htmlFor={'formCheckbox'} className={cls.textForm}>Я подтверждаю, что даю согласие на <span
                className={cls.textHighlight}>обработку персональных данных</span></label>
        </div>
    );
};

export default FormCheckbox;