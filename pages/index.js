import MyNavbar from '@/components/MyNavbar';
import MySidebar from '@/components/MySidebar';
import Front from '@/components/Front';
import { Container } from '@nextui-org/react';

export default function Home() {
    return (
        <>
            <MyNavbar />

            <Container
                display='flex'
                direction='row'
                wrap='noWrap'
                css={{ margin: 0, padding: 0 }}>
                <MySidebar />
                <Front />
            </Container>
        </>
    );
}
