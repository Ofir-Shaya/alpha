import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Container, Text, Button, Table, Image, Link } from "@nextui-org/react";
import { useAsyncList } from "react-stately";

const Champions = () => {
  async function load() {
    try {
      const response = await fetch(`/api/lolapi?func=getAllChampions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          items: data,
        };
      } else {
        throw new Error("Failed to fetch data. Status: " + response.status);
      }
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while loading data.");
    }
  }

  const allChampions = useAsyncList({ load });

  const renderCell = (item) => {
    return (
      <Container
        className="hover-ani"
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          textAlign: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Link
          href={`/champions/${item}`}
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <figure>
            <Image
              src={`https://static.bigbrain.gg/assets/lol/riot_static/13.9.1/img/champion/${item}.png`}
              containerCss={{
                margin: "$0",
                padding: "$0",
                objectFit: "contain",
              }}
            />
            <Container
              className="hover-bg"
              css={{
                top: 0,
                position: "absolute",
                width: "120px",
                height: "120px",
                backgroundColor: "white",
                opacity: "0.2",
                zIndex: "$4",
              }}
            ></Container>
          </figure>

          <Text
            className="p"
            css={{
              margin: "auto",
            }}
          >
            {item.replace(/([A-Z])/g, " $1").trim()}
          </Text>
        </Link>
      </Container>
    );
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
        }}
      >
        <MySidebar />

        <Container
          css={{
            marginTop: "$15",
            margin: "0",
            display: "flex",
            flexDirection: "column",
            backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%)`,
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
          ></Container>
          <Container>
            <Table
              aria-label="tier list table"
              css={{
                minWidth: "100%",
                height: "calc($space$15 * 15)",
                backgroundColor: "#191937",
              }}
            >
              <Table.Header>
                <Table.Column
                  key="champions-table-column"
                  css={{ backgroundColor: "transparent" }}
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
                </Table.Column>
              </Table.Header>
              {allChampions ? (
                <Table.Body
                  items={allChampions?.items || []}
                  loadingState={allChampions.loadingState}
                  css={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "center",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    alignContent: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  {(item) => {
                    return (
                      <Table.Row
                        aria-label="table-row"
                        key={item.id + item.name}
                      >
                        <Table.Cell>{renderCell(item.name)}</Table.Cell>
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
export default Champions;
