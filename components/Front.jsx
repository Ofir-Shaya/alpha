import React from 'react';
import { useTheme, Input, Image, Container, Button } from '@nextui-org/react';
import { Search } from './Icons/AllIcons';

const Front = () => {
    const { isDark } = useTheme();

    return (
        <>
            <Container
                fluid
                display='flex'
                direction='column'
                alignContent='center'
                alignItems='center'
                css={{ marginTop: '10rem' }}>
                <Image
                    showSkeleton
                    width={480}
                    height={320}
                    src='/media/goat.jpg'
                    alt='Default'
                    objectFit='cover'
                    containerCss={{
                        marginBottom: '50px',
                        borderRadius: '10px',
                    }}
                />
                <Input
                    id='frontSearchInput'
                    clearable
                    size='md'
                    fullWidth
                    contentLeft={
                        <Search
                            fill='var(--nextui-colors-accents6)'
                            size={16}
                        />
                    }
                    contentLeftStyling={false}
                    css={{
                        w: '35%',
                    }}
                    labelRight='EUNE'
                    placeholder='Search...'
                />
            </Container>
        </>
    );
};

export default Front;
