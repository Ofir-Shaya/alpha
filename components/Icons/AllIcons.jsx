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

export const Money = (props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 64 38'
        {...props}>
        <g
            fill='none'
            stroke='#6B6C6E'
            strokeWidth={2}
            transform='translate(1 1)'>
            <path d='M60 36c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v32c0 1.1.9 2 2 2h58zM5 4h20.9M5 32h20.9M36.2 4H57M36.2 32H57' />
            <circle cx={31} cy={18} r={15} />
            <path d='M27.1 22.4c0 2 1.8 3.6 4 3.6s4-1.6 4-3.6c0-2.9-4-4.4-4-4.4s-4-1.5-4-4.4c0-2 1.8-3.6 4-3.6s4 1.6 4 3.6m-4-7.5V30' />
        </g>
    </svg>
);

export const FishBone = (props) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -15 66 66' {...props}>
        <g
            fill='none'
            fillRule='evenodd'
            stroke='#6B6C6E'
            strokeWidth={2}
            transform='translate(1 1)'>
            <path d='M22.5 2C12.3 3.6 0 14.2 0 16.9c0 2.7 12.3 13.3 22.5 14.9-3.4-3.6-5.4-8.7-5.4-14.7S19 5.6 22.5 2Zm39.3 7.2C56.9 10 51 15.6 51 17c0 1.4 5.9 7 10.8 7.8-1.6-1.9-2.7-4.7-2.7-7.8 0-3.1 1.1-5.9 2.7-7.8ZM49 30.5c-3.6-4-6-6.9-6-13.6 0-6.7 2.3-9.3 6-13.4M40.4 34c-3.2-5.1-5.3-8.7-5.3-17.2 0-8.4 2-11.7 5.3-16.8m-9.6 32c-3.6-4.5-4.8-7.7-4.8-15.1C26 9.5 27.3 6.5 30.8 2M16.9 16.9h33.6' />
            <circle cx={8.9} cy={12.9} r={1.9} />
        </g>
    </svg>
);

export const Flag = (props) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='-3.5 0 64 64' {...props}>
        <path
            d='M3.5 16.2C1.5-.3 31.2-7.1 32 15.2c7.3 11.3 16.9 4.6 23-2-4 21-27 18.6-26 6-2-9-20 2-21 14m-6.1-23 14 53.1'
            fill='none'
            fillRule='evenodd'
            stroke='#6B6C6E'
            strokeWidth={2}
        />
    </svg>
);

export const AcmeLogo = () => (
    <svg
        className=''
        fill='none'
        height='36'
        viewBox='0 0 32 32'
        width='36'
        xmlns='http://www.w3.org/2000/svg'>
        <rect fill='var(--secondary)' height='100%' rx='16' width='100%' />
        <path
            clipRule='evenodd'
            d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
            fill='currentColor'
            fillRule='evenodd'
        />
    </svg>
);

export const FlipFlops = (props) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -0.5 64 64' {...props}>
        <g fill='none' fillRule='evenodd' stroke='#6B6C6E' strokeWidth={2}>
            <path d='M33.4 53.7c.4.9-.3 3.8-7.3 6.6-7 2.9-9.5 1.3-9.8.4L1.6 29.4c-.4-.9-1.5-5.8 7.9-9.6 9.3-3.8 12 .4 12.4 1.3l11.5 32.6Z' />
            <path d='M10.4 42.2c-.6-1.5-3.6-13.1 1.9-15.3 5.5-2.2 11.5 8.1 12.1 9.6M53.8 44c-.2.9-2.4 2.9-9.8 1.3-7.4-1.6-8.5-4.4-8.3-5.3l5.8-34.1c.2-.9 2.1-5.6 12-3.4 9.9 2.2 9.6 7.2 9.4 8.1L53.8 44Z' />
            <path d='M41.6 21.5C42 19.9 46.2 8.7 51.9 10c5.8 1.3 4.8 13.2 4.5 14.8' />
        </g>
    </svg>
);
