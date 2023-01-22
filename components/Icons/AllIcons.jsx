import * as React from 'react';

export const SunRounded = (props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 32 32'
        {...props}>
        <g
            stroke='#535358'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}>
            <circle cx={16} cy={16} r={6} />
            <path d='M16 6V3M8.929 8.929 6.808 6.808M6 16H3m13 13v-3m9.192-.808-2.121-2.121M29 16h-3M8.929 23.071l-2.121 2.121M25.192 6.808l-2.12 2.121' />
        </g>
    </svg>
);
export const MoonSharp = (props) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
        <path d='M12 21.8a9.796 9.796 0 0 1-1.245-19.513l1.286-.163-.843.984a8.285 8.285 0 0 0 8.519 13.383l1.252-.347-.696 1.096A9.755 9.755 0 0 1 12 21.8zM9.647 3.526a8.796 8.796 0 1 0 9.031 14.196 9.048 9.048 0 0 1-1.178.078A9.293 9.293 0 0 1 9.647 3.526z' />
        <path fill='none' d='M0 0h24v24H0z' />
    </svg>
);

export const MoonRounded = (props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        {...props}>
        <path
            fill='#FFF'
            d='M21.529 15.93c-.16-.27-.61-.69-1.73-.49-.62.11-1.25.16-1.88.13a8.41 8.41 0 0 1-5.91-2.82c-1.3-1.45-2.1-3.34-2.11-5.38 0-1.14.22-2.24.67-3.28.44-1.01.13-1.54-.09-1.76-.23-.23-.77-.55-1.83-.11-4.09 1.72-6.62 5.82-6.32 10.21.3 4.13 3.2 7.66 7.04 8.99a10 10 0 0 0 2.89.55c.16.01.32.02.48.02 3.35 0 6.49-1.58 8.47-4.27.67-.93.49-1.52.32-1.79Z'
        />
    </svg>
);
export const Search = ({ size, fill, width = 24, height = 24, ...props }) => {
    return (
        <svg
            fill='none'
            height={size || height}
            viewBox='0 0 24 24'
            width={size || width}
            {...props}>
            <path
                d='M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2'
                stroke={fill}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
            />
        </svg>
    );
};
