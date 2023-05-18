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
            }}
          >
            <Text>Champions</Text>
          </Container>
          <Container>
            <Grid.Container></Grid.Container>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default Champions;
