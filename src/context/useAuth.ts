import { useContext } from "react";
import { authContext } from "./authContext";

const useAuth = () => {
  const data = useContext(authContext);

  if (data === undefined)
    console.log("Make sure to user context inside the provider 🥰");

  return data;
};

export default useAuth;
