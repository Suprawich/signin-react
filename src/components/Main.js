import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import MatTable from "./MaterialTable";
import Sidebar from "./Sidebar"


function Main() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    /* console.log("Token from localStorage:", token);*/
    setToken(token);
    if (!token) {
      setError("No token found");
      navigate("/signin");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://cache111.com/todoapi/activities", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result !== null) {
          console.log(result);
          setItems(result);
        } else {
          console.log("Item doesn't exist");
          navigate("/signin");
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <Sidebar></Sidebar>
      <MatTable props={items} props2={token}></MatTable>
    </div>
  );
}

export default Main;
