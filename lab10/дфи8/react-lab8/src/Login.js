import React, { useState } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";


function LoginForm() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const loaderStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  let [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/auth", {
        nickname,
        password,
      });
      console.log(response.data);
      if (response) {
        window.location.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
      finally{
        setLoading(false);
      }
    }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />{" "}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <button type="submit"> Login </button>{" "}

      <MoonLoader 
                loading={loading} 
                cssOverride={loaderStyle} 
                size={150} 
                aria-label="Loading Spinner" 
                data-testid="loader" 
            />

    </form>
  );
}


export default LoginForm;
