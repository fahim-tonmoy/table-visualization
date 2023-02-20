import React from 'react';
import Select from 'react-select';

const ReactSelect = ({name, options, setFieldValue, placeholder, value}) => {
    return (
        <Select
            className="select-component"
            classNamePrefix="react-select-component"
            placeholder={placeholder}
            name={name}
            value={value}
            options={options}
            onChange={(option) => setFieldValue(option)}
        />
    );
};

export default ReactSelect;