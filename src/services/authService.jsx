import { GoogleLogin } from "react-google-login";
import { getUserEmailDomain } from "../utils/auth";

const clientId = "YOUR_GOOGLE_CLIENT_ID";

export const googleLogin = async () => {
  return new Promise((resolve, reject) => {
    GoogleLogin({
      clientId,
      scope: "email",
      responseType: "token id_token",
      onSuccess: (response) => {
        const email = response.profileObj.email;
        const domain = email.split("@")[1];
        if (domain === "yourorganization.com") {
          localStorage.setItem("user", JSON.stringify(response.profileObj));
          resolve(response.profileObj);
        } else {
          reject("Invalid organization email.");
        }
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });
};
