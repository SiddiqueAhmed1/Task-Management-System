// useAuth.js
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null); //

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      setTimeout(() => {
        setUser(JSON.parse(savedUser));
      }, 0);
    }
  }, []);

  return { user, setUser };
}
