import { Container, Text, useTheme } from "@nextui-org/react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";

export default function Custom404() {
  const { isDark } = useTheme();

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
          minHeight: "100vh",
        }}
      >
        <MySidebar />
        <Container
          fluid
          css={{
            backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,${
              isDark ? "rgb(7, 7, 32) 100%)" : "rgb(217 217 247) 100%)"
            },linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%) !important`,
          }}
        >
          <Text h1>404 - Page Not Found</Text>
        </Container>
      </Container>
    </>
  );
}
