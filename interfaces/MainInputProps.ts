import { InputHTMLAttributes } from "react";

export interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    // multiple: boolean,
    view?: 'underline' | 'box',
}