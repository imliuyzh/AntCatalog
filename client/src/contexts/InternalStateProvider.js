import { createContext, useState } from 'react';

export const InternalContext = createContext();

export const InternalStateProvider = ({ children }) => {
    let [formInput, setFormInput] = useState({
        term: '',
        department: '',
        courseNumber: '',
        courseCode: '',
        instructor: '',
        aggregate: false,
        offset: 0
    });
    let [showAlert, setShowAlert] = useState(false);
    let [alertMessage, setAlertMessage] = useState('');
    let [showCourseList, setShowCourseList] = useState(false);
    let [selectedCourses, setSelectedCourses] = useState({});

    const openAlert = (message) => {
        setShowAlert(true);
        setAlertMessage(message);
    };

    const value = {
        formInput,
        setFormInput,
        showAlert,
        setShowAlert,
        openAlert,
        alertMessage,
        setAlertMessage,
        showCourseList,
        setShowCourseList,
        selectedCourses,
        setSelectedCourses
    };

    return <InternalContext.Provider value={value}>{children}</InternalContext.Provider>
};
