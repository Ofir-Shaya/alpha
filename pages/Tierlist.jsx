import { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  useTheme,
  Image,
  Container,
  Text,
  Button,
  Table,
  useAsyncList,
  useCollator,
} from "@nextui-org/react";

const Tierlist = () => {
  const collator = useCollator({ numeric: true });

  async function load({ signal }) {
    // const res = await fetch("https://swapi.py4e.com/api/people/?search", {
    //   signal,
    // });
    // const json = await res.json();
    // return {
    //   items: json.results,
    // };
  }

  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  const list = useAsyncList({ load, sort });

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
          justifyContent: "center",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        <MySidebar />
        <Container fluid css={{ display: "flex", flexDirection: "column" }}>
          <Container>
            <Text h2> LoL Tier List</Text>
            <Text h3> for All Roles, All Ranks.</Text>
          </Container>
          <Container>
            <Container
              css={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Button light>ALL </Button>
              <Button light>Combat </Button>
              <Button light>Support </Button>
              <Button light>First % </Button>
            </Container>
            <Table
              aria-label="tier list table"
              css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
            >
              <Table.Header>
                <Table.Column key="champ-rank">Rank</Table.Column>
                <Table.Column key="champion" allowsSorting>
                  Champion
                </Table.Column>
                <Table.Column key="champ-winrate" allowsSorting>
                  Win Rate %
                </Table.Column>
                <Table.Column key="champ-pickrate" allowsSorting>
                  Pick Rate %
                </Table.Column>
                <Table.Column key="champ-gold-earned" allowsSorting>
                  Gold earned
                </Table.Column>
                {/* Combat related */}
                <Table.Column key="champ-kills" allowsSorting>
                  Kills
                </Table.Column>
                <Table.Column key="champ-deaths" allowsSorting>
                  Deaths
                </Table.Column>
                <Table.Column key="champ-assists" allowsSorting>
                  Assists
                </Table.Column>
                <Table.Column key="champ-damage" allowsSorting>
                  Damage Dealt
                </Table.Column>
                <Table.Column key="champ-damage-taken" allowsSorting>
                  Damage Taken
                </Table.Column>
                <Table.Column key="champ-cc-other" allowsSorting>
                  Time CC Others
                </Table.Column>
                <Table.Column key="champ-objectives-damage" allowsSorting>
                  Objective Damage
                </Table.Column>
                {/* Support related */}
                <Table.Column key="champ-heals" allowsSorting>
                  Heals
                </Table.Column>
                <Table.Column key="champ-vision-score" allowsSorting>
                  Vision Score
                </Table.Column>
                <Table.Column key="champ-ward-placed" allowsSorting>
                  Ward Placed
                </Table.Column>
                <Table.Column key="champ-ward-killed" allowsSorting>
                  Ward Killed
                </Table.Column>
                <Table.Column key="champ-cc-other" allowsSorting>
                  Time CC Others
                </Table.Column>
                <Table.Column key="champ-complete-support" allowsSorting>
                  {"Support Quest < 18M"}
                </Table.Column>
                {/* First related */}
                <Table.Column key="champ-first-blood" allowsSorting>
                  First Blood %
                </Table.Column>
                <Table.Column key="champ-first-tower" allowsSorting>
                  First Tower %
                </Table.Column>
                <Table.Column key="champ-first-inhib" allowsSorting>
                  First Inhibitor %
                </Table.Column>
                <Table.Column key="champ-first-baron" allowsSorting>
                  First Baron %
                </Table.Column>
                <Table.Column key="champ-first-dragon" allowsSorting>
                  First Dragon %
                </Table.Column>

                <Table.Column key="champ-matches" allowsSorting>
                  Matches
                </Table.Column>
              </Table.Header>
              <Table.Body></Table.Body>
            </Table>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Tierlist;
