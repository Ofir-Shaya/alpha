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
