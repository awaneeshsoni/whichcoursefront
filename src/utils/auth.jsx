export const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return user ? true : false;
  };
  
  export const getUserEmailDomain = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.email.split("@")[1] : "";
  };
  