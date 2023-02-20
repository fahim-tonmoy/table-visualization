import React from 'react';
import { DateRangePicker } from 'rsuite';

const DateRange = ({setFieldValue}) => {
    return (
        <DateRangePicker
            onChange={value => setFieldValue(value)}
        />
    );
};

export default DateRange;