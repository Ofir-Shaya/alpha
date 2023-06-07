import React, { useState, useEffect } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Text, Container, Input, Button, Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { SuccessModal, ErrModal } from "@/components/Modals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const DefaultResetPassword = () => {
  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(null);
  const [resetPasswordError, setResetPasswordError] = useState(null);
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
      if (response.ok) setVerified(true);
    };

    verifyTokenEmail();
  }, [email]);

  const resetPassword = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/userapi?func=updatePassword&email=${email}&password=${data.password}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        toast.success("🦄 Wow so easy!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        setTimeout(() => {
          router.push("/");
        }, 3000);
        setResetPasswordError("");
        return;
      }
    } catch (error) {
      setLoading(false);
      const data = error.message;
      setResetPasswordError(data);
      setResetPasswordSuccess(null);
    }
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
            <Text h1>Reset Your Password</Text>
            <Text h4>
              It's okay, literally everyone forget at some point...
            </Text>
            <Text h4>Please enter below the new password that you desire</Text>
            <Container css={{ display: "flex", margin: "0 auto" }}>
              {resetPasswordError ? (
                <ErrModal message={resetPasswordError} />
              ) : null}

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
            The page you're trying to get to isn't available
          </Text>
        )}
      </Container>
    </>
  );
};
export default DefaultResetPassword;
