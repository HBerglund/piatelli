import React, { createContext, FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { User } from "../../helpers/typings";

interface LoginInput {
  email: string;
  password: string;
}

interface LoggedInValue {
  user: User | undefined;
  validateLogin: (data: LoginInput) => void;
  logOut: () => void;
}

export const LoggedInContext = createContext<LoggedInValue>({
  user: undefined,
  validateLogin: () => false,
  logOut: () => {},
});

const LoggedInProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();

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
        console.log(result.message);
        if (result.user) {
          setUser(result.user);
        } else {
          setUser(undefined);
        }
      });
  };

  const logOut = () => {
    fetch("/users/logout", {
      method: "DELETE",
      // credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        setUser(undefined);
      } else {
        console.log(res.json());
      }
    });
  };

  console.log(user);

  return (
    <LoggedInContext.Provider
      value={{
        user,
        validateLogin,
        logOut,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
