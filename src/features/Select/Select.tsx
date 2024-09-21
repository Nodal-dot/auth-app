import type {MouseEventHandler} from "react";
import {useEffect, useRef, useState} from "react";
import ArrowUpSVG from '../../shared/assets/svg/Vector.svg?react'
import ArrowDownSVG from '../../shared/assets/svg/Vector1.svg?react'
import cls from "./Select.module.css";
import {classNames} from "../../shared/lib/classNames.ts";

export type Option = {
    title: string;
    value: string;
};
type OptionProps = {
    option: Option;
    onClick: (value: Option["value"]) => void;
    onClose: () => void;
};
const Option = (props: OptionProps) => {
    const {
        option: { value, title },
        onClick,
        onClose
    } = props;
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick = (
        clickedValue: Option["value"]
    ): MouseEventHandler<HTMLLIElement> => (event) => {
        event.stopPropagation();
        onClick(clickedValue);
        onClose();
    };


    return (
        <li
            className={classNames(cls.option)}
            value={value}
            onClick={handleClick(value)}
            tabIndex={0}
            data-testid={`select-option-${value}`}
            ref={optionRef}
        >
            {title}
        </li>
    );
};

type SelectProps = {
    selected: Option | null;
    options: Option[];
    placeholder?: string;
    status?: "default" | "invalid";
    onChange?: (selected: Option["value"]) => void;
    className?:string;
};

export const Select = (props: SelectProps) => {
    const {
        options,
        placeholder,
        status = "default",
        selected,
        className,
        onChange,
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    })

    useEffect(() => {
        if (isOpen) {
            const windowHeight = window.innerHeight;
            const selectTop = rootRef.current!.offsetTop + rootRef.current!.offsetHeight;
            const availableSpace = windowHeight - selectTop - 20;
            selectRef.current!.style.maxHeight = `${availableSpace}px`;
        }
    }, [isOpen]);

    const handleOptionClick = (value: Option["value"]) => {
        onChange?.(value);
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const mods = {
        [cls.active] :isOpen
    }
    return (
        <div
            className={classNames(cls.selectWrapper,mods,[className!])}
            ref={rootRef}
            onClick={handlePlaceHolderClick}
        >
            <div className={cls.arrow}>
                {isOpen ? <ArrowDownSVG/> : <ArrowUpSVG/>}
            </div>
            <div
                className={classNames(cls.placeholder, {
                    'data-status-invalid': status === 'invalid',
                    'data-selected': !!selected?.value
                })}
                role="button"
                tabIndex={0}
                ref={placeholderRef}
            >
                {selected?.title || placeholder}
            </div>
            {isOpen && (
                <ul
                    className={cls.select}
                    data-testid="selectDropdown"
                    ref={selectRef}
                >
                    {options.map((option) => (
                        <Option
                            key={option.value}
                            option={option}
                            onClick={handleOptionClick}
                            onClose={handleClose}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};