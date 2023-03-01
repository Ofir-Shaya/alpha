import { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import Front from "@/components/Front";
import { Container } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { setCookie } from "cookies-next";

export default function Home() {
  const [player, setPlayer] = useState(null);
  const [mastery, setMastery] = useState(null);

  const fetchPlayer = async (user) => {
    await fetch(`/api/lolapi?user=${user}&func=searchPlayer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.ok)
      .then((data) => {
        setPlayer(data);
      });
  };

  const playerMastery = async (summonerId) => {
    // await fetch(`/api/lolapi?func=playerMastery&id=${summonerId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.ok && res.json())
    //   .then((data) => {
    //     setMastery(data);
    //   });
  };

  const updateLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

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
        <Button onPress={() => fetchPlayer("SipTheSoup")}>Click me</Button>
        <Button
          onPress={() => playerMastery(JSON.parse(localStorage.player).id)}
        >
          Click After
        </Button>
        <Button onPress={() => console.log(player)}>log player</Button>

        {/*
        <Button onPress={() => updateLocalStorage("mastery", mastery)}>
          Update LS mastery
        </Button> 
         <Button
          onPress={() =>
            setCookie("player", JSON.parse(localStorage.player), {})
          }
        >
          Set player cookie
        </Button>
        <Button
          onPress={() =>
            setCookie("mastery", JSON.parse(localStorage.mastery), {})
          }
        >
          Set mastery cookie
        </Button> */}
        <Front />
      </Container>
    </>
  );
}
