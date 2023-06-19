import React, { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import {
  Text,
  Container,
  Input,
  Button,
  Loading,
  useTheme,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const DefaultResetPassword = () => {
  const { register, handleSubmit } = useForm();
  const { isDark } = useTheme();

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(null);

  const router = useRouter();
  const { query } = useRouter();

  const token = query.token;
  const email = query.email;

  useEffect(() => {
    const verifyTokenEmail = async () => {
      if (token === undefined || email === undefined) {
        setVerified(false);
        return;
      }

      const response = await fetch(
        `/api/userapi?func=verifyToken&token=${token}&email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!cleanup) {
        if (response.ok) setVerified(true);
      }
    };
    let cleanup = false;
    verifyTokenEmail();
    return () => {
      cleanup = true;
    };
  }, [email, token]);

  const resetPassword = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/userapi?func=updatePassword&email=${email}&newPassword=${data.password}`,
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
        setTimeout(() => {
          router.push("/");
        }, 4000);
      }
    } catch (error) {
      const data = await response.json();
      setLoading(false);
      notifyBad(data.message);
    }
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
          backgroundImage: `radial-gradient(400px 200px at 60% 34%,rgba(7, 7, 32, 0) 0%,${
            isDark ? "rgb(7, 7, 32) 100%)" : "rgb(217 217 247) 100%)"
          },linear-gradient(90deg, rgb(7, 7, 32) 0%, rgba(7, 7, 32, 0.6) 100%) !important`,
          height: "100vh",
        }}
      >
        <MySidebar />

        {verified ? (
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

            <Text h1>Reset Your Password</Text>
            <Text h4>
              It&apos;s okay, literally everyone forget at some point...
            </Text>
            <Text h4>Please enter below the new password that you desire</Text>
            <Container css={{ display: "flex", margin: "0 auto" }}>
              <Container
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <form onSubmit={handleSubmit(resetPassword)}>
                  <Input
                    aria-label="password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password..."
                    {...register("password", { required: true })}
                  />
                  <Button name="reset-pwd-btn" type="submit">
                    {!loading ? "Reset" : "Processing..."}
                  </Button>
                </form>
              </Container>
            </Container>
          </Container>
        ) : verified === null ? (
          <Container css={{ display: "flex", margin: "0 auto" }}>
            <Loading />
          </Container>
        ) : (
          <Text
            h2
            css={{ display: "flex", textAlign: "center", margin: "0 auto" }}
          >
            The page you&apos;re trying to get to isn&apos;t available
          </Text>
        )}
      </Container>
    </>
  );
};
export default DefaultResetPassword;
