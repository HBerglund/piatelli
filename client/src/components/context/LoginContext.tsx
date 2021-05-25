import React, { createContext, FC, useEffect, useState } from "react";
import { User } from "../../helpers/typings";

interface LoggedInValue {
  user: User | undefined;
  authenticated: boolean;
  authenticateUser: () => void;
}

export const LoggedInContext = createContext<LoggedInValue>({
  user: undefined,
  authenticated: false,
  authenticateUser: () => {},
});

const LoggedInProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState(false);

  const authenticateUser = () => {
    fetch("/users/authenticate", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setAuthenticated(result.authenticated);
          setUser(result.user);
        }
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  console.log(authenticated);

  return (
    <LoggedInContext.Provider
      value={{
        user,
        authenticated,
        authenticateUser,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
