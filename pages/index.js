import { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { useTheme, Input, Image, Container, Button } from "@nextui-org/react";
import { Search } from "../components/Icons/AllIcons";
import Link from "next/link";

export default function Home() {
  const [player, setPlayer] = useState(null);

  const [searchInput, setSearchInput] = useState();

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

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
          css={{ marginTop: "10rem" }}
        >
          <Image
            showSkeleton
            width={480}
            height={320}
            src="/media/goat.jpg"
            alt="Default"
            objectFit="cover"
            containerCss={{
              marginBottom: "50px",
              borderRadius: "10px",
            }}
          />
          <Input
            id="frontSearchInput"
            clearable
            size="md"
            fullWidth
            contentLeft={
              <Search fill="var(--nextui-colors-accents6)" size={16} />
            }
            contentLeftStyling={false}
            css={{
              w: "35%",
            }}
            labelLeft="EUNE"
            placeholder="Search..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <Link
            href={{
              pathname: "/player/[profile]",
              query: { profile: searchInput, server: "EUNE" },
            }}
          >
            <Button
              color="secondary"
              auto
              ghost
              autoFocus
              onClick={fetchPlayer}
            >
              Search
            </Button>
          </Link>
        </Container>
      </Container>
    </>
  );
}
