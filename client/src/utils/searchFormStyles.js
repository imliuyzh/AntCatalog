export const styles1 = {
    control: (styles, { isFocused }) => ({
        ...styles,
        border: `1.5px solid #aab3bc`,
        borderRadius: '0px',
        boxShadow: isFocused ? '0 0 0 .2rem rgba(0,123,255,.25)' : styles.boxShadow,
        boxSizing: 'border-box',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
        fontSize: '14px',
        '&:focus-within': {
            boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)'
        },
        '&:hover': {
            borderColor: '#aab3bc'
        }
    }),
    input: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    }),
    menu: (styles) => ({
        ...styles,
        borderRadius: 0
    }),
    menuList: (styles) => ({
        ...styles,
        margin: '8px auto'
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: '#555759',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`
    }),
    multiValueRemove: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: (isFocused || isSelected) ? '#ffd200' : styles.backgroundColor,
        color: (isFocused || isSelected) ? '#1b3d6d' : styles.backgroundColor,
        '&:hover': {
            backgroundColor: '#ffd200',
            color: '#1b3d6d'
        }
    }),
    noOptionsMessage: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`,
        fontSize: '14px'
    }),
    option: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? '#f5f5f5' : '#ffffff',
        color: '#000000',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`,
        fontSize: 14,
        lineHeight: 1.5,
        padding: '7px 20px'
    }),
    placeholder: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    })
};

export const styles2 = {
    control: (styles, { isFocused }) => ({
        ...styles,
        border: `1.5px solid #aab3bc`,
        borderRadius: '0px',
        boxShadow: isFocused ? '0 0 0 .2rem rgba(0,123,255,.25)' : styles.boxShadow,
        boxSizing: 'border-box',
        fontFamily: `FFKievitSlabWebProBook, 'Times New Roman', serif`,
        fontSize: '14px',
        '&:focus-within': {
            boxShadow: '0 0 0 .2rem rgba(0,123,255,.25)'
        },
        '&:hover': {
            borderColor: '#aab3bc'
        }
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
    menu: (styles) => ({
        ...styles,
        borderRadius: 0
    }),
    menuList: (styles) => ({
        ...styles,
        margin: '8px auto'
    }),
    loadingMessage: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`,
        fontSize: '14px'
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: '#555759',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`
    }),
    multiValueRemove: (styles, { isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: (isFocused || isSelected) ? '#ffd200' : styles.backgroundColor,
        color: (isFocused || isSelected) ? '#1b3d6d' : styles.backgroundColor,
        '&:hover': {
            backgroundColor: '#ffd200',
            color: '#1b3d6d'
        }
    }),
    noOptionsMessage: (styles) => ({
        ...styles,
        color: '#aab3bc',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`,
        fontSize: '14px'
    }),
    option: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? '#f5f5f5' : '#ffffff',
        color: '#000000',
        fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, apple color emoji, `
            + `segoe ui emoji, Segoe UI Symbol, noto color emoji`,
        fontSize: 14,
        lineHeight: 1.5,
        padding: '8px 20px'
    }),
    placeholder: (styles) => ({
        ...styles,
        color: '#aab3bc',
        paddingLeft: 8
    })
};
