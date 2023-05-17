import { useState, useEffect, useRef } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Container,
  Text,
  Button,
  Table,
  useCollator,
  useAsyncList,
  Image,
} from "@nextui-org/react";

const Tierlist = () => {
  const initialColumns = [
    {
      key: "name",
      textValue: "Champion",
      allowsSorting: true,
    },
    {
      key: "winRate",
      textValue: "Winrate",
      allowsSorting: true,
    },
    {
      key: "pickRate",
      textValue: "Pickrate",
      allowsSorting: true,
    },
    {
      key: "avgGoldEarned",
      textValue: "Gold Earned",
      allowsSorting: true,
    },
    {
      key: "gamesPlayed",
      textValue: "Matches",
      allowsSorting: true,
    },
  ];
  const emptyColumns = [];

  const handleCombatButton = () => {
    const combatColumns = [
      {
        key: "name",
        textValue: "Champion",
        allowsSorting: true,
      },
      {
        key: "winRate",
        textValue: "Winrate",
        allowsSorting: true,
      },
      {
        key: "pickRate",
        textValue: "Pickrate",
        allowsSorting: true,
      },
      {
        key: "avgGoldEarned",
        textValue: "Gold Earned",
        allowsSorting: true,
      },
      {
        key: "avgKills",
        textValue: "Kills",
        allowsSorting: true,
      },
      {
        key: "avgDeaths",
        textValue: "Deaths",
        allowsSorting: true,
      },
      {
        key: "avgAssists",
        textValue: "Assists",
        allowsSorting: true,
      },
      {
        key: "tripleKills",
        textValue: "Triple Kill",
        allowsSorting: true,
      },
      {
        key: "quadraKills",
        textValue: "Quadra Kill",
        allowsSorting: true,
      },
      {
        key: "pentaKills",
        textValue: "Pentakill",
        allowsSorting: true,
      },
      {
        key: "avgTotalDamageDealtToChampions",
        textValue: "Total Damage",
        allowsSorting: true,
      },
      {
        key: "avgTimeCCingOthers",
        textValue: "CC Other Duration",
        allowsSorting: true,
      },
      {
        key: "gamesPlayed",
        textValue: "Matches",
        allowsSorting: true,
      },
    ];

    if (selectedColumns.length !== combatColumns.length)
      setSelectedColumns([...emptyColumns, ...combatColumns]);
    else {
      setSelectedColumns([...initialColumns]);
    }
  };

  const handleObjectiveButton = () => {
    const objectiveColumns = [
      {
        key: "name",
        textValue: "Champion",
        allowsSorting: true,
      },
      {
        key: "winRate",
        textValue: "Winrate",
        allowsSorting: true,
      },
      {
        key: "pickRate",
        textValue: "Pickrate",
        allowsSorting: true,
      },
      {
        key: "avgGoldEarned",
        textValue: "Gold Earned",
        allowsSorting: true,
      },
      {
        key: "avgDamageDealtToObjectives",
        textValue: "Objectives Damage",
        allowsSorting: true,
      },
      {
        key: "avgDamageDealtToTurrets",
        textValue: "Turrets Damage",
        allowsSorting: true,
      },
      {
        key: "avgFirstBloodKill",
        textValue: "First Blood",
        allowsSorting: true,
      },
      {
        key: "avgFirstTowerKill",
        textValue: "First Tower",
        allowsSorting: true,
      },
      {
        key: "avgFirstDragonKill",
        textValue: "First Dragon",
        allowsSorting: true,
      },
      {
        key: "avgFirstRiftHeraldKill",
        textValue: "First Herald",
        allowsSorting: true,
      },
      {
        key: "avgFirstInhibitorKill",
        textValue: "First Inhibitor",
        allowsSorting: true,
      },
      {
        key: "avgFirstBaronKill",
        textValue: "First Baron",
        allowsSorting: true,
      },
      {
        key: "gamesPlayed",
        textValue: "Matches",
        allowsSorting: true,
      },
    ];
    if (selectedColumns.length !== objectiveColumns.length)
      setSelectedColumns([...emptyColumns, ...objectiveColumns]);
    else {
      setSelectedColumns([...initialColumns]);
    }
  };

  const handleSupportButton = () => {
    const supportColumns = [
      {
        key: "name",
        textValue: "Champion",
        allowsSorting: true,
      },
      {
        key: "winRate",
        textValue: "Winrate",
        allowsSorting: true,
      },
      {
        key: "pickRate",
        textValue: "Pickrate",
        allowsSorting: true,
      },
      {
        key: "avgGoldEarned",
        textValue: "Gold Earned",
        allowsSorting: true,
      },
      {
        key: "avgTotalHeal",
        textValue: "Heals",
        allowsSorting: true,
      },
      {
        key: "avgAssists",
        textValue: "Assists",
        allowsSorting: true,
      },
      {
        key: "avgWardsPlaced",
        textValue: "Wards Placed",
        allowsSorting: true,
      },
      {
        key: "avgWardsKilled",
        textValue: "Wards Killed",
        allowsSorting: true,
      },
      {
        key: "avgVisionScore",
        textValue: "Vision Score",
        allowsSorting: true,
      },
      {
        key: "avgTimeCCingOthers",
        textValue: "CC Other Duration",
        allowsSorting: true,
      },

      {
        key: "avgCompleteSupportQuestInTime",
        textValue: "Support Quest <18M",
        allowsSorting: true,
      },
      {
        key: "gamesPlayed",
        textValue: "Matches",
        allowsSorting: true,
      },
    ];
    if (selectedColumns.length !== supportColumns.length)
      setSelectedColumns([...emptyColumns, ...supportColumns]);
    else {
      setSelectedColumns([...initialColumns]);
    }
  };

  let collator = useCollator();
  const [selectedColumns, setSelectedColumns] = useState(initialColumns);
  const [tableData, setTableData] = useState(null);
  const rowIndex = useRef(0);

  let list = useAsyncList({
    initialSortDescriptor: {
      column: "winRate",
      direction: "descending",
    },
    async load({ cursor }) {
      try {
        const res = await fetch(
          `/api/lolapi?func=getChampionsTable&cursor=${cursor}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          return {
            items: data.items,
            cursor: data.next,
          };
        } else {
          throw new Error("Failed to fetch data. Status: " + res.status);
        }
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while loading data.");
      }
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          console.log(a["name"], b["name"]);
          console.log(a[sortDescriptor.column], b[sortDescriptor.column]);
          // Check if column values contain a percentage symbol
          let newA;
          let newB;
          try {
            if (
              a[sortDescriptor.column] !== 0 &&
              a[sortDescriptor.column].includes("%")
            )
              newA = Number(a[sortDescriptor.column].slice(0, -1));
            else newA = Number(a[sortDescriptor.column]);
            if (
              b[sortDescriptor.column] !== 0 &&
              b[sortDescriptor.column].includes("%")
            )
              newB = Number(b[sortDescriptor.column].slice(0, -1));
            else newB = Number(b[sortDescriptor.column]);
            console.log(newA, newB);
            // Compare the items by the sorted column
            let cmp = newA - newB;
            console.log(cmp);
            // Flip the direction if descending order is specified.
            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }

            return cmp;
          } catch (error) {
            console.error(error);
          }
        }),
      };
    },
  });

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <Container
            css={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${cellValue}.png`}
              containerCss={{
                width: "48px",
                height: "48px",
                margin: "$0",
                padding: "$0",
                objectFit: "contain",
              }}
            />
            <Text css={{ margin: "auto" }}>{cellValue}</Text>
          </Container>
        );
      default:
        return (
          <Text>
            {String(cellValue).endsWith(".0")
              ? cellValue.slice(0, -2)
              : String(cellValue).endsWith(".0%")
              ? cellValue.slice(0, -3) + "%"
              : cellValue}
          </Text>
        );
    }
  };

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
              css={{
                minWidth: "100%",
                height: "calc($space$15 * 15)",
                backgroundColor: "#191937",
              }}
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
            >
              <Table.Header columns={selectedColumns}>
                {(column) => (
                  <Table.Column
                    key={column.key}
                    allowsSorting={column.allowsSorting}
                    css={{
                      textAlign: "center",
                      color:
                        column.key === list.sortDescriptor.column
                          ? "White"
                          : "#cddcfe",
                      backgroundColor: "#191937",
                      fontSize:
                        column.key === list.sortDescriptor.column && "1rem",
                      textDecorationLine:
                        column.key === list.sortDescriptor.column &&
                        "underline",
                      textDecorationColor: "#3273fa",
                      "&:hover": {
                        backgroundColor: "#191937",
                        color:
                          column.key === list.sortDescriptor.column
                            ? "White"
                            : "#cddcfe",
                      },
                    }}
                  >
                    {column.textValue}
                  </Table.Column>
                )}
              </Table.Header>
              {list ? (
                <Table.Body
                  items={list?.items || []}
                  loadingState={list.loadingState}
                  onLoadMore={list.loadMore}
                >
                  {(item) => {
                    rowIndex.current += 1;
                    return (
                      <Table.Row
                        aria-label="table row"
                        key={item.id + "-champ"}
                        css={{
                          backgroundColor:
                            rowIndex.current % 2 === 0 ? "#191937" : "#11112a",
                          borderRadius: "10px",
                        }}
                      >
                        {(columnKey) => (
                          <Table.Cell
                            css={{
                              backgroundColor:
                                columnKey === list.sortDescriptor.column &&
                                "rgba(37,37,75,.75)",
                            }}
                          >
                            {renderCell(item, columnKey)}
                          </Table.Cell>
                        )}
                      </Table.Row>
                    );
                  }}
                </Table.Body>
              ) : (
                <Table.Body></Table.Body>
              )}
            </Table>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Tierlist;
