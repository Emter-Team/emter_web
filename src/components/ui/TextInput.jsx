import clsx from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({value, type = 'text', placeholder='', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
            <input
                {...props}
                type={type}
                className={clsx('border-fifth bg-third text-dark focus:text-dark focus:border-fifth border-1 focus:ring-fifth focus:bg-white rounded-md', className)
            }
                ref={input}
                placeholder={placeholder}
                value={value}
            />
    );
});
