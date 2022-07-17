export const styles1 = {
    control: (styles) => ({
        ...styles,
        border: `1.5px solid #aab3bc`,
        borderRadius: '0px',
        boxSizing: 'border-box',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
        fontSize: '14px'
    }),
    input: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        backgroundColor: 'slate',
        color: '#555759',
        fontFamily: 'RedHatText, Arial, sans-serif'
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ':hover': {
            backgroundColor: '#ffd200',
            color: '#1b3d6d',
        },
    }),
    noOptionsMessage: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`
    }),
    option: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
        fontSize: 14,
        padding: 10
    }),
    placeholder: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    })
};

export const styles2 = {
    control: (styles) => ({
        ...styles,
        border: `1.5px solid #aab3bc`,
        borderRadius: '0px',
        boxSizing: 'border-box',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
        fontSize: '14px'
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        display: 'none'
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        display: 'none'
    }),
    input: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    }),
    loadingMessage: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        backgroundColor: 'slate',
        color: '#555759',
        fontFamily: 'RedHatText, Arial, sans-serif'
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        ':hover': {
            backgroundColor: '#ffd200',
            color: '#1b3d6d',
        },
    }),
    noOptionsMessage: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`
    }),
    option: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
        fontSize: 14,
        padding: 10
    }),
    placeholder: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    }),
    valueContainer: (styles) => ({
        ...styles,
        '& div:first-of-type': {
            width: 'fit-content !important'
        }
    })
};
