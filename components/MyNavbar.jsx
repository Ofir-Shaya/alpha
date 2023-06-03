import React, { useState } from "react";
import { Navbar, Link, Text, useTheme, Switch, Input } from "@nextui-org/react";
import { Layout } from "./common/Layout";
import { useTheme as useNextTheme } from "next-themes";
import {
  MoonRounded,
  SunRounded,
  Search,
  Mail,
  Password,
  MyChampion,
  Bookmark,
} from "./Icons/AllIcons";
import { Modal, Button, Row, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

const MyNavbar = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  let { data: session } = useSession();

  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputProfile, setInputProfile] = useState("");
  const [inputChampion, setInputChampion] = useState("");
  const [matchedChampions, setMatchedChampions] = useState([]);
  const [validChampion, setValidChampion] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitRegister = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const user = await fetch("/api/auth/register", options);
      if (user && user.status === 201) {
        const json = await user.json();
        setRegisterVisible(false);
        router.push("http://localhost:3000/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitLogin = async (data) => {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "localhost:3000",
      });
      console.log(status);
      if (status.ok) {
        console.log(status);
        router.push(status.url);
      }
    } catch (error) {
      console.error(error);
    }
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
    "Renata",
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
    "Twisted Fate",
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

  const emailChangeHandler = (e) => {
    const { value } = e.target;
    setInputEmail(value);
  };
  const passwordChangeHandler = (e) => {
    const { value } = e.target;
    setInputPassword(value);
  };

  const ProfileChangeHandler = (e) => {
    const { value } = e.target;
    setInputProfile(value);
  };

  const ChampionChangeHandler = (e) => {
    const { value } = e.target;
    setInputChampion(value);

    const matchedChampions = championNames.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    setMatchedChampions(matchedChampions);
    const isValidChampion = matchedChampions.includes(value);
    if (value === "" || isValidChampion) {
      setValidChampion(true);
    } else {
      setValidChampion(false);
    }
  };

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
                    initialValue={inputEmail}
                    onChange={emailChangeHandler}
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
                    initialValue={inputPassword}
                    onChange={passwordChangeHandler}
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
                  <Button auto onPress={closeLoginHandler} type="submit">
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
                    initialValue={inputEmail}
                    onChange={emailChangeHandler}
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
                    initialValue={inputPassword}
                    onChange={passwordChangeHandler}
                    contentLeft={<Password fill="currentColor" />}
                    {...register("password", { required: true })}
                  />
                  <Input
                    label="Profile"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Profile"
                    type="text"
                    initialValue={inputProfile}
                    onChange={ProfileChangeHandler}
                    contentLeft={<Bookmark />}
                    {...register("profile")}
                  />
                  <Input
                    label="Champion"
                    list="championList"
                    bordered
                    fullWidth
                    color={validChampion ? "primary" : "danger"}
                    size="lg"
                    placeholder="Champion"
                    type="text"
                    initialValue={inputChampion}
                    onChange={ChampionChangeHandler}
                    contentLeft={<MyChampion />}
                    css={{ textAlign: "left" }}
                    {...register("champion")}
                  />
                  <datalist
                    id="championList"
                    style={{ position: "absolute", right: 0 }}
                  >
                    {matchedChampions.map((champion) => (
                      <option
                        key={champion}
                        value={champion}
                        style={{ position: "absolute", right: 0 }}
                      />
                    ))}
                  </datalist>
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
        <Navbar.Content>
          {session.user.favProfile
            ? session.user.favProfile
            : session.user.email}
        </Navbar.Content>
        <Navbar.Content>
          <Button onClick={() => signOut()}>Sign Out</Button>
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
