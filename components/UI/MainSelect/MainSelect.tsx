import { MainSelectProps } from "@/interfaces/MainSelectProps";
import classes from './main-select.module.scss';
import Select from 'react-select'
import { useEffect, useState } from "react";

const MainSelect = ({
    options,
    // view = 'box',
    multi = false,
    name,
    onChange,
    required = false,
    value,
    placeholder,
}: MainSelectProps) => {
    const [fieldValue, setFieldValue] = useState();
    const handleChange = (e: any) => {
        console.log(e);
        onChange({ target: { value: e instanceof Array ? e.map((singleValue: any) => singleValue.value) : e.value, name } });
    }

    const handleSelectedValues = () => {
        console.log('handleSelectedValue: ', value);
        if (value) {
            if (value instanceof Array) {
                // if (typeof (value[0]) === 'number') {
                //     return [...value.map(item => )]
                // }
                return [...value.map((item => { return { value: item.id || item, label: item.name || options.find(option => option.value === item)?.label } }))];
            } else {
                const transformedObject: any = {};
                if (typeof (value) === 'number') {
                    console.log('type is number', value);
                    transformedObject.value = value;
                    transformedObject.label = options?.find(option => option.value === value)?.label;

                } else {
                    const keyMapping: any = {
                        id: 'value',
                        name: 'label'
                    };
                    for (const originalKey in value) {
                        const newKey = keyMapping[originalKey] || originalKey;
                        transformedObject[newKey] = value[originalKey];
                    }
                }
                return transformedObject;
            }
        } else {
            return null
        }
    }

    useEffect(() => {
        setFieldValue(handleSelectedValues());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return (
        <Select
            name={name}
            options={options}
            isMulti={multi}
            value={fieldValue}
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