import React from 'react';
import { Navbar, Link, Text, useTheme, Switch, Input } from '@nextui-org/react';
import { Layout } from './common/Layout';
import { AcmeLogo } from './common/AcmeLogo';
import { useTheme as useNextTheme } from 'next-themes';
import { MoonRounded, SunRounded, Search } from './Icons/AllIcons';

export default function App() {
    const { setTheme } = useNextTheme();
    const { isDark } = useTheme();

    const collapseItems = [
        'ALPHA',
        'Features',
        'Customers',
        'Pricing',
        'Company',
        'Legal',
        'Team',
        'Help & Feedback',
        'Login',
        'Sign Up',
    ];

    return (
        <Layout>
            <Navbar isBordered={isDark} variant='sticky' maxWidth='fluid'>
                <Navbar.Brand css={{ mx: 50 }}>
                    <Navbar.Toggle showIn='sm' aria-label='toggle navigation' />

                    <AcmeLogo />

                    <Text b color='inherit' hideIn='sm'>
                        ALPHA
                    </Text>
                </Navbar.Brand>

                <Navbar.Content
                    activeColor={'secondary'}
                    variant={'highlight'}
                    enableCursorHighlight
                    css={{
                        dflex: 'center',
                        w: '100%',
                    }}>
                    <Navbar.Item
                        css={{
                            mx: 50,
                            '@smMax': {
                                w: '100%',
                                jc: 'center',
                            },
                        }}>
                        <Input
                            clearable
                            contentLeft={
                                <Search
                                    fill='var(--nextui-colors-accents6)'
                                    size={16}
                                />
                            }
                            contentLeftStyling={false}
                            css={{
                                w: '100%',
                                '@smMax': {
                                    mw: '300px',
                                },
                                '& .nextui-input-content--left': {
                                    h: '100%',
                                    ml: '$4',
                                    dflex: 'center',
                                },
                            }}
                            placeholder='Search...'
                        />
                    </Navbar.Item>
                </Navbar.Content>

                <Navbar.Content
                    activeColor={isDark ? 'secondary' : 'primary'}
                    variant={'highlight'}
                    enableCursorHighlight
                    css={{
                        dflex: 'center',
                        w: '100%',
                    }}>
                    {isDark ? (
                        <MoonRounded width='22' height='22' />
                    ) : (
                        <SunRounded width='22' height='22' />
                    )}

                    <Switch
                        css={{ mx: 50 }}
                        color='secondary'
                        checked={isDark}
                        onChange={(e) =>
                            setTheme(e.target.checked ? 'dark' : 'light')
                        }
                    />

                    <Navbar.Link color='inherit' href='#' css={{ mx: 10 }}>
                        Login
                    </Navbar.Link>

                    <Navbar.Link
                        color='inherit'
                        href='#'
                        css={{ mx: 10, mr: 50 }}>
                        Sign Up
                    </Navbar.Link>
                </Navbar.Content>

                <Navbar.Collapse showIn='sm'>
                    {collapseItems.map((item, index) => (
                        <Navbar.CollapseItem key={item}>
                            {index === 0 ? (
                                <Text h4 b color='inherit'>
                                    ALPHA
                                </Text>
                            ) : (
                                <Link
                                    color='inherit'
                                    css={{
                                        minWidth: '100%',
                                    }}
                                    href='#'>
                                    {item}
                                </Link>
                            )}
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar>
        </Layout>
    );
}
