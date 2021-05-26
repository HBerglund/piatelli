import React, { createContext, FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { User } from "../../helpers/typings";

interface LoginInput {
  email: string;
  password: string;
}

interface LoggedInValue {
  user: User | undefined;
  authenticateUser: () => void;
  validateLogin: (data: LoginInput) => void;
}

export const LoggedInContext = createContext<LoggedInValue>({
  user: undefined,
  authenticateUser: () => {},
  validateLogin: () => false,
});

const LoggedInProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const authenticateUser = () => {
    fetch("/users/authenticate", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setUser(result.user);
        } else {
          setUser(undefined);
        }
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const validateLogin = (data: LoginInput) => {
    fetch("/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result._id) {
          setUser(result);
        } else {
          setUser(undefined);
        }
      });
  };

  console.log(user);

  return (
    <LoggedInContext.Provider
      value={{
        user,
        authenticateUser,
        validateLogin,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
