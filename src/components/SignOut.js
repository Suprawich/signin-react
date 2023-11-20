import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the 'token' cookie
    localStorage.removeItem('token');
    localStorage.removeItem('status')
    navigate('/')
  })

  return (
    <div>
      <center>
        <h1>Logging Out...</h1>
      </center>
    </div>
  );
}

export default SignOut;