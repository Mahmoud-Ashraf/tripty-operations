import { SelectHTMLAttributes } from "react";

export interface MainSelectProps {
    // multiple: boolean,
    view?: 'underline' | 'box',
    options: MainSelectOption[],
    multi?: boolean,
    name: string,
    onChange: ({ target }: any) => void,
    required: boolean,
    value?: any,
    placeholder: string

}