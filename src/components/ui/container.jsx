import clsx from 'clsx';
import React from 'react';

export default function Container({ children, className }) {
    return (
        <div
            className={clsx(
                className,
                'max-w-8xl mx-auto mt-24 px-4 sm:px-4 lg:px-24 flex flex-wrap items-center',
            )}
        >
            {children}
        </div>
    );
}
