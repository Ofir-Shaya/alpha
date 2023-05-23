import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Container } from "@nextui-org/react";
import { useRouter } from "next/router";

const Champion = () => {
  const router = useRouter();
  const { Champion } = router.query;
  console.log(Champion);

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
        <Container css={{ marginTop: "$10" }}>
          <Container className="splash-art"></Container>
        </Container>
      </Container>
    </>
  );
};
export default Champion;
