import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the 'token' cookie
    removeCookie("token");

    // Redirect to the sign-in page
    navigate("/signin");
  }, [removeCookie, navigate]);

  return (
    <div>
      <center>
        <h1>Logging Out...</h1>
      </center>
    </div>
  );
}

export default SignOut;
