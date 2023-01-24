import MyNavbar from '@/components/MyNavbar';
import MySidebar from '@/components/MySidebar';
import { Container, Grid, Text, Card, Loading } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const jsondata = {};

const findIdByKey = (key, json) => {
    const data = Object.values(json.data);
    let left = 0;
    let right = data.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (data[middle].key === key) {
            return data[middle].id;
        }
        if (data[middle].key < key) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return null;
};

const json = {
    // your json file here
    // ...
};

const dataHashMap = new Map();
Object.values(json.data).forEach((item) => {
    dataHashMap.set(item.key, item);
});

const hashfindIdByKey = (key, dataHashMap) => {
    return dataHashMap.get(key) ? dataHashMap.get(key).id : null;
};

const id = hashfindIdByKey(266, dataHashMap); // will return 'Aatrox'
console.log(id);

const PlayerCard = ({ player, objectProp }) => {
    return (
        <Card css={{ h: '$24', $$cardColor: '$colors$secondary' }}>
            <Card.Body>
                <Text h6 size={28} color='white' css={{ mt: 0 }}>
                    {player[objectProp]}
                </Text>
            </Card.Body>
        </Card>
    );
};

const MasteryCard = ({ mastery, objectProp }) => {
    console.log(mastery);
    return (
        <Card css={{ h: '$24', $$cardColor: '$colors$secondary' }}>
            <Card.Body>
                <Text h6 size={28} color='white' css={{ mt: 0 }}>
                    {mastery[objectProp]}
                </Text>
            </Card.Body>
        </Card>
    );
};

const Player = () => {
    const [player, setPlayer] = useState(null);
    const [mastery, setMastery] = useState(null);

    useEffect(() => {
        setPlayer(JSON.parse(localStorage.player));
        setMastery(JSON.parse(localStorage.mastery));
    }, []);

    return (
        <>
            <MyNavbar />
            <Container
                display='flex'
                direction='row'
                wrap='noWrap'
                css={{ margin: 0, padding: 0 }}>
                <MySidebar />

                <Container fluid>
                    <Grid.Container gap={2} justify='center'>
                        <Grid xs={4}>
                            {player ? (
                                <>
                                    <Text>Name- </Text>
                                    <PlayerCard
                                        player={player}
                                        objectProp='name'
                                    />
                                </>
                            ) : (
                                <Loading />
                            )}
                        </Grid>
                        <Grid xs={4}>
                            {player ? (
                                <>
                                    <Text>Summoner Level- </Text>
                                    <PlayerCard
                                        player={player}
                                        objectProp='summonerLevel'
                                    />
                                </>
                            ) : (
                                <Loading />
                            )}
                        </Grid>
                        <Grid xs={4}>
                            {mastery ? (
                                <>
                                    <Text>Champion- </Text>
                                    <MasteryCard
                                        mastery={mastery[0]}
                                        objectProp='championId'
                                    />
                                </>
                            ) : (
                                <Loading />
                            )}
                        </Grid>
                    </Grid.Container>
                </Container>
            </Container>
        </>
    );
};

export default Player;
