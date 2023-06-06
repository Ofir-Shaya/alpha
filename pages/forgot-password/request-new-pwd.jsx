import React, { useState } from "react";
import MyNavbar from "@/components/MyNavbar";
import MySidebar from "@/components/MySidebar";
import { Text, Container, Input, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SuccessModal, ErrModal } from "@/components/Modals";

const RequestNewPwd = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const [resetSuccess, setResetSuccess] = useState(null);
  const [resetError, setResetError] = useState(null);

  const handleForgot = async (e, data) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: "POST",
        url: `api/userapi?func=recoverPasswordMail&email=${data.email}`,

        headers: {
          "Content-Type": "application/json",
        },
      });
      setResetSuccess(response.data.msg);
      setLoading(false);
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
          <Text h1>Forgot Password</Text>
          <Text h4>It's okay, literally everyone forget at some point...</Text>
          <Container>
            {resetError ? <ErrModal message={resetError} /> : null}
            {resetSuccess ? <SuccessModal message={resetSuccess} /> : null}

            <form onSubmit={handleSubmit(handleForgot)}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <Button name="reset-pwd-btn" type="submit">
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
