import React from 'react';
import { Navbar, Link, Text, useTheme, Switch, Input } from '@nextui-org/react';
import { Layout } from './common/Layout';
import { AcmeLogo } from './common/AcmeLogo';
import { useTheme as useNextTheme } from 'next-themes';

export const MySidebar = () => {
    return (
        <Layout>
            <AcmeLogo />
            <Text b color='inherit' hideIn='sm'>
                ALPHA
            </Text>
        </Layout>
    );
};
