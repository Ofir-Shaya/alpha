import React from "react";
import { Navbar, Link, Text, useTheme, Switch, Input } from "@nextui-org/react";
import { Layout } from "./common/Layout";
import { useTheme as useNextTheme } from "next-themes";
import {
  MoonRounded,
  SunRounded,
  Search,
  AcmeLogo,
  Mail,
  Password,
} from "./Icons/AllIcons";
import { Modal, Button, Row, Checkbox } from "@nextui-org/react";

const MyNavbar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const collapseItems = [
    "ALPHA",
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <Layout>
      <Navbar isBordered={isDark} variant="sticky" maxWidth="fluid">
        <Navbar.Brand css={{ mx: 50 }}>
          <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />

          <AcmeLogo />

          <Text b color="inherit" hideIn="xs">
            ALPHA
          </Text>
        </Navbar.Brand>

        <Navbar.Content
          css={{
            dflex: "center",
            w: "100%",
          }}
        >
          <Navbar.Item
            css={{
              mx: 50,
              "@smMax": {
                w: "100%",
                jc: "center",
              },
            }}
          >
            <Input
              id="navbarSearchInput"
              clearable
              size="md"
              fullWidth
              contentLeft={
                <Search fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
              }}
              labelRight="EUNE"
              placeholder="Search..."
            />
          </Navbar.Item>
        </Navbar.Content>

        <Navbar.Content
          activeColor={isDark ? "secondary" : "primary"}
          variant={"highlight"}
          enableCursorHighlight
          css={{
            dflex: "center",
            w: "100%",
          }}
        >
          {isDark ? (
            <MoonRounded width="22" height="22" />
          ) : (
            <SunRounded width="22" height="22" />
          )}

          <Switch
            css={{ mx: 50 }}
            color="secondary"
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />

          <Navbar.Content
            hideIn="xs"
            color="inherit"
            href="login"
            css={{ mx: 10 }}
          >
            <div>
              <Button auto color="secondary" shadow onPress={handler}>
                Login
              </Button>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
              >
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    Welcome to{" "}
                    <Text b size={18}>
                      Alpha
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    contentLeft={<Mail fill="currentColor" />}
                  />
                  <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                  />
                  <Row justify="space-between">
                    <Checkbox>
                      <Text size={14}>Remember me</Text>
                    </Checkbox>
                    <Text size={14}>Forgot password?</Text>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onPress={closeHandler}>
                    Close
                  </Button>
                  <Button auto onPress={closeHandler}>
                    Sign in
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Navbar.Content>

          <Navbar.Link
            hideIn="xs"
            color="inherit"
            href="register"
            css={{ mx: 10, mr: 50 }}
          >
            Register
          </Navbar.Link>
        </Navbar.Content>

        <Navbar.Collapse showIn="xs">
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem key={item}>
              {index === 0 ? (
                <Text h4 b color="inherit">
                  ALPHA
                </Text>
              ) : (
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href="#"
                >
                  {item}
                </Link>
              )}
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
};

export default MyNavbar;
