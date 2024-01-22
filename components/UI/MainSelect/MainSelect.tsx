import { MainSelectProps } from "@/interfaces/MainSelectProps";
import classes from './main-select.module.scss';
import Select from 'react-select'

const MainSelect = ({
    options,
    // view = 'box',
    multi = false,
    name,
    onChange,
    required = true,
    value,
    placeholder,
}: MainSelectProps) => {

    const handleChange = (e: any) => {
        onChange({ target: { value: e instanceof Array ? e.map((singleValue: any) => singleValue.value) : e.value, name } });
    }
    return (
        <Select
            name={name}
            options={options}
            isMulti={multi}
            closeMenuOnSelect={!multi}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className="react-select-container"
            classNamePrefix="react-select"
        />
    )
}

export default MainSelect;