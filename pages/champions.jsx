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
  Link as NextUiLink,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Champions = () => {
  const [allChampions, setAllChampions] = useState(null);

  useEffect(() => {
    async function fetchAllChampions() {
      try {
        const response = await fetch(`/api/lolapi?&func=getAllChampions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAllChampions(data);
        } else console.error("Error fetching champs.");
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllChampions();
    console.log(allChampions);
  }, []);

  useEffect(() => {
    const displayAllChampions = () => {
      if (allChampions === null) return;
      return (
        <Container css={{ backgroundColor: "Red" }}>
          {(champion) => {
            <Grid
              xs={2}
              id={champion.id}
              justify="center"
              alignContent="center"
              alignItems="center"
            >
              <Image
                src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${champion.name}.png`}
              />
              <Text b>{champion.name}</Text>
            </Grid>;
          }}
        </Container>
      );
    };
  }, [allChampions]);

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
            marginTop: "$15",
            margin: "0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Container
            css={{
              display: "flex",
              height: "fit-content",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <Text h2> LoL Champions Search</Text>
            <Text h3> Discover the best stats for every champion</Text>
          </Container>
          <Container
            css={{
              display: "flex",
              height: "fit-content",
              flexDirection: "column",
              flexWrap: "wrap",
              marginBottom: "$2",
            }}
          >
            <Text
              h4
              css={{
                textDecoration: "underline",
                textDecorationColor: "#3273fa",
              }}
            >
              Champions
            </Text>
          </Container>
          <Container>
            <Grid.Container gap={2} justify="center">
              {displayAllChampions()}
            </Grid.Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Champions;
