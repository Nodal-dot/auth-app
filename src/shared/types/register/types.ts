import {Option} from "../../../features/Select/Select.tsx";


export interface FormData {
    type: string;
    label: string;
    required?: boolean;
    name: string;
    values?: string[];
    placeholder?: string;
    options?: Option[]
}
export interface Errors {
    [key: string]: string;
}
export interface SelectValues {
    [key: string]: Option;
}
export interface CurrentValues {
    [key: string]: string;
}