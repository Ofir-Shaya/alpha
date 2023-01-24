import React from 'react';
import { Link, useTheme, Grid, Spacer } from '@nextui-org/react';
import {
    MoonRounded,
    SunRounded,
    Money,
    FishBone,
    Flag,
    FlipFlops,
} from './Icons/AllIcons';

const MySidebar = () => {
    const { isDark } = useTheme();

    return (
        <Grid.Container
            display='flex'
            justify='flex-start'
            direction='column'
            alignItems='flex-start'
            css={{
                margin: '0',
                width: '20%',
                backgroundColor: isDark ? '#0B0B0B' : '#B0B0B0',
                height: '100vh',
                paddingTop: '25px',
            }}>
            <Grid xs={1} css={{ marginLeft: '50px' }}>
                <Link block color='inherit'>
                    <FlipFlops width='26' height='26' />
                    Sandals
                </Link>
            </Grid>
            <Spacer y={1} />

            <Grid xs={1} css={{ marginLeft: '50px' }}>
                <Link block color='inherit'>
                    <MoonRounded width='26' height='26' />
                    Moon
                </Link>
            </Grid>
            <Spacer y={1} />

            <Grid xs={1} css={{ marginLeft: '50px' }}>
                <Link block color='inherit'>
                    <SunRounded width='26' height='26' />
                    Rounded
                </Link>
            </Grid>
            <Spacer y={1} />

            <Grid xs={1} css={{ marginLeft: '50px' }}>
                <Link block color='inherit'>
                    <Money width='26' height='26' />
                    Money
                </Link>
            </Grid>
            <Spacer y={1} />

            <Grid xs={1} css={{ marginLeft: '50px' }}>
                <Link block color='inherit'>
                    <FishBone width='26' height='26' />
                    Fish
                </Link>
            </Grid>
            <Spacer y={1} />

            <Grid xs={1} css={{ marginLeft: '50px' }}>
                <Link block color='inherit'>
                    <Flag width='26' height='26' />
                    Capture
                </Link>
            </Grid>
        </Grid.Container>
    );
};

export default MySidebar;
