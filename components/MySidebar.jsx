import React from 'react';
import { Text, useTheme, Grid } from '@nextui-org/react';
import {
    MoonRounded,
    SunRounded,
    Money,
    FishBone,
    Flag,
    FlipFlops,
} from './Icons/AllIcons';

export const MySidebar = () => {
    const { isDark } = useTheme();

    return (
        <Grid.Container
            display='flex'
            justify='flex-start'
            direction='column'
            alignItems='flex-start'
            css={{
                margin: '0',
                width: '15%',
                backgroundColor: isDark ? '#0B0B0B' : '#B0B0B0',
                height: '100vh',
                paddingTop: '25px',
            }}>
            <Grid xs={4} css={{ marginLeft: '50px' }}>
                <FlipFlops width='26' height='26' />
                <Text b color='inherit' hideIn='sm'>
                    Sandals
                </Text>
            </Grid>

            <Grid xs={4} css={{ marginLeft: '50px' }}>
                <MoonRounded width='26' height='26' />
                <Text b color='inherit' hideIn='sm'>
                    Moon
                </Text>
            </Grid>

            <Grid xs={4} css={{ marginLeft: '50px' }}>
                <SunRounded width='26' height='26' />
                <Text b color='inherit' hideIn='sm'>
                    Rounded
                </Text>
            </Grid>

            <Grid xs={4} css={{ marginLeft: '50px' }}>
                <Money width='26' height='26' />
                <Text b color='inherit' hideIn='sm'>
                    Money
                </Text>
            </Grid>

            <Grid xs={4} css={{ marginLeft: '50px' }}>
                <FishBone width='26' height='26' />
                <Text b color='inherit' hideIn='sm'>
                    Fish
                </Text>
            </Grid>

            <Grid xs={4} css={{ marginLeft: '50px' }}>
                <Flag width='26' height='26' />
                <Text b color='inherit' hideIn='sm'>
                    Capture
                </Text>
            </Grid>
        </Grid.Container>
    );
};
