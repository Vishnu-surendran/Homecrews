import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useractions } from "../../store/store";
import { Baseurl } from "../../Baseurl/Basurl";

export const Loginhook = () => {
  const [loading, setloading] = useState(null);
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setloading(true);
    setError(false);

    const response = await fetch(`${Baseurl}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      
      setloading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch(useractions.login(json));
      setloading(false);
      navigate("/");
    }
  };
  return { loading, login, Error };
};
