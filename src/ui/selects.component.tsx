import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Input } from '@material-ui/core';

interface SelectsProps {
    title: string;
    items?: string;
}

export const Selects: React.FC<SelectsProps> = React.memo(function Selects({ title, items }: SelectsProps) {
    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <FormControl>
                <InputLabel>{title}</InputLabel>
                <Select value={age} onChange={handleChange} input={<Input style={{ width: '100px' }} />}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
});
