import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Container,
  Text,
  Button,
  Table,
  Image,
  Link,
  Grid,
} from "@nextui-org/react";
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
              backgroundImage:
                "radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%),url(https://static.bigbrain.gg/assets/lol/riot_static/13.10.1/img/splash/Aatrox_0.webp);",
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
              {championInfo && (
                <Grid.Container gap={2}>
                  <Grid xs={4} className="win-rate"></Grid>
                  <Grid xs={4} className="pick-rate"></Grid>
                  <Grid xs={4} className="kda"></Grid>
                  <Grid xs={4} className="penta-kills"></Grid>
                  <Grid xs={4} className="games-played"></Grid>
                </Grid.Container>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Champion;
