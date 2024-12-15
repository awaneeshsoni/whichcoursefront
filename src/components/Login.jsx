import React from "react";
import { useGoogleLogin } from "react-google-login";
import authService from "../services/authService";

const Login = () => {
  const onSuccess = async (response) => {
    const token = response.tokenId;
    try {
      await authService.login(token);
      alert("Login successful!");
    } catch {
      alert("Login failed. Please try again.");
    }
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId: "YOUR_CLIENT_ID",
  });

  return (
    <div>
      <h1>Login</h1>
      <button onClick={signIn}>Login with Google</button>
    </div>
  );
};

export default Login;
