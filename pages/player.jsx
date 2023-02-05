import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Container, Grid, Text, Card, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Champs from "@/public/json/champions.json";

const champsData = Champs;

const championMap = new Map();
for (const [key, value] of Object.entries(champsData)) {
  championMap.set(value.key, value.name);
}
const getChampionName = (key) => championMap.get(key);

const useLocalStorageData = (localStorageKey) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    try {
      setData(JSON.parse(localStorage.getItem(localStorageKey)));
    } catch (error) {
      console.error(`Failed to retrieve data from local storage: ${error}`);
    }
  }, []);
  return data;
};

const PlayerCard = ({ player, objectProp }) => {
  const { [objectProp]: value } = player;
  return (
    <Card css={{ h: "$24", $$cardColor: "$colors$secondary" }}>
      <Card.Body>
        <Text
          h6
          size={28}
          css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
            mt: 0,
            textAlign: "center",
          }}
        >
          {value}
        </Text>
      </Card.Body>
    </Card>
  );
};

const MasteryCard = ({ mastery, objectProp }) => {
  const { [objectProp]: key } = mastery;
  const championName =
    objectProp === "championId" ? getChampionName(String(key)) : null;

  return (
    <Card css={{ h: "$24", $$cardColor: "$colors$secondary" }}>
      <Card.Body>
        <Text
          h6
          size={28}
          css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
            mt: 0,
            textAlign: "center",
          }}
          weight="bold"
        >
          {championName || key}
        </Text>
      </Card.Body>
    </Card>
  );
};

const Player = () => {
  const player = useLocalStorageData("player");
  const mastery = useLocalStorageData("mastery");

  return (
    <>
      <MyNavbar />
      <Container
        display="flex"
        direction="row"
        wrap="noWrap"
        css={{ margin: 0, padding: 0 }}
      >
        <MySidebar />

        <Container fluid>
          <Grid.Container gap={2} justify="center">
            <Grid xs={6}>
              {player ? (
                <>
                  <Text
                    size={28}
                    css={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Name:{" "}
                  </Text>
                  <PlayerCard player={player} objectProp="name" />
                </>
              ) : (
                <Loading />
              )}
            </Grid>
            <Grid xs={6}>
              {player ? (
                <>
                  <Text
                    size={28}
                    css={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Summoner Level:{" "}
                  </Text>
                  <PlayerCard player={player} objectProp="summonerLevel" />
                </>
              ) : (
                <Loading />
              )}
            </Grid>

            <Grid xs={12}>
              <Grid.Container>
                <Grid xs={4}>
                  {mastery ? (
                    <>
                      <Text
                        size={28}
                        css={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        Most played Champion:{" "}
                      </Text>
                      <MasteryCard
                        mastery={mastery[0]}
                        objectProp="championId"
                      />
                    </>
                  ) : (
                    <Loading />
                  )}
                </Grid>
                <Grid xs={4}>
                  {mastery ? (
                    <>
                      <Text
                        size={28}
                        css={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        Mastery points:{" "}
                      </Text>
                      <MasteryCard
                        mastery={mastery[0]}
                        objectProp="championPoints"
                      />
                    </>
                  ) : (
                    <Loading />
                  )}
                </Grid>
                <Grid xs={4}>
                  {mastery ? (
                    <>
                      <Text
                        size={28}
                        css={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        Mastery level:{" "}
                      </Text>
                      <MasteryCard
                        mastery={mastery[0]}
                        objectProp="championLevel"
                      />
                    </>
                  ) : (
                    <Loading />
                  )}
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Container>
      </Container>
    </>
  );
};

export default Player;
