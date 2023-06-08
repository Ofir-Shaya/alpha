import React, { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Link,
  Text,
  Input,
  Button,
  Container,
  Loading,
  useTheme,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Bookmark, MyChampion } from "../components/Icons/AllIcons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userFound, setUserFound] = useState(true);
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  let { data: session } = useSession();
  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getUserInfo = async () => {
      if (!session) {
        setUserFound(false);
        return;
      }

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
          setUserFound(false);
          throw new Error("Failed to fetch data. Status: " + res.status);
        }
      } catch (error) {
        console.error(error);
        setUserFound(false);
        throw new Error("An error occurred while loading data.");
      }
    };
    getUserInfo();
  }, [session]);

  const handleEdit = async (data) => {
    try {
      if (!data || !userInfo || !userInfo.email) {
        notifyBad("incorrect data.");
        return;
      }

      setLoading(true);
      if (data.newProfile) {
        const response = await fetch(
          `/api/userapi?email=${userInfo.email}&newProfile=${data.newProfile}&func=updateProfile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          notifyGood(data.message);
        }
      }
      if (data.newChampion) {
        const response = await fetch(
          `/api/userapi?email=${userInfo.email}&newChampion=${data.newChampion}&func=updateChampion`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          notifyGood(data.message);
        }
      }
      setTimeout(() => {
        router.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserNotFound = () => {
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const notifyGood = (message) => {
    toast.success(message, {
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
  const notifyBad = (message) => {
    toast.warn(message, {
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
    <>
      <MyNavbar />

      <Container
        display="flex"
        direction="row"
        wrap="noWrap"
        css={{
          margin: 0,
          padding: 0,
          backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,rgb(7, 7, 32) 100%),linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%)`,
          height: "100vh",
        }}
      >
        <MySidebar />

        <Container
          fluid
          display="flex"
          direction="column"
          alignContent="center"
          alignItems="center"
          css={{
            marginTop: "10rem",
          }}
        >
          <ToastContainer />
          <Text h1>Edit Profile</Text>

          {userInfo && userFound ? (
            <Container
              css={{
                width: "40rem",
                margin: "0 auto",
                display: "flex",
                flexFlow: "row",
                flexDirection: "row",
              }}
            >
              <Container css={{ dispaly: "flex", width: "48%" }}>
                <Text h3>Current Info:</Text>
                <Text h5>Email: {userInfo.email}</Text>
                <Text h5>Password: *********</Text>
                <Text h5>Favorite Profile: {userInfo.favProfile}</Text>
                <Text h5>Favorite Champion: {userInfo.favChampion}</Text>
              </Container>
              <Container css={{ dispaly: "flex", width: "48%" }}>
                <Text h3>Update Info:</Text>
                <form onSubmit={handleSubmit(handleEdit)}>
                  <Link href="/forgot-password/request-new-pwd">
                    <Text h5>Click Here To Get a Password Reset to Email</Text>
                  </Link>
                  <Input
                    label="Profile"
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Profile"
                    type="text"
                    contentLeft={<Bookmark />}
                    {...register("newProfile", { required: false })}
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
                      {...register("newChampion", { required: false })}
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
                  <Button
                    auto
                    type="submit"
                    css={{ margin: "0 auto", marginTop: "1rem" }}
                  >
                    {loading ? "Updating..." : "Edit"}
                  </Button>
                </form>
              </Container>
            </Container>
          ) : !userFound ? (
            handleUserNotFound()
          ) : (
            <Loading />
          )}
        </Container>
      </Container>
    </>
  );
};
export default Profile;
