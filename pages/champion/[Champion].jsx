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

const Champion = () => {
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
        <Container css={{ marginTop: "$10" }}></Container>
      </Container>
    </>
  );
};
export default Champion;
