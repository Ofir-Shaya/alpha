import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Container, Text, Grid, Loading, Card, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Champion = () => {
  const router = useRouter();
  const { Champion } = router.query;
  const [championInfo, setChampionInfo] = useState(null);

  useEffect(() => {
    const fetchChampionInfo = async () => {
      if (!Champion) return;
      try {
        const response = await fetch(
          `/api/lolapi?championName=${Champion}&func=detailedChampion`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setChampionInfo(data);
        } else console.log("Error fetching Champion search.");
      } catch (error) {
        console.error(error);
      }
    };
    fetchChampionInfo();
  }, [Champion]);

  const calculateKDA = (champion) =>
    champion.deaths !== 0 ? (
      <>
        {Math.round(
          ((champion.kills + champion.assists) / champion.deaths) * 10
        ) / 10}{" "}
      </>
    ) : (
      <> {champion.kills + champion.assists} </>
    );

  const ChampionIcon = () => {
    return (
      <Card
        className="champion-icon"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",

          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          height={89}
          width={89}
          src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${Champion}.png`}
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
  const ChampionPassive = () => {
    return (
      <Card
        className="champion-passive"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          height={32}
          width={32}
          src={`https://cdn.communitydragon.org/13.10.1/champion/${Champion}/ability-icon/passive`}
          alt={"passive"}
          objectFit="cover"
          css={{
            borderRadius: "6px",
            border: "1px solid rgb(205,69,69)",
            margin: "0",
          }}
        />
        <Text
          css={{
            position: "absolute",
            zIndex: "2",
            bottom: "5px",
            left: "50%",
            transform: "translate(-50%, 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            border: "1px solid rgb(205,69,69)",
            backgroundColor: "#383864",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            width: "12px",
            height: "12px",
          }}
        >
          P
        </Text>
      </Card>
    );
  };
  const ChampionQ = () => {
    return (
      <Card
        className="champion-q"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",

          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          height={32}
          width={32}
          src={`https://cdn.communitydragon.org/13.10.1/champion/${Champion}/ability-icon/q`}
          alt={"q"}
          objectFit="cover"
          css={{
            borderRadius: "6px",
            border: "1px solid rgb(205,69,69)",
            margin: "0",
          }}
        />
        <Text
          css={{
            position: "absolute",
            zIndex: "2",
            bottom: "5px",
            left: "50%",
            transform: "translate(-50%, 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            border: "1px solid rgb(205,69,69)",
            backgroundColor: "#383864",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            width: "12px",
            height: "12px",
          }}
        >
          Q
        </Text>
      </Card>
    );
  };
  const ChampionW = () => {
    return (
      <Card
        className="champion-w"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",

          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          height={32}
          width={32}
          src={`https://cdn.communitydragon.org/13.10.1/champion/${Champion}/ability-icon/w`}
          alt={"w"}
          objectFit="cover"
          css={{
            borderRadius: "6px",
            border: "1px solid rgb(205,69,69)",
            margin: "0",
          }}
        />
        <Text
          css={{
            position: "absolute",
            zIndex: "2",
            bottom: "5px",
            left: "50%",
            transform: "translate(-50%, 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            border: "1px solid rgb(205,69,69)",
            backgroundColor: "#383864",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            width: "12px",
            height: "12px",
          }}
        >
          W
        </Text>
      </Card>
    );
  };
  const ChampionE = () => {
    return (
      <Card
        className="champion-e"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",

          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          height={32}
          width={32}
          src={`https://cdn.communitydragon.org/13.10.1/champion/${Champion}/ability-icon/e`}
          alt={"e"}
          objectFit="cover"
          css={{
            borderRadius: "6px",
            border: "1px solid rgb(205,69,69)",
            margin: "0",
          }}
        />
        <Text
          css={{
            position: "absolute",
            zIndex: "2",
            bottom: "5px",
            left: "50%",
            transform: "translate(-50%, 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            border: "1px solid rgb(205,69,69)",
            backgroundColor: "#383864",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            width: "12px",
            height: "12px",
          }}
        >
          E
        </Text>
      </Card>
    );
  };
  const ChampionR = () => {
    return (
      <Card
        className="champion-r"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: "0",
          width: "fit-content",
          position: "relative",

          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          height={32}
          width={32}
          src={`https://cdn.communitydragon.org/13.10.1/champion/${Champion}/ability-icon/r`}
          alt={"r"}
          objectFit="cover"
          css={{
            borderRadius: "6px",
            border: "1px solid rgb(205,69,69)",
            margin: "0",
          }}
        />
        <Text
          css={{
            position: "absolute",
            zIndex: "2",
            bottom: "5px",
            left: "50%",
            transform: "translate(-50%, 50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            border: "1px solid rgb(205,69,69)",
            backgroundColor: "#383864",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "700",
            width: "12px",
            height: "12px",
          }}
        >
          R
        </Text>
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
        css={{
          margin: 0,
          padding: 0,
          backgroundColor: "#262b5a",
        }}
      >
        <MySidebar />
        <Container css={{ marginTop: "$10" }}>
          <Container
            className="splash-art"
            css={{
              backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%),url(https://static.bigbrain.gg/assets/lol/riot_static/13.10.1/img/splash/${Champion}_0.webp);`,
            }}
          >
            <Container
              className="header-text"
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Text h2>{Champion}</Text>
              <Text
                css={{
                  fontSize: "26px",
                  color: "LightGray",
                  marginLeft: "$5",
                }}
              >
                Stats
              </Text>
            </Container>
            <Container
              className="body-text"
              css={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                textAlign: "start",
              }}
            >
              {championInfo ? (
                <>
                  <Container
                    css={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <ChampionIcon />
                    <Grid.Container gap={1}>
                      <Grid
                        css={{ display: "flex" }}
                        className="champion-passive"
                      >
                        <ChampionPassive />
                      </Grid>
                      <Grid css={{ display: "flex" }} className="champion-q">
                        <ChampionQ />
                      </Grid>
                      <Grid css={{ display: "flex" }} d className="champion-w">
                        <ChampionW />
                      </Grid>
                      <Grid css={{ display: "flex" }} className="champion-e">
                        <ChampionE />
                      </Grid>
                      <Grid css={{ display: "flex" }} d className="champion-r">
                        <ChampionR />
                      </Grid>
                    </Grid.Container>
                  </Container>

                  <Grid.Container
                    gap={2}
                    css={{
                      justifyContent: "center",
                      alignContent: "center",
                      margin: "auto",
                    }}
                  >
                    <Grid
                      xs={2}
                      className="win-rate"
                      css={{
                        backgroundColor: "#11112a",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        alignContent: "center",
                        borderRight: "1px solid #070720",
                      }}
                    >
                      <Text b size={18}>
                        {championInfo.winRate}
                      </Text>
                      <Text>Win Rate</Text>
                    </Grid>

                    <Grid
                      xs={2}
                      className="win-rate"
                      css={{
                        backgroundColor: "#11112a",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        alignContent: "center",
                        borderRight: "1px solid #070720",
                      }}
                    >
                      <Text b size={18}>
                        {championInfo.pickRate}
                      </Text>
                      <Text>Pick Rate</Text>
                    </Grid>

                    <Grid
                      xs={2}
                      className="win-rate"
                      css={{
                        backgroundColor: "#11112a",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        alignContent: "center",
                        borderRight: "1px solid #070720",
                      }}
                    >
                      <Text b size={18}>
                        {calculateKDA(championInfo)}
                      </Text>
                      <Text>KDA</Text>
                    </Grid>

                    <Grid
                      xs={2}
                      className="win-rate"
                      css={{
                        backgroundColor: "#11112a",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        alignContent: "center",
                        borderRight: "1px solid #070720",
                      }}
                    >
                      <Text b size={18}>
                        {championInfo.pentaKills}
                      </Text>
                      <Text>Penta Kills</Text>
                    </Grid>

                    <Grid
                      xs={2}
                      className="win-rate"
                      css={{
                        backgroundColor: "#11112a",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        alignContent: "center",
                      }}
                    >
                      <Text b size={18}>
                        {championInfo.gamesPlayed}
                      </Text>
                      <Text>Games Played</Text>
                    </Grid>
                  </Grid.Container>

                  <Container className="most-picked-items"></Container>
                  <Container className="champion-detailed-stats"></Container>
                </>
              ) : (
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
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Champion;
