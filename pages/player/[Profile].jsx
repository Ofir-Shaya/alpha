import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Container,
  Grid,
  Text,
  Card,
  Loading,
  Image,
  Button,
} from "@nextui-org/react";
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
  const [player, setPlayer] = useState(null);
  const [playerRanked, setPlayerRanked] = useState("");
  const [playerRankedSolo, setPlayerRankedSolo] = useState(null);
  const [playerRankedFlex, setPlayerRankedFlex] = useState(null);

  // Getting info of player searched
  useEffect(() => {
    const fetchPlayer = async () => {
      if (Profile)
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
    console.log("player", player);
  }, [Profile]);

  // Getting ranked info
  useEffect(() => {
    const pullRankedInfo = async () => {
      if (player) {
        try {
          const response = await fetch(
            `/api/lolapi?summonerId=${player.summonerId}&func=getRankedInformation`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setPlayerRanked(data);
          } else {
            console.log("Error fetching player.");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    pullRankedInfo();
    console.log("playerRanked", playerRanked);
  }, [player]);

  // Update ranked info
  const updateRankedInformation = async () => {
    try {
      const response = await fetch(
        `/api/lolapi?summonerId=${player.summonerId}&func=playerRankedInfo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPlayerRanked(data);
      } else {
        console.log("Error fetching player.");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("playerRanked", playerRanked);
  };

  // Update solo and flex rank
  useEffect(() => {
    console.log("123", playerRanked);
    for (let index = 0; index < playerRanked.length; index++) {
      if (playerRanked[index].queueType === "RANKED_SOLO_5x5") {
        setPlayerRankedSolo(playerRanked[index]);
      }
      if (playerRanked[index].queueType === "RANKED_FLEX_SR") {
        setPlayerRankedFlex(playerRanked[index]);
      }
    }
  }, [playerRanked]);

  // summoner Icon component builder
  const SummonerIcon = () => {
    return (
      <Card
        className="summoner-profile-icon"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",
          height: "100px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Text
          css={{
            position: "absolute",
            zIndex: "2",
            top: "0px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "20px",
            borderRadius: "4px",
            border: "2px solid rgb(205,69,69)",
            backgroundColor: "#06061f",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          {player.summonerLevel}
        </Text>
        <Image
          height={89}
          width={89}
          src={`https://static.bigbrain.gg/assets/lol/riot_static/13.8.1/img/profileicon/${player.profileIconId}.png`}
          alt={"icon"}
          objectFit="cover"
          css={{
            borderRadius: "6px",
            border: "2px solid rgb(205,69,69)",
            margin: "0",
          }}
        />
      </Card>
    );
  };

  const SummonerProfileHeader = () => {
    return (
      <Card
        className="summoner-profile-main"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          borderRadius: "0",
        }}
      >
        <Card.Body css={{ flexDirection: "row", margin: "$0" }}>
          <Text
            h6
            size={28}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
              mt: 0,
              textAlign: "start",
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
        fluid
        css={{ margin: 0, padding: 0 }}
      >
        <MySidebar />
        <Container css={{ marginTop: "$10" }}>
          <Grid.Container
            className="summoner-profile-header"
            gap={0}
            justify="start"
            direction="row"
            css={{
              paddingTop: "20px",
              border: "2px solid #414165",
              borderRadius: "10px",
            }}
          >
            <Grid xs={1} css={{}}>
              {player ? (
                <>
                  <SummonerIcon />
                </>
              ) : (
                <Loading />
              )}
            </Grid>
            <Grid xs={9} direction="column">
              {player ? (
                <>
                  <SummonerProfileHeader />
                  <Button
                    auto
                    onPress={updateRankedInformation}
                    css={{ width: "fit-content", marginLeft: "$10" }}
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Loading />
              )}
            </Grid>
          </Grid.Container>
          <Grid.Container
            className="summoner-profile-overview"
            gap={0}
            justify="start"
            direction="column"
            css={{
              paddingTop: "20px",
              border: "2px solid #414165",
              borderRadius: "10px",
            }}
          >
            <Grid.Container className="rank-block" direction="column">
              <Grid
                xs={3}
                display="flex"
                direction="column"
                css={{
                  backgroundColor: "$secondary",
                  borderRadius: "18px",
                  margin: "$10",
                }}
              >
                <Container className="queue-container">
                  <Text h4 css={{ width: "100%" }}>
                    Ranked Solo
                  </Text>
                </Container>

                {playerRankedSolo ? (
                  <Container display="flex" direction="row">
                    <Image
                      width={68}
                      height={68}
                      src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${playerRankedSolo.tier.toLowerCase()}.png`}
                      alt={playerRankedSolo.tier + "icon"}
                    />
                    <Container display="flex" direction="row">
                      <Text>
                        {playerRankedSolo.tier.charAt(0) +
                          playerRankedSolo.tier.substring(1).toLowerCase() +
                          " " +
                          playerRankedSolo.rank +
                          " "}
                      </Text>
                      <Text>{" " + playerRankedSolo.leaguePoints} LP</Text>
                    </Container>
                  </Container>
                ) : (
                  <Loading />
                )}
              </Grid>
              <Grid
                xs={3}
                display="flex"
                direction="row"
                css={{
                  backgroundColor: "$secondary",
                  borderRadius: "18px",
                  margin: "$10",
                }}
              >
                <Text h4 css={{ width: "40%" }}>
                  Ranked Flex
                </Text>
                {playerRankedFlex ? (
                  <Container display="flex" direction="row">
                    <Image
                      width={68}
                      height={68}
                      src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${playerRankedFlex.tier.toLowerCase()}.png`}
                      alt={playerRankedFlex.tier + "icon"}
                    />
                    <Text>
                      {playerRankedFlex.tier.charAt(0) +
                        playerRankedFlex.tier.substring(1).toLowerCase() +
                        " " +
                        playerRankedFlex.rank}
                    </Text>
                    <Text>{playerRankedFlex.leaguePoints} LP</Text>
                  </Container>
                ) : (
                  <Loading />
                )}
              </Grid>
            </Grid.Container>
            <Grid
              xs={8}
              display="flex"
              direction="column"
              css={{
                backgroundColor: "$secondary",
                borderRadius: "18px",
                margin: "$10",
              }}
            >
              <Text h4>Champion Stats</Text>
            </Grid>
          </Grid.Container>
        </Container>
      </Container>
    </>
  );
};

export default Profile;
