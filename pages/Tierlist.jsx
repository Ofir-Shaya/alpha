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
  const initialColumns = [
    {
      key: "champion-rank",
      textValue: "Rank",
    },
    {
      key: "champion-key",
      textValue: "Champion",
      allowsSorting: true,
    },
    {
      key: "champion-winrate",
      textValue: "Winrate",
      allowsSorting: true,
    },
    {
      key: "champion-pickrate",
      textValue: "Pickrate",
      allowsSorting: true,
    },
    {
      key: "champion-gold-earned",
      textValue: "Gold Earned",
      allowsSorting: true,
    },
    {
      key: "champion-level",
      textValue: "Level",
      allowsSorting: true,
    },
    {
      key: "champion-cs",
      textValue: "CS",
      allowsSorting: true,
    },
    {
      key: "champion-matches",
      textValue: "Matches",
      allowsSorting: true,
    },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const collator = useCollator({ numeric: true });

  const handleCombatButton = () => {
    let combatColumns = [
      {
        key: "champion-kills",
        textValue: "Kills",
        allowsSorting: true,
      },
      {
        key: "champion-deaths",
        textValue: "Deaths",
        allowsSorting: true,
      },
      {
        key: "champion-assists",
        textValue: "Assists",
        allowsSorting: true,
      },
      {
        key: "champion-triplekills",
        textValue: "Triple Kill",
        allowsSorting: true,
      },
      {
        key: "champion-quadrakills",
        textValue: "Quadra Kill",
        allowsSorting: true,
      },
      {
        key: "champion-pentakills",
        textValue: "Pentakill",
        allowsSorting: true,
      },
      {
        key: "champion-total-damage",
        textValue: "Total Damage",
        allowsSorting: true,
      },
      {
        key: "champion-cc-other",
        textValue: "CC Other Duration",
        allowsSorting: true,
      },
    ];
    let newColumns = [...columns];
    newColumns = combatColumns.filter((column) =>
      columns.every((col) => col.key !== column.key)
    );
    newColumns = [...initialColumns, ...newColumns];
    setColumns([...newColumns]);
  };

  const handleObjectiveButton = () => {
    let objectiveColumns = [
      {
        key: "champion-damage-objectives",
        textValue: "Objectives Damage",
        allowsSorting: true,
      },
      {
        key: "champion-turrets-damage",
        textValue: "Turrets Damage",
        allowsSorting: true,
      },
      {
        key: "champion-first-blood",
        textValue: "First Blood",
        allowsSorting: true,
      },
      {
        key: "champion-triplekills",
        textValue: "First Tower",
        allowsSorting: true,
      },
      {
        key: "champion-total-damage",
        textValue: "First Dragon",
        allowsSorting: true,
      },
      {
        key: "champion-first-rift",
        textValue: "First Herald",
        allowsSorting: true,
      },
      {
        key: "champion-quadrakills",
        textValue: "First Inhibitor",
        allowsSorting: true,
      },
      {
        key: "champion-pentakills",
        textValue: "First Baron",
        allowsSorting: true,
      },
    ];
    let newColumns = [...columns];
    newColumns = objectiveColumns.filter((column) =>
      columns.every((col) => col.key !== column.key)
    );
    newColumns = [...initialColumns, ...newColumns];
    setColumns([...newColumns]);
  };

  const handleSupportButton = () => {
    let supportColumns = [
      {
        key: "champion-heals",
        textValue: "Heals",
        allowsSorting: true,
      },
      {
        key: "champion-assists",
        textValue: "Assists",
        allowsSorting: true,
      },
      {
        key: "champion-wards-placed",
        textValue: "Wards Placed",
        allowsSorting: true,
      },
      {
        key: "champion-wards-killed",
        textValue: "Wards Killed",
        allowsSorting: true,
      },
      {
        key: "champion-vision-score",
        textValue: "Vision Score",
        allowsSorting: true,
      },
      {
        key: "champion-cc-other",
        textValue: "CC Other Duration",
        allowsSorting: true,
      },

      {
        key: "champion-support-quest18",
        textValue: "Support Quest <18M",
        allowsSorting: true,
      },
    ];

    let newColumns = [...columns];
    newColumns = supportColumns.filter((column) =>
      columns.every((col) => col.key !== column.key)
    );
    newColumns = [...initialColumns, ...newColumns];
    setColumns([...newColumns]);
  };

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
              <Button light onPress={handleCombatButton}>
                Combat{" "}
              </Button>
              <Button light onPress={handleSupportButton}>
                Support{" "}
              </Button>
              <Button light onPress={handleObjectiveButton}>
                Objectives{" "}
              </Button>
            </Container>
            <Table
              aria-label="tier list table"
              css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    key={column.key}
                    allowsSorting={column.allowsSorting}
                  >
                    {column.textValue}
                  </Table.Column>
                )}
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
