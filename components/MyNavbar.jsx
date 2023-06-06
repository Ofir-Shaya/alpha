import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Link,
  Text,
  useTheme,
  Switch,
  Input,
  Modal,
  Button,
  Row,
  Container,
  Dropdown,
} from "@nextui-org/react";
import { Layout } from "./common/Layout";
import { useTheme as useNextTheme } from "next-themes";
import {
  MoonRounded,
  SunRounded,
  Search,
  Mail,
  Password,
  Bookmark,
  MyChampion,
} from "./Icons/AllIcons";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

const MyNavbar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  let { data: session } = useSession();

  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getUserInfo = async () => {
      if (!session) return;
      try {
        const res = await fetch(
          `/api/userapi?func=userInfo&email=${session.user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
        } else {
          throw new Error("Failed to fetch data. Status: " + res.status);
        }
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while loading data.");
      }
    };
    getUserInfo();
  }, [session]);

  const onSubmitRegister = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const user = await fetch("/api/auth/register", options);
      if (user && user.status === 201) {
        setRegisterVisible(false);
        onSubmitLogin(data);
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitLogin = async (data) => {
    try {
      console.log(data);
      const status = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "localhost:3000",
      });
      if (status.ok) {
        router.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    signOut();
  };

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

  const championNames = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Akshan",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "Aurelion Sol",
    "Azir",
    "Bard",
    "Belveth",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Chogath",
    "Corki",
    "Darius",
    "Diana",
    "Draven",
    "Dr Mundo",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "Jarvan IV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Khazix",
    "Kindred",
    "Kled",
    "Kog Maw",
    "KSante",
    "Leblanc",
    "LeeSin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "MasterYi",
    "Milio",
    "Miss Fortune",
    "Mordekaiser",
    "Morgana",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nilah",
    "Nocturne",
    "Nunu",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "RekSai",
    "Rell",
    "Renata Glasc",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "TahmKench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "Twisted  Fate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Velkoz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Xayah",
    "Xerath",
    "Xin Zhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra",
  ];

  const LoginHandler = () => setLoginVisible(true);
  const RegisterHandler = () => setRegisterVisible(true);

  const closeLoginHandler = () => {
    setLoginVisible(false);
  };

  const closeRegisterHandler = () => {
    setRegisterVisible(false);
  };

  const closeRegisterOpenLoginHandler = () => {
    setRegisterVisible(false);
    setLoginVisible(true);
  };
  const closeLoginOpenRegisterHandler = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const Guest = () => {
    return (
      <>
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
              <form onSubmit={handleSubmit(onSubmitLogin)}>
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
                    New here?
                    <Link
                      id="modal-login-link"
                      size={14}
                      onPress={closeLoginOpenRegisterHandler}
                      css={{ marginLeft: "4px" }}
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
                    contentLeft={<Mail fill="currentColor" />}
                    {...register("email", { required: true })}
                  />
                  <Input.Password
                    label="Password"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                    {...register("password", { required: true })}
                  />
                  <Row justify="space-between">
                    <Link css={{ fontSize: "14px" }}>Forgot password?</Link>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button auto flat color="error" onPress={closeLoginHandler}>
                    Close
                  </Button>
                  <Button auto type="submit">
                    Sign in
                  </Button>
                </Modal.Footer>
              </form>
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
              <form onSubmit={handleSubmit(onSubmitRegister)}>
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
                      Already have an account?
                      <Link
                        id="modal-login-link"
                        size={14}
                        onPress={closeRegisterOpenLoginHandler}
                        css={{ marginLeft: "4px" }}
                      >
                        Log in.
                      </Link>
                    </Text>
                  </Row>
                  <Input
                    label="Email *"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    type="email"
                    contentLeft={<Mail fill="currentColor" />}
                    {...register("email", { required: true })}
                  />
                  <Input.Password
                    label="Password *"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    contentLeft={<Password fill="currentColor" />}
                    {...register("password", { required: true })}
                    autoComplete="new-password"
                  />
                  <Input
                    label="Profile"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Profile"
                    type="text"
                    contentLeft={<Bookmark />}
                    {...register("profile", { required: true })}
                  />
                  <label
                    style={{
                      color: "#0072F5",
                      fontWeight: 400,
                      padding: "0 0 0 0.25rem",
                      marginBottom: "0.375rem",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                    }}
                  >
                    Champion
                  </label>
                  <Container
                    css={{
                      position: "relative",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      padding: "0",
                    }}
                  >
                    <MyChampion position="absolute" top="12" left="8" />
                    <select
                      {...register("champion", { required: true })}
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "0.875rem",
                        height: "3rem",
                        paddingLeft: "3.5rem",
                        width: "100%",
                        margin: "0",
                      }}
                    >
                      {championNames.map((option) => (
                        <option
                          value={option}
                          style={{
                            backgroundColor: "rgba(22,24,26,0.8)",
                            border: "none",
                            borderRadius: "0.875rem",
                          }}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </Container>
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
                  <Button auto type="submit">
                    Create Account
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </Navbar.Content>
      </>
    );
  };

  const User = () => {
    return (
      <>
        <Navbar.Content css={{ marginInline: "1rem" }}>
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Button
                auto
                light
                css={{ px: 0, dflex: "center" }}
                ripple={false}
              >
                {userInfo.favProfile}
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href={`/player/${userInfo.favProfile}?server=EUNE`}>
                  LoL Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href={"/profile"}>Edit User</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Content>
          <Button onClick={() => handleSignOut()}>Sign Out</Button>
        </Navbar.Content>
      </>
    );
  };

  return (
    <Layout>
      <Navbar
        isBordered={isDark}
        variant="sticky"
        maxWidth="fluid"
        containerCss={{
          backgroundColor: isDark
            ? "#0B0B0B !important"
            : "rgba(191 191 191,0.6)",
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
        </Navbar.Content>
        {session ? User() : Guest()}
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
