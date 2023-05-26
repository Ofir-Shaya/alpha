import React from "react";
import { Navbar, Link, Text, useTheme, Switch, Input } from "@nextui-org/react";
import { Layout } from "./common/Layout";
import { useTheme as useNextTheme } from "next-themes";
import {
  MoonRounded,
  SunRounded,
  Search,
  Mail,
  Password,
} from "./Icons/AllIcons";
import { Modal, Button, Row, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useRef } from "react";

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

  const [loginVisible, setLoginVisible] = React.useState(false);
  const [registerVisible, setRegisterVisible] = React.useState(false);

  const [inputEmail, setInputEmail] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");

  const emailChangeHandler = (e) => {
    const newEmail = e.target.value;
    setInputEmail(newEmail);
    console.log(newEmail);
  };
  const passwordChangeHandler = (e) => {
    const newPassword = e.target.value;
    setInputPassword(newPassword);
    console.log(newPassword);
  };

  const LoginHandler = () => setLoginVisible(true);
  const RegisterHandler = () => setRegisterVisible(true);

  const closeLoginHandler = () => {
    setLoginVisible(false);
    console.log("closed");
  };

  const closeRegisterHandler = () => {
    setRegisterVisible(false);
    console.log("closed");
  };

  const closeRegisterOpenLoginHandler = () => {
    setRegisterVisible(false);
    setLoginVisible(true);
    console.log("closed,opened");
  };
  const closeLoginOpenRegisterHandler = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
    console.log("closed,opened");
  };

  const registerUser = async () => {
    if (!String(inputEmail).match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i))
      return console.error(inputEmail + " is not a valid email address.");

    await fetch(
      `/api/loginapi?email=${inputEmail}&password=${inputPassword}&func=register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <Layout>
      <Navbar
        isBordered={isDark}
        variant="sticky"
        maxWidth="fluid"
        containerCss={{
          backgroundColor: "#0B0B0B !important",
        }}
      >
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
              aria-label="Search player"
              aria-labelledby="Search Player"
              aria-hidden="true"
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
              ref={searchInputRef}
              onKeyDown={handleKeyDown}
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
              <Button auto color="secondary" shadow onPress={LoginHandler}>
                Login
              </Button>
              <Modal
                closeButton
                aria-labelledby="modal-title-login"
                open={loginVisible}
                onClose={closeLoginHandler}
              >
                <Modal.Header>
                  <Text id="modal-title-login" size={24}>
                    Welcome to{" "}
                    <Text b size={24}>
                      Alpha
                    </Text>
                  </Text>
                </Modal.Header>
                <Row justify="center">
                  <Text
                    id="modal-title-register-already"
                    css={{ display: "inline-flex" }}
                    size={14}
                  >
                    New here?{" "}
                    <Link
                      id="modal-login-link"
                      size={14}
                      onPress={closeLoginOpenRegisterHandler}
                    >
                      Create an account
                    </Link>
                  </Text>
                </Row>

                <Modal.Body>
                  <Input
                    label="Email"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    initialValue={inputEmail}
                    onChange={emailChangeHandler}
                    contentLeft={<Mail fill="currentColor" />}
                  />
                  <Input.Password
                    label="Password"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    initialValue={inputPassword}
                    onChange={passwordChangeHandler}
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
                  <Button auto flat color="error" onPress={closeLoginHandler}>
                    Close
                  </Button>
                  <Button auto onPress={closeLoginHandler}>
                    Sign in
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Navbar.Content>

          <Navbar.Content
            hideIn="xs"
            color="inherit"
            href="register"
            css={{ mx: 10 }}
          >
            <div>
              <Button auto color="secondary" shadow onPress={RegisterHandler}>
                Register
              </Button>
              <Modal
                closeButton
                aria-labelledby="modal-title-register"
                open={registerVisible}
                onClose={closeRegisterHandler}
              >
                <Modal.Header>
                  <Text id="modal-title-register" size={24}>
                    Welcome to{" "}
                    <Text b size={24}>
                      Alpha
                    </Text>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Row justify="center">
                    <Text
                      id="modal-title-register-already"
                      css={{ display: "inline-flex" }}
                      size={14}
                    >
                      Already have an account?{" "}
                      <Link
                        id="modal-login-link"
                        size={14}
                        onPress={closeRegisterOpenLoginHandler}
                      >
                        Log in.
                      </Link>
                    </Text>
                  </Row>
                  <Input
                    label="Email"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    initialValue={inputEmail}
                    onChange={emailChangeHandler}
                    contentLeft={<Mail fill="currentColor" />}
                  />
                  <Input.Password
                    label="Password"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    initialValue={inputPassword}
                    onChange={passwordChangeHandler}
                    contentLeft={<Password fill="currentColor" />}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Row justify="center">
                    <Text size={10}>
                      By clicking on Create Account, you agree to our{" "}
                      <Link id="modal-tos-link" size={14} href="#">
                        Terms of Service.
                      </Link>
                    </Text>
                  </Row>
                  <Button
                    auto
                    flat
                    color="error"
                    onPress={closeRegisterHandler}
                  >
                    Close
                  </Button>
                  <Button auto onPress={registerUser}>
                    Create Account
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Navbar.Content>
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
