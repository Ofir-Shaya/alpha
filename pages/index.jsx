import { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  useTheme,
  Input,
  Image,
  Container,
  Button,
  Text,
} from "@nextui-org/react";
import { Search } from "../components/Icons/AllIcons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Home() {
  const router = useRouter();

  const searchInputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchPlayer();
    }
  };

  const searchPlayer = () => {
    const searchInputValue = searchInputRef.current.value;
    if (searchInputValue.length >= 4) {
      router.push(`/player/${searchInputValue}?server=EUNE`);
    } else {
      console.error("Must enter a name longer than 3 letters");
    }
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

        <Container
          fluid
          display="flex"
          direction="column"
          alignContent="center"
          alignItems="center"
          css={{ marginTop: "2rem" }}
        >
          <Container
            css={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Text
              h1
              css={{
                textGradient: "45deg, $yellow600 -20%, $red600 100%",
              }}
            >
              Alpha
            </Text>
            <Text h2>A League of Legends Statistics Site.</Text>
            <Text h4>This site is specifically made for the GOAT</Text>
            <Text h5>Greatest Of All Time.</Text>
          </Container>
          <Image
            showSkeleton
            width={480}
            height={320}
            src="/media/goat.jpg"
            alt="Goat Image"
            objectFit="cover"
            containerCss={{
              marginBottom: "50px",
              borderRadius: "10px",
            }}
          />
          <Input
            aria-label="Search player"
            aria-labelledby="Search Player"
            aria-hidden="true"
            id="frontSearchInput"
            clearable
            size="md"
            fullWidth
            label="Search player"
            contentLeft={
              <Search fill="var(--nextui-colors-accents6)" size={16} />
            }
            contentLeftStyling={false}
            css={{
              w: "35%",
            }}
            labelLeft="EUNE"
            placeholder="Search..."
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
          />
          <Link
            href={{
              pathname: "/player/[profile]",
              query: { profile: searchInputRef, server: "EUNE" },
            }}
          >
            <Button
              color="secondary"
              auto
              ghost
              autoFocus
              onClick={searchPlayer}
              css={{ marginTop: "0.5rem" }}
            >
              Search
            </Button>
          </Link>
        </Container>
      </Container>
    </>
  );
}
