import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Container,
  Grid,
  useTheme,
  Text,
  Card,
  Loading,
  Image,
  Button,
  Link as NextUiLink,
} from "@nextui-org/react";
import NextLink from "next/link";
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
    } else accumulator += romanHash[roman[i]];
  }
  return accumulator;
};

const calcWinPerc = (wins, losses) => {
  const total = wins + losses;
  return ((wins / total) * 100).toFixed(0);
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
  const { isDark } = useTheme();

  const router = useRouter();
  const [playerFound, setPlayerFound] = useState(null);
  const { Profile, server } = router.query;
  const [player, setPlayer] = useState(null);
  const [playerRanked, setPlayerRanked] = useState(null);
  const [playerRankedSolo, setPlayerRankedSolo] = useState(null);
  const [playerChamps, setPlayerChamps] = useState(null);
  const [matchInformation, setMatchInformation] = useState(null);
  const [champInformation, setChampInformation] = useState(null);

  // Getting info of player searched -> when profile changed
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
          if (data.status && data.status === 404) {
            setPlayer(data.name);
            setPlayerFound(false);
          } else {
            setPlayerFound(true);
            setPlayer(data);
          }
        } else {
          console.log(response);
          console.log("Error fetching player search.");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlayer();
  }, [Profile]);

  // Getting ranked info -> when player changed
  useEffect(() => {
    const pullRankedInfo = async () => {
      if (!player) return;
      if (!playerFound) return;
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

  // Update soloq and flexq rank -> when player ranked changed
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

  // getting player matches -> when player ranked changed
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

  // getting more information about player matches -> when player matches changed
  useEffect(() => {
    async function fetchMatchesWithInfo() {
      if (!playerChamps) return;
      const matchesWithInfo = await Promise.all(
        playerChamps.map(async (match) => {
          const matchInfo = await getMatchInformation(match.matchId);

          return { ...match, ...matchInfo };
        })
      );
      console.log(matchesWithInfo);
      setMatchInformation(matchesWithInfo);
    }
    fetchMatchesWithInfo();
  }, [playerChamps]);

  useEffect(() => {
    async function getPlayerChampionOverview() {
      try {
        if (!playerRanked) return;
        const response = await fetch(
          `/api/lolapi?playerId=${playerRanked.summonerId}&func=getPlayerChampionOverview`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setChampInformation(data);
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPlayerChampionOverview();
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
          width: "fit-content",
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
    const matchesOverview = (
      <Container
        fluid
        css={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {matchInformation.map((match, index) => {
          return (
            <Card
              key={index + "match-card"}
              width="100%"
              variant="bordered"
              css={{
                backgroundColor: match.win ? "rgba(8,166,255,0.3)" : "#45192b",
                display: "flex",
                flexDirection: "row",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: match.win
                    ? "rgba(8,166,255,0.4)"
                    : "#511b2e",
                },
              }}
            >
              <Card
                className="match-details"
                css={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Text b>{match.queueId === 420 ? "Ranked Solo/Duo" : ""}</Text>
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
                  backgroundColor: "transparent",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  width: "90",
                }}
              >
                <Container
                  css={{
                    position: "relative",
                    margin: "$0",
                    padding: "$0",
                  }}
                >
                  <Image
                    src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${match.championName}.png`}
                    containerCss={{
                      margin: "$0",
                      padding: "$0",
                      objectFit: "",
                    }}
                  />
                  <p style={{ position: "absolute", bottom: "0", right: "0" }}>
                    {match.champLevel}
                  </p>
                </Container>
                <Container css={{ margin: "$0", padding: "$0" }}>
                  <Image
                    width={22}
                    height={22}
                    src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${
                      summonersHash[match.spell1Id]
                    }.png`}
                    containerCss={{ margin: "$0", padding: "$0" }}
                  />
                  <Image
                    width={22}
                    height={22}
                    src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/spell/${
                      summonersHash[match.spell2Id]
                    }.png`}
                    containerCss={{ margin: "$0", padding: "$0" }}
                  />
                </Container>
                <Container css={{ margin: "$0", padding: "$0" }}>
                  <Image
                    width={22}
                    height={22}
                    src={`https://opgg-static.akamaized.net/meta/images/lol/perk/${match.mainRune}.png`}
                    containerCss={{ margin: "$0", padding: "$0" }}
                  />
                  <Image
                    width={22}
                    height={22}
                    src={`https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${match.secondaryRune}.png`}
                    containerCss={{ margin: "$0", padding: "$0" }}
                  />
                </Container>
              </Card>
              <Card
                className="player-stats"
                css={{
                  display: "flex",
                  flexDirection: "column",
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
                    {match.deaths !== 0 ? (
                      <>
                        {Math.round(
                          ((match.kills + match.assists) / match.deaths) * 10
                        ) / 10}{" "}
                        KDA
                      </>
                    ) : (
                      <> {match.kills + match.assists} KDA</>
                    )}
                  </Text>
                </Container>
                <Container>
                  <Text>
                    {match.creepScore !== 0 &&
                    typeof match.gameDuration === "string" ? (
                      <>
                        {match.creepScore} (
                        {Math.floor(
                          match.creepScore /
                            Number(match.gameDuration.slice(0, 2))
                        )}
                        )
                      </>
                    ) : (
                      <> {match.creepScore}(0)</>
                    )}
                  </Text>
                </Container>
                <Container>
                  <Text>{match.visionScore} vision</Text>
                </Container>
              </Card>
              <Card
                className="champion-items"
                css={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Container
                  css={{
                    margin: "0",
                    padding: "0",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "66px",
                  }}
                >
                  {match.item1 !== 0 ? (
                    <Image
                      width={"22px"}
                      height={"22px"}
                      src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${match.item1}.png
                      `}
                      css={{ margin: "0", padding: "0" }}
                      containerCss={{
                        width: "22px",
                        height: "22px",
                        margin: "0",
                        padding: "0",
                        borderRadius: "$squared",
                        flexBasis: "33.333333%",
                      }}
                    />
                  ) : (
                    <Container
                      width={"22px"}
                      height={"22px"}
                      css={{
                        backgroundColor: match.win
                          ? "rgba(0,180,0,0.2)"
                          : "rgba(180,0,0,0.2)",
                        flexBasis: "33.333333%",
                      }}
                    ></Container>
                  )}

                  {match.item2 !== 0 ? (
                    <Image
                      width={"22px"}
                      height={"22px"}
                      src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${match.item2}.png
                      `}
                      css={{ margin: "0", padding: "0" }}
                      containerCss={{
                        margin: "0",
                        padding: "0",
                        borderRadius: "$squared",
                        flexBasis: "33.333333%",
                      }}
                    />
                  ) : (
                    <Container
                      width={"22px"}
                      height={"22px"}
                      css={{
                        backgroundColor: match.win
                          ? "rgba(0,180,0,0.2)"
                          : "rgba(180,0,0,0.2)",
                        flexBasis: "33.333333%",
                      }}
                    ></Container>
                  )}
                  {match.item3 !== 0 ? (
                    <Image
                      width={"22px"}
                      height={"22px"}
                      src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${match.item3}.png
                      `}
                      css={{ margin: "0", padding: "0" }}
                      containerCss={{
                        margin: "0",
                        padding: "0",
                        borderRadius: "$squared",
                        flexBasis: "33.333333%",
                      }}
                    />
                  ) : (
                    <Container
                      width={"22px"}
                      height={"22px"}
                      css={{
                        backgroundColor: match.win
                          ? "rgba(0,180,0,0.2)"
                          : "rgba(180,0,0,0.2)",
                        flexBasis: "33.333333%",
                      }}
                    ></Container>
                  )}
                  {match.item4 !== 0 ? (
                    <Image
                      width={"22px"}
                      height={"22px"}
                      src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${match.item4}.png
                      `}
                      css={{ margin: "0", padding: "0" }}
                      containerCss={{
                        margin: "0",
                        padding: "0",
                        borderRadius: "$squared",
                        flexBasis: "33.333333%",
                      }}
                    />
                  ) : (
                    <Container
                      width={"22px"}
                      height={"22px"}
                      css={{
                        backgroundColor: match.win
                          ? "rgba(0,180,0,0.2)"
                          : "rgba(180,0,0,0.2)",
                        flexBasis: "33.333333%",
                      }}
                    ></Container>
                  )}
                  {match.item5 !== 0 ? (
                    <Image
                      width={"22px"}
                      height={"22px"}
                      src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${match.item5}.png
                      `}
                      css={{ margin: "0", padding: "0" }}
                      containerCss={{
                        margin: "0",
                        padding: "0",
                        borderRadius: "$squared",
                        flexBasis: "33.333333%",
                      }}
                    />
                  ) : (
                    <Container
                      width={"22px"}
                      height={"22px"}
                      css={{
                        backgroundColor: match.win
                          ? "rgba(0,180,0,0.2)"
                          : "rgba(180,0,0,0.2)",
                        flexBasis: "33.333333%",
                      }}
                    ></Container>
                  )}

                  {match.item6 !== 0 ? (
                    <Image
                      width={"22px"}
                      height={"22px"}
                      src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${match.item6}.png
                      `}
                      css={{ margin: "0", padding: "0" }}
                      containerCss={{
                        margin: "0",
                        padding: "0",
                        borderRadius: "$squared",
                        flexBasis: "33.333333%",
                      }}
                    />
                  ) : (
                    <Container
                      width={"22px"}
                      height={"22px"}
                      css={{
                        backgroundColor: match.win
                          ? "rgba(0,180,0,0.2)"
                          : "rgba(180,0,0,0.2)",
                        flexBasis: "33.333333%",
                      }}
                    ></Container>
                  )}
                </Container>
              </Card>
              <Card
                className="teams"
                css={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                  margin: 0,
                  borderRadius: "0",
                  backgroundColor: "transparent",
                }}
              >
                <Container
                  className="blue-team"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0",
                  }}
                >
                  {match.players.map((player) => {
                    return (
                      player.teamId === 100 && (
                        <Container
                          css={{
                            display: "flex",
                            flexDirection: "row",
                            paddingLeft: "0",
                            paddingRight: "0",
                            padding: "0",
                            flexWrap: "nowrap",
                            marginLeft: "auto",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            height={"14px"}
                            width={"14px"}
                            containerCss={{
                              height: "14px",
                              width: "14px",
                              alignItems: "center",
                              flexDirection: "row",
                              display: "flex",
                              alignSelf: "center",
                              margin: "0",
                            }}
                            src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${player.championName}.png`}
                          />

                          <NextLink
                            href={
                              "/player/" +
                              player.player.profile.username +
                              "?server=EUNE"
                            }
                          >
                            <NextUiLink
                              css={{
                                fontSize: "10px",
                                textAlign: "center",
                                overflow: "hidden",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {player.player.profile.username}
                            </NextUiLink>
                          </NextLink>
                        </Container>
                      )
                    );
                  })}
                </Container>
                <Container
                  className="red-team"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0",
                  }}
                >
                  {match.players.map((player) => {
                    return (
                      player.teamId === 200 && (
                        <Container
                          css={{
                            display: "flex",
                            flexDirection: "row",
                            paddingLeft: "0",
                            paddingRight: "0",
                            padding: "0",
                            flexWrap: "nowrap",
                            marginLeft: "auto",
                          }}
                        >
                          <Image
                            height={"14px"}
                            width={"14px"}
                            containerCss={{
                              height: "14px",
                              width: "14px",
                              alignItems: "center",
                              flexDirection: "row",
                              display: "flex",
                              alignSelf: "center",
                              margin: "0",
                            }}
                            src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${player.championName}.png`}
                          />

                          <NextLink
                            href={
                              "/player/" +
                              player.player.profile.username +
                              "?server=EUNE"
                            }
                          >
                            <NextUiLink
                              css={{
                                fontSize: "10px",
                                textAlign: "center",
                                overflow: "hidden",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {player.player.profile.username}
                            </NextUiLink>
                          </NextLink>
                        </Container>
                      )
                    );
                  })}
                </Container>
              </Card>
            </Card>
          );
        })}
      </Container>
    );
    return matchesOverview;
  };

  const ChampsPlayed = () => {
    const champsOverview = (
      <Container
        fluid
        css={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {champInformation.map((champ, index) => {
          return (
            <Card
              key={index + "champ-card"}
              width="100%"
              variant="bordered"
              css={{
                backgroundColor: "#191937",
                display: "flex",
                flexDirection: "row",
                borderRadius: "0",
                "&:hover": {
                  backgroundColor: "#0d0d22",
                },
              }}
            >
              <Container
                className="champion-face"
                css={{
                  display: "flex",
                  width: "fit-content",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <Image
                  src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${champ.championName}.png`}
                  height={48}
                  width={48}
                  containerCss={{
                    margin: "$0",
                    padding: "$0",
                    objectFit: "",
                  }}
                />
              </Container>
              <Container
                className="champion-stats"
                css={{ display: "flex", flexDirection: "row", padding: 0 }}
              >
                <Container
                  className="column-1"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    width: "auto",
                    justifyContent: "center",
                  }}
                >
                  <Text>{champ.championName}</Text>
                </Container>
                <Container
                  className="column-2"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    width: "auto",
                  }}
                >
                  <Container
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      width: "auto",
                    }}
                  >
                    <Text>
                      {champ._sum.deaths !== 0 ? (
                        <>
                          {Math.round(
                            ((champ._sum.kills + champ._sum.assists) /
                              champ._sum.deaths) *
                              10
                          ) / 10}{" "}
                          KDA
                        </>
                      ) : (
                        <> {champ._sum.kills + champ._sum.assists} KDA</>
                      )}
                    </Text>
                  </Container>
                  <Container
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      width: "auto",
                    }}
                  >
                    <Text>
                      {champ._sum.kills}{" "}
                      <span style={{ color: "#25254b" }}>/</span>{" "}
                      {champ._sum.deaths}{" "}
                      <span style={{ color: "#25254b" }}>/</span>{" "}
                      {champ._sum.assists}
                    </Text>
                  </Container>
                </Container>
                <Container
                  className="column-3"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    width: "auto",
                  }}
                >
                  <Container
                    css={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      width: "auto",
                    }}
                  >
                    <Text h6>
                      {calcWinPerc(
                        champ._sum.win,
                        champ._count.matchId - champ._sum.win
                      )}
                      %
                    </Text>
                  </Container>
                  <Text>{champ._count.matchId + " games"}</Text>
                </Container>
              </Container>
            </Card>
          );
        })}
      </Container>
    );

    return champsOverview;
  };

  const PageHeader = () => {
    if (!player)
      return (
        <Container
          css={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </Container>
      );
    if (!playerFound)
      return (
        <Container
          className="center-text"
          css={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text h2> Oh no! We couldn't find summoner "{player}"</Text>
          <Text h4>
            Please Double check your spelling or maybe your summoner is in a
            different region.
          </Text>
        </Container>
      );
    return (
      <Grid.Container
        className="summoner-profile-header"
        gap={0}
        justify="start"
        direction="row"
        css={{
          paddingTop: "20px",
          borderRadius: "10px",
        }}
      >
        <Grid xs={1} css={{}}>
          <SummonerIcon />
        </Grid>
        <Grid xs={2} direction="column">
          <SummonerProfileHeader />
          <Button
            auto
            onPress={updateRankedInformation}
            css={{ width: "fit-content", marginLeft: "$10" }}
          >
            Update
          </Button>
        </Grid>
      </Grid.Container>
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
        css={{
          margin: 0,
          padding: 0,
          backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%)`,
        }}
      >
        <MySidebar />
        <Container
          css={{
            marginLeft: "150px",
          }}
        >
          <PageHeader />
          {playerRankedSolo ? (
            <Grid.Container
              className="summoner-profile-overview"
              gap={0}
              justify="start"
              direction="row"
              css={{
                paddingTop: "20px",
                borderRadius: "10px",
              }}
            >
              <Grid
                className="column-1"
                css={{ display: "flex", flexDirection: "column", gap: "$10" }}
                xs={3}
              >
                <Container
                  display="flex"
                  direction="column"
                  css={{
                    borderRadius: "18px",
                    justifyContent: "start",
                    backgroundColor: "#191937",
                    height: "fit-content",
                  }}
                >
                  <Container className="queue-container">
                    <Text
                      h4
                      css={{
                        width: "100%",
                        color: "#ffffff",
                      }}
                    >
                      Ranked Solo
                    </Text>
                  </Container>

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
                        <Text b css={{ color: "#ffffff" }}>
                          {playerRankedSolo.tier.charAt(0) +
                            playerRankedSolo.tier.substring(1).toLowerCase() +
                            " " +
                            romanToInt(playerRankedSolo.rank)}
                        </Text>
                        <Text css={{ color: "#ffffff" }}>
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
                        <Text css={{ color: "#ffffff" }}>
                          {playerRankedSolo.leaguePoints} LP
                        </Text>
                        <Text css={{ color: "#ffffff" }}>
                          {calcWinPerc(
                            playerRankedSolo.wins,
                            playerRankedSolo.losses
                          )}
                          % Win Rate
                        </Text>
                      </Container>
                    </Container>
                  </Container>
                </Container>

                <Container
                  display="flex"
                  direction="column"
                  css={{
                    borderRadius: "18px",
                    justifyContent: "start",
                    backgroundColor: "#191937",
                    height: "fit-content",
                  }}
                >
                  {champInformation && (
                    <>
                      <Text h4 css={{ textAlign: "center", color: "#ffffff" }}>
                        Champions Overview:
                      </Text>
                      <Container css={{ padding: "$2" }}>
                        <ChampsPlayed />
                      </Container>
                    </>
                  )}
                </Container>
              </Grid>

              <Grid
                display="flex"
                direction="column"
                xs={8}
                css={{
                  borderRadius: "18px",
                  justifyContent: "center",
                  backgroundColor: "#191937",
                  marginInlineStart: "$5",
                }}
              >
                {matchInformation && (
                  <>
                    <Text h4 css={{ textAlign: "center", color: "#ffffff" }}>
                      Matches Overview:
                    </Text>

                    <Container>
                      <LatestPlayed />
                    </Container>
                  </>
                )}
              </Grid>
            </Grid.Container>
          ) : (
            ""
          )}
        </Container>
      </Container>
    </>
  );
};

export default Profile;
