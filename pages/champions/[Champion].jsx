import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Container,
  Text,
  Grid,
  Loading,
  Card,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Champion = () => {
  const router = useRouter();
  const { Champion } = router.query;
  const [championInfo, setChampionInfo] = useState(null);
  const [championItems, setChampionItems] = useState(null);
  const [itemsData, setItemsData] = useState(null);
  const [championData, setChampionData] = useState(null);

  // Get Champion Info
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

  // Get Champion Items
  useEffect(() => {
    const fetchChampionItems = async () => {
      if (!Champion) return;
      try {
        const response = await fetch(
          `/api/lolapi?championName=${Champion}&func=championItems`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setChampionItems(data);
        } else console.log("Error fetching Champion Items.");
      } catch (error) {
        console.error(error);
      }
    };
    fetchChampionItems();
  }, [Champion]);

  // Fetch Items,Champs Data
  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await fetch("/json/items.json");
        const data = await response.json();
        setItemsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchChampionData = async () => {
      if (!Champion) return;
      try {
        const response = await fetch(`/json/${Champion}.json`);
        const data = await response.json();
        console.log(data);
        setChampionData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItemsData();
    fetchChampionData();
  }, [Champion]);

  const calculateKDA = (champion) =>
    champion.deaths !== 0 ? (
      <>
        {Math.round(
          ((champion.kills + champion.assists) / champion.deaths) * 10
        ) / 10}
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
  const ChampionItem0 = () => {
    return (
      <Card
        className="champion-item0"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[0][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[0][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem1 = () => {
    return (
      <Card
        className="champion-item1"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[1][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[1][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem2 = () => {
    return (
      <Card
        className="champion-item2"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[2][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[2][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem3 = () => {
    return (
      <Card
        className="champion-item3"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[3][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[3][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem4 = () => {
    return (
      <Card
        className="champion-item4"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[4][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[4][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem5 = () => {
    return (
      <Card
        className="champion-item5"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[5][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[5][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem6 = () => {
    return (
      <Card
        className="champion-item6"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[6][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[6][1]}
        </Text>
      </Card>
    );
  };
  const ChampionItem7 = () => {
    return (
      <Card
        className="champion-item7"
        css={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
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
          src={`https://ddragon.leagueoflegends.com/cdn/13.9.1/img/item/${championItems[7][0]}.png`}
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
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            textAlign: "center",
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
          {championItems[7][1]}
        </Text>
      </Card>
    );
  };
  const AbilityToolTip = (ability) => {
    return (
      <Container
        css={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "20rem",
        }}
      >
        <Text h4 className="center-text">
          {championData.abilities[ability][0].name}
        </Text>
        <p className="center-text">
          {championData.abilities[ability][0].blurb}
        </p>
      </Container>
    );
  };

  const ItemToolTip = (ItemId) => {
    const item = itemsData[ItemId];
    return (
      <Container
        css={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "20rem",
        }}
      >
        <Text h5 className="center-text">
          {item.name}
        </Text>
        <p className="center-text">Cost: {item.shop.prices.total}</p>
        <p className="center-text">{item.simpleDescription}</p>
      </Container>
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
        <Container
          css={{
            backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%)`,
          }}
        >
          {Champion && (
            <Container
              className="splash-art"
              css={{
                width: "1014px",
                height: "auto",
                backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%),url(https://static.bigbrain.gg/assets/lol/riot_static/13.10.1/img/splash/${Champion}_0.webp);`,
              }}
            >
              <Container
                className="spacer"
                css={{
                  marginTop: "$20",
                }}
              ></Container>
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
                        marginBottom: "$20",
                      }}
                    >
                      <Tooltip
                        hideArrow
                        placement="bottom"
                        css={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        content={championData.title}
                      >
                        <ChampionIcon />
                      </Tooltip>
                      <Grid.Container gap={1}>
                        <Text
                          h1
                          css={{
                            fontWeight: "400",
                            width: "100%",
                            fontSize: "2rem",
                            marginBottom: "0",
                            marginLeft: "$5",
                          }}
                        >
                          <span>{Champion}</span>
                          <span className="text-secondary">
                            {" "}
                            Detailed stats and info
                          </span>
                        </Text>

                        <Grid
                          css={{ display: "flex", marginLeft: "$5" }}
                          className="champion-passive"
                        >
                          <Tooltip
                            placement="bottom"
                            hideArrow
                            content={AbilityToolTip("P")}
                            css={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          >
                            <ChampionPassive />
                          </Tooltip>
                        </Grid>

                        <Grid css={{ display: "flex" }} className="champion-q">
                          <Tooltip
                            placement="bottom"
                            hideArrow
                            content={AbilityToolTip("Q")}
                            css={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          >
                            <ChampionQ />
                          </Tooltip>
                        </Grid>
                        <Grid css={{ display: "flex" }} className="champion-w">
                          <Tooltip
                            placement="bottom"
                            hideArrow
                            content={AbilityToolTip("W")}
                            css={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          >
                            <ChampionW />
                          </Tooltip>
                        </Grid>
                        <Grid css={{ display: "flex" }} className="champion-e">
                          <Tooltip
                            placement="bottom"
                            hideArrow
                            content={AbilityToolTip("E")}
                            css={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          >
                            <ChampionE />
                          </Tooltip>
                        </Grid>
                        <Grid css={{ display: "flex" }} className="champion-r">
                          <Tooltip
                            placement="bottom"
                            hideArrow
                            content={AbilityToolTip("R")}
                            css={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                          >
                            <ChampionR />
                          </Tooltip>
                        </Grid>
                      </Grid.Container>
                    </Container>

                    <Grid.Container
                      gap={2}
                      css={{
                        justifyContent: "center",
                        alignContent: "center",
                        margin: "auto",
                        marginBottom: "$15",
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

                    <Container
                      className="most-picked-items"
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <Text b h2>
                        Most picked items on {Champion}:
                      </Text>
                      {championItems && (
                        <Grid.Container
                          css={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            textAlign: "center",
                            margin: "auto",
                            marginBottom: "$15",
                          }}
                        >
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[0] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[0][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem0 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[1] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[1][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem1 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[2] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[2][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem2 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[3] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[3][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem3 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[4] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[4][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem4 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[5] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[5][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem5 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[6] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[6][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem6 />
                              </Tooltip>
                            )}
                          </Grid>
                          <Grid css={{ marginInline: "$5" }}>
                            {championItems[7] && (
                              <Tooltip
                                placement="bottom"
                                hideArrow
                                content={ItemToolTip(championItems[7][0])}
                                css={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                              >
                                <ChampionItem7 />
                              </Tooltip>
                            )}
                          </Grid>
                        </Grid.Container>
                      )}
                    </Container>
                    <Container
                      className="champion-detailed-stats"
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      <Text h3>More stats about {Champion}:</Text>
                      <Grid.Container
                        gap={2}
                        css={{
                          justifyContent: "center",
                          alignContent: "center",
                          margin: "auto",
                          marginBottom: "$15",
                        }}
                      >
                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.attackDamage.flat}
                          </Text>
                          <Text>Base AD</Text>
                        </Grid>

                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.attackRange.flat}
                          </Text>
                          <Text>Range</Text>
                        </Grid>

                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.attackSpeed.flat}
                          </Text>
                          <Text>Base AS</Text>
                        </Grid>

                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.health.flat}
                          </Text>
                          <Text>Base Health</Text>
                        </Grid>

                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.healthRegen.flat}
                          </Text>
                          <Text>Health Regen</Text>
                        </Grid>
                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.movespeed.flat}
                          </Text>
                          <Text>Movement Speed</Text>
                        </Grid>
                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.armor.flat}
                          </Text>
                          <Text>Base Armor</Text>
                        </Grid>
                        <Grid
                          xs={1.5}
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
                          <Text b size={16}>
                            {championData.stats.magicResistance.flat}
                          </Text>
                          <Text>Base MR</Text>
                        </Grid>
                      </Grid.Container>
                    </Container>
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
          )}
        </Container>
      </Container>
    </>
  );
};
export default Champion;
