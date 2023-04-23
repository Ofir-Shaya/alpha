import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Container, Grid, Text, Card, Loading, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Champs from "@/public/json/champions.json";

const champsData = Champs;

const championMap = new Map();
for (const [key, value] of Object.entries(champsData)) {
  championMap.set(value.key, value.name);
}
const getChampionName = (key) => championMap.get(key);

const Profile = () => {
  const router = useRouter();
  const { Profile, server } = router.query;
  console.log("router");
  console.log(router.query);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(
          `/api/lolapi?user=${Profile}&func=searchPlayer`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPlayer(data);
        } else {
          console.log("Error fetching player.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlayer();
  }, []);

  const PlayerCard = () => {
    console.log(player);
    return (
      <Card
        css={{
          h: "100%",
          $$cardColor: "$colors$secondary",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Card.Header>
          <Image
            height={89}
            width={89}
            src={`https://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/${player.profileIconId}.png`}
            alt={"icon"}
            objectFit="cover"
          />
        </Card.Header>
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
            {player.username}
          </Text>
        </Card.Body>
      </Card>
    );
  };

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
                  ></Text>
                  <PlayerCard />
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

export default Profile;
