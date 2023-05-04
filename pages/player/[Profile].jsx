import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { headers } from "@/next.config";
import {
  Container,
  Grid,
  Text,
  Card,
  Loading,
  Image,
  Button,
  Row,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const romanHash = {
  I: 1,
  V: 5,
  X: 10,
  // L: 50,
  // C: 100,
  // D: 500,
  // M: 1000,
};
const summonersHash = {
  21: "SummonerBarrier",
  1: "SummonerBoost",
  14: "SummonerDot",
  3: "SummonerExhaust",
  4: "SummonerFlash",
  6: "SummonerHaste",
  7: "SummonerHeal",
  11: "SummonerSmite",
  12: "SummonerTeleport",
};

const romanToInt = (roman) => {
  let accumulator = 0;
  for (let i = 0; i < roman.length; i++) {
    if (roman[i] === "I" && roman[i + 1] === "V") {
      accumulator += 4;
      i++;
    } else if (roman[i] === "I" && roman[i + 1] === "X") {
      accumulator += 9;
      i++;
    }
    // useless part ->
    //  else if (roman[i] === "X" && roman[i + 1] === "L") {
    //   accumulator += 40;
    //   i++;
    // } else if (roman[i] === "X" && roman[i + 1] === "C") {
    //   accumulator += 90;
    //   i++;
    // } else if (roman[i] === "C" && roman[i + 1] === "D") {
    //   accumulator += 400;
    //   i++;
    // } else if (roman[i] === "C" && roman[i + 1] === "M") {
    //   accumulator += 900;
    //   i++;
    // }
    else accumulator += romanHash[roman[i]];
  }
  return accumulator;
};

const calcWinPerc = (wins, losses) => {
  const total = wins + losses;
  return ((wins / total) * 100).toFixed(1);
};

const epochTimeConvertor = (epochValue) => {
  const now = new Date().getTime();
  const timePassed = Math.floor((now - epochValue) / 1000);

  if (timePassed < 60 * 60) {
    const minutesPassed = Math.floor(timePassed / 60);
    return `${minutesPassed} minute${minutesPassed === 1 ? "" : "s"} ago`;
  } else if (timePassed < 60 * 60 * 24) {
    const hoursPassed = Math.floor(timePassed / (60 * 60));
    return `${hoursPassed} hour${hoursPassed === 1 ? "" : "s"} ago`;
  } else {
    const daysPassed = Math.floor(timePassed / (60 * 60 * 24));
    return `${daysPassed} day${daysPassed === 1 ? "" : "s"} ago`;
  }
};

const Profile = () => {
  const router = useRouter();
  const { Profile, server } = router.query;
  const [player, setPlayer] = useState(null);
  const [playerRanked, setPlayerRanked] = useState(null);
  const [playerRankedSolo, setPlayerRankedSolo] = useState(null);
  // const [playerRankedFlex, setPlayerRankedFlex] = useState(null);
  const [playerChamps, setPlayerChamps] = useState(null);
  const [matchInformation, setMatchInformation] = useState(null);

  // Getting info of player searched
  useEffect(() => {
    const fetchPlayer = async () => {
      if (!Profile) return;
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
        } else console.log("Error fetching player search.");
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlayer();
  }, [Profile]);

  // Getting ranked info
  useEffect(() => {
    const pullRankedInfo = async () => {
      if (!player) return;
      try {
        const response = await fetch(
          `/api/lolapi?summonerName=${player.username}&func=getRankedInformation`,
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
        } else console.error("Error pulling player ranked.");
      } catch (error) {
        console.error(error);
      }
    };
    pullRankedInfo();
  }, [player]);

  // Update soloq and flexq rank
  useEffect(() => {
    if (!playerRanked) return;
    if (playerRanked.queueType === "RANKED_SOLO_5x5") {
      setPlayerRankedSolo(playerRanked);
    } else
      for (let index = 0; index < playerRanked.length; index++) {
        if (playerRanked[index].queueType === "RANKED_SOLO_5x5") {
          setPlayerRankedSolo(playerRanked[index]);
        }
        // if (playerRanked[index].queueType === "RANKED_FLEX_SR") {
        //   setPlayerRankedFlex(playerRanked[index]);
        // }
      }
  }, [playerRanked]);

  useEffect(() => {
    const pullPlayerChamps = async () => {
      if (!playerRanked) return;
      try {
        const response = await fetch(
          `/api/lolapi?summonerId=${playerRanked.summonerId}&func=getPlayerChamps`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPlayerChamps(data);
        } else console.error("Error fetching player champs.");
      } catch (error) {
        console.error(error);
      }
    };
    pullPlayerChamps();
  }, [playerRanked]);

  useEffect(() => {
    async function fetchMatchesWithInfo() {
      if (!playerChamps) return;
      const matchesWithInfo = await Promise.all(
        playerChamps.map(async (match) => {
          const matchInfo = await getMatchInformation(match.matchId);
          return { ...match, ...matchInfo };
        })
      );
      setMatchInformation(matchesWithInfo);
    }
    fetchMatchesWithInfo();
  }, [playerChamps]);

  // Update ranked info
  const updateRankedInformation = async () => {
    try {
      const response = await fetch(
        `/api/lolapi?summonerName=${player.username}&func=updateUser`,
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
      } else console.log("Error fetching player ranked update.");
    } catch (error) {
      console.error(error);
    }
  };

  // useless func
  // const getMatchesInformation = async () => {
  //   if (player) {
  //     try {
  //       const response = await fetch(
  //         `/api/lolapi?puuid=${player.puuid}&func=getAllMatchesByPuuid`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMatchesArray(data);
  //       } else console.log("error fetching data");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // useless func
  // const updateUserMatches = async () => {
  //   try {
  //     const testArray = [matchesArray.slice(0, 1)];
  //     const response = await fetch(
  //       `
  //     /api/lolapi?matches=${testArray}&func=updateUserMatches`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //     } else console.log("error fetching player");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  const getMatchInformation = async (matchId) => {
    try {
      const response = await fetch(
        `/api/lolapi?match=${matchId}&func=getMatchInformation`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LatestPlayed = () => {
    if (!matchInformation) return <Loading />;

    console.log(matchInformation);
    const champsOverview = (
      <Container>
        {matchInformation.map((match, index) => {
          return (
            <Card
              key={index + "card-left"}
              width="100%"
              variant="bordered"
              css={{
                backgroundColor: match.win
                  ? "rgba(0,180,0,0.1)"
                  : "rgba(180,0,0,0.1)",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Card
                className="match-details"
                css={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30%",
                  backgroundColor: "transparent",
                  textAlign: "center",
                }}
              >
                <Text b>{match.queueId === 420 ? "Ranked Solo/Duo" : ""}</Text>
                <Text>{match.gameDuration}</Text>
                <Text>{epochTimeConvertor(match.gameCreation)}</Text>
                <Container
                  display="flex"
                  css={{ flexDirection: "row", justifyContent: "space-evenly" }}
                >
                  <Text
                    b
                    color={
                      match.win ? "rgba(0,180,0,0.3)" : "rgba(180,0,0,0.3)"
                    }
                  >
                    {match.win ? "WIN" : "LOSE"}
                  </Text>
                  <Text>{match.gameDuration}</Text>
                </Container>
              </Card>

              <Card
                className="champion-details"
                css={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30%",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Container
                  css={{
                    position: "relative",
                    margin: "$0",
                    padding: "$0",
                    width: "fit-content",
                  }}
                >
                  <Image
                    width={64}
                    height={64}
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${match.championName}.png`}
                    containerCss={{
                      margin: "$0",
                      padding: "$0",
                      width: "fit-content",
                    }}
                  />
                  <p style={{ position: "absolute", bottom: "0", right: "0" }}>
                    18
                  </p>
                </Container>
                <Container css={{ margin: "$0", padding: "$0" }}>
                  <Image
                    width={22}
                    height={22}
                    src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                      summonersHash[match.spell1Id]
                    }.png`}
                    containerCss={{ margin: "$0", padding: "$0" }}
                  />
                  <Image
                    width={22}
                    height={22}
                    src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                      summonersHash[match.spell2Id]
                    }.png`}
                    containerCss={{ margin: "$0", padding: "$0" }}
                  />
                </Container>
              </Card>
              <Card
                className="player-stats"
                css={{
                  display: "flex",
                  flexDirection: "column",
                  width: "30%",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Container>
                  <Text b>{match.kills}</Text>
                  <span color="#5f5f7b">/</span>
                  <Text b color="$error">
                    {match.deaths}
                  </Text>
                  <span color="#5f5f7b">/</span>
                  <Text b>{match.assists}</Text>
                </Container>
                <Container>
                  <Text>
                    {(match.kills + match.assists) / match.deaths} KDA
                  </Text>
                </Container>
                <Container>
                  <Text>100 CS (7)</Text>
                </Container>
                <Container>
                  <Text>{match.visionScore} vision</Text>
                </Container>
              </Card>
              <Card
                css={{
                  display: "flex",
                  flexDirection: "row",
                  width: "30%",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Container css={{ margin: "$0", padding: "$0" }}>
                  {match.item1 ? (
                    <Image
                      width={22}
                      height={22}
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                        summonersHash[match.spell1Id]
                      }.png`}
                      containerCss={{ margin: "$0", padding: "$0" }}
                    />
                  ) : (
                    <></>
                  )}
                  {match.item1 ? (
                    <Image
                      width={22}
                      height={22}
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                        summonersHash[match.spell1Id]
                      }.png`}
                      containerCss={{ margin: "$0", padding: "$0" }}
                    />
                  ) : (
                    <></>
                  )}
                  {match.item1 ? (
                    <Image
                      width={22}
                      height={22}
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                        summonersHash[match.spell1Id]
                      }.png`}
                      containerCss={{ margin: "$0", padding: "$0" }}
                    />
                  ) : (
                    <></>
                  )}
                  {match.item1 ? (
                    <Image
                      width={22}
                      height={22}
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                        summonersHash[match.spell1Id]
                      }.png`}
                      containerCss={{ margin: "$0", padding: "$0" }}
                    />
                  ) : (
                    <></>
                  )}
                  {match.item1 ? (
                    <Image
                      width={22}
                      height={22}
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                        summonersHash[match.spell1Id]
                      }.png`}
                      containerCss={{ margin: "$0", padding: "$0" }}
                    />
                  ) : (
                    <></>
                  )}
                  {match.item1 ? (
                    <Image
                      width={22}
                      height={22}
                      src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/spell/${
                        summonersHash[match.spell1Id]
                      }.png`}
                      containerCss={{ margin: "$0", padding: "$0" }}
                    />
                  ) : (
                    <></>
                  )}
                </Container>
              </Card>
            </Card>
          );
        })}
      </Container>
    );
    return champsOverview;
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
                  <Container
                    display="flex"
                    direction="row"
                    css={{
                      flexWrap: "nowrap",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    <Container
                      css={{
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "flex-start",
                        width: "68px",
                      }}
                    >
                      <Image
                        width={68}
                        height={68}
                        src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${playerRankedSolo.tier.toLowerCase()}.png`}
                        alt={playerRankedSolo.tier + "icon"}
                        containerCss={{ margin: 0 }}
                      />
                    </Container>
                    <Container
                      fluid
                      display="flex"
                      direction="column"
                      css={{ margin: "0", padding: "0" }}
                    >
                      <Container
                        display="flex"
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        css={{ padding: "0" }}
                      >
                        <Text b>
                          {playerRankedSolo.tier.charAt(0) +
                            playerRankedSolo.tier.substring(1).toLowerCase() +
                            " " +
                            romanToInt(playerRankedSolo.rank)}
                        </Text>
                        <Text>
                          {playerRankedSolo.wins}W {playerRankedSolo.losses}L
                        </Text>
                      </Container>
                      <Container
                        display="flex"
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        css={{ padding: "0" }}
                      >
                        <Text>{playerRankedSolo.leaguePoints} LP</Text>
                        <Text>
                          {calcWinPerc(
                            playerRankedSolo.wins,
                            playerRankedSolo.losses
                          )}
                          % Win Rate
                        </Text>
                      </Container>
                    </Container>
                  </Container>
                ) : (
                  ""
                )}
              </Grid>
              {/* <Grid
                xs={3}
                display="flex"
                direction="column"
                css={{
                  
                  borderRadius: "18px",
                  margin: "$10",
                }}
              >
                <Container className="queue-container">
                  <Text h4 css={{ width: "100%" }}>
                    Ranked Flex
                  </Text>
                </Container>

                {playerRankedFlex ? (
                  <Container
                    display="flex"
                    direction="row"
                    css={{
                      flexWrap: "nowrap",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    <Container
                      css={{
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "flex-start",
                        width: "68px",
                      }}
                    >
                      <Image
                        width={68}
                        height={68}
                        src={`https://static.bigbrain.gg/assets/lol/s12_rank_icons/${playerRankedFlex.tier.toLowerCase()}.png`}
                        alt={playerRankedFlex.tier + "icon"}
                        containerCss={{ margin: 0 }}
                      />
                    </Container>
                    <Container
                      fluid
                      display="flex"
                      direction="column"
                      css={{ margin: "0", padding: "0" }}
                    >
                      <Container
                        display="flex"
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        css={{ padding: "0" }}
                      >
                        <Text b>
                          {playerRankedFlex.tier.charAt(0) +
                            playerRankedFlex.tier.substring(1).toLowerCase() +
                            " " +
                            romanToInt(playerRankedFlex.rank)}
                        </Text>
                        <Text>
                          {playerRankedFlex.wins}W {playerRankedFlex.losses}L
                        </Text>
                      </Container>
                      <Container
                        display="flex"
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        css={{ padding: "0" }}
                      >
                        <Text>{playerRankedFlex.leaguePoints} LP</Text>
                        <Text>
                          {calcWinPerc(
                            playerRankedFlex.wins,
                            playerRankedFlex.losses
                          )}
                          % Win Rate
                        </Text>
                      </Container>
                    </Container>
                  </Container>
                ) : (
                  ""
                )}
              </Grid> */}
            </Grid.Container>
            <Grid
              xs={8}
              display="flex"
              direction="column"
              css={{
                borderRadius: "18px",
                margin: "$10",
              }}
            >
              <Text h4>Champion Stats</Text>
              {matchInformation ? (
                <Container>
                  <LatestPlayed />
                </Container>
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
