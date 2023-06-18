import React, { useState } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Text, Container, Input, Button, useTheme } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const RequestNewPwd = () => {
  const { isDark } = useTheme();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const handleForgot = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/userapi?email=${data.email}&func=emailPwd`,
        {
          method: "POST",
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
      } else {
        const data = await response.json();
        setLoading(false);
        notifyBad(data.message);
      }
    } catch (error) {
      console.log(error);
      notifyBad(error);
      setLoading(false);
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
          <Text h1>Forgot Password</Text>
          <Text h4>
            It&apos;s okay, literally everyone forget at some point...
          </Text>
          <Container
            css={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleSubmit(handleForgot)}>
              <Input
                aria-label="email"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                css={{ marginTop: "1rem" }}
                {...register("email", { required: true })}
              />
              <Button
                name="reset-pwd-btn"
                type="submit"
                css={{ marginTop: "1rem" }}
              >
                {!loading ? "Get secure link" : "Sending..."}
              </Button>
            </form>
          </Container>
        </Container>
      </Container>
    </>
  );
};
export default RequestNewPwd;
