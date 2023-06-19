import React, { useEffect, useState } from "react";
import { Link, useTheme, Grid, Spacer, Text } from "@nextui-org/react";
import {
  MyChampion,
  Champion,
  Home,
  AcmeLogo,
  Bookmark,
  Tiers,
} from "./Icons/AllIcons";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.min.css";

const MySidebar = () => {
  const { isDark } = useTheme();

  let { data: session } = useSession();

  const [userInfo, setUserInfo] = useState(null);

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
          return;
        } else {
          console.error(res.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, [session]);

  const notifyBad = () => {
    toast.warn("You must be logged in to use this.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDark ? "dark" : "light",
    });
  };

  return (
    <Grid.Container
      display="flex"
      justify="flex-start"
      direction="row"
      alignItems="flex-start"
      css={{
        margin: "0",
        width: "4%",
        paddingTop: "9px",
        height: "100vh",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: "9999",
        backgroundColor: isDark ? "#000000 " : "rgba(191, 191, 191,1)",
        transition: "width 0.05s ease",
        "&:hover": {
          width: "15%",
          "& .show-on-hover ": {
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
          },
        },
      }}
    >
      <ToastContainer />
      <Grid
        gap={0}
        css={{
          paddingLeft: "5px",
          borderBottom: "2px solid #0B0B0B",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          textAlign: "start",
          alignSelf: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <AcmeLogo />

        <Text
          b
          className="show-on-hover "
          css={{ paddingLeft: "5px", display: "none" }}
        >
          Alpha
        </Text>
      </Grid>
      <Grid
        css={{
          paddingLeft: "5px",
          borderBottom: "2px solid #0B0B0B",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link block color="inherit" href="/">
          <Home width="26" height="26" />
          <Text
            className=" show-on-hover "
            css={{ paddingLeft: "5px", display: "none" }}
          >
            Home
          </Text>
        </Link>
      </Grid>

      <Grid
        css={{
          paddingLeft: "5px",
          borderBottom: "2px solid #0B0B0B",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link block color="inherit" href="/champions">
          <Champion width="26" height="26" />
          <Text
            className=" show-on-hover "
            css={{ paddingLeft: "5px", display: "none" }}
          >
            Champions
          </Text>
        </Link>
      </Grid>

      <Grid
        css={{
          paddingLeft: "5px",
          borderBottom: "2px solid #0B0B0B",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link block color="inherit" href="/tierlist">
          <Tiers width="26" height="26" />
          <Text
            className=" show-on-hover "
            css={{ paddingLeft: "5px", display: "none" }}
          >
            Tier List
          </Text>
        </Link>
      </Grid>

      <Grid
        css={{
          paddingLeft: "5px",
          borderBottom: "2px solid #0B0B0B",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {userInfo ? (
          <Link
            block
            color="inherit"
            href={`/player/${userInfo.favProfile}?server=EUNE`}
          >
            <Bookmark width="26" height="26" />
            <Text
              className=" show-on-hover "
              css={{ paddingLeft: "5px", display: "none" }}
            >
              My Profile
            </Text>
          </Link>
        ) : (
          <Link block color="inherit" onPress={notifyBad}>
            <Bookmark width="26" height="26" />
            <Text
              className=" show-on-hover "
              css={{ paddingLeft: "5px", display: "none" }}
            >
              My Profile
            </Text>
          </Link>
        )}
      </Grid>

      <Grid
        css={{
          paddingLeft: "5px",
          borderBottom: "2px solid #0B0B0B",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {userInfo ? (
          <Link
            block
            color="inherit"
            href={`/champions/${userInfo.favChampion}`}
          >
            <MyChampion width="26" height="26" />
            <Text
              className=" show-on-hover "
              css={{ paddingLeft: "5px", display: "none" }}
            >
              My Champion
            </Text>
          </Link>
        ) : (
          <Link block color="inherit" onPress={notifyBad}>
            <MyChampion width="26" height="26" />
            <Text
              className=" show-on-hover "
              css={{ paddingLeft: "5px", display: "none" }}
            >
              My Champion
            </Text>
          </Link>
        )}
      </Grid>
      <Spacer y={15} />
    </Grid.Container>
  );
};

export default MySidebar;
