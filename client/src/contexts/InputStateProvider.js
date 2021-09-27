import React, { createContext, useState } from 'react';

export const InputContext = createContext();

export const InputStateProvider = ({ children }) => {
    let [formInput, setFormInput] = useState({
        term: '',
        department: '',
        courseNumber: '',
        courseCode: '',
        instructor: '',
        aggregate: false,
        offset: 0
    });
    
    const value = { formInput, setFormInput };
    return <InputContext.Provider value={value}>{children}</InputContext.Provider>
};
