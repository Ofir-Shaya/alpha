import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import Front from "@/components/Front";
import { Container, Text } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Register() {
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
        <Container
          fluid
          display="flex"
          justify="center"
          alignContent="start"
          alignItems="center"
        >
          <Text
            h1
            size={60}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            Register
          </Text>
        </Container>
      </Container>
    </>
  );
}
