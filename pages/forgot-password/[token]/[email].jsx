import React, { useState } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Text, Container, Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SuccessModal, ErrModal } from "@/components/Modals";

const DefaultResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(null);
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const { router } = useRouter();
  const { query } = useRouter();
  const token = query.token;
  const email = query.email;

  const resetPassword = async (e, data) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: `api/userapi?func=resetPassword&email=${data.email}&token=${token}&password=${data.password}`,

        headers: {
          "Content-Type": "application/json",
        },
      });
      setResetSuccess(response.data.msg);
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 3000);
      setResetError("");
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setResetError(data.msg);
      setResetSuccess(null);
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

        {email && token ? (
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
            <Container>
              {resetPasswordError ? (
                <ErrModal message={resetPasswordError} />
              ) : null}
              {resetPasswordSuccess ? (
                <SuccessModal message={resetPasswordSuccess} />
              ) : null}

              <form onSubmit={handleSubmit(resetPassword)}>
                <Input
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
        ) : (
          <Text h2>The page you're trying to get to isn't available</Text>
        )}
      </Container>
    </>
  );
};
export default DefaultResetPassword;
