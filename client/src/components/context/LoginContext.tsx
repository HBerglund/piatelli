import React, { createContext, FC, useState } from "react";
import { User } from "../../helpers/typings";

interface LoggedInValue {
  user: User | undefined;
  authenticated: boolean;
  authenticateUser: () => void;
}

export const loggedInContext = createContext<LoggedInValue>({
  user: undefined,
  authenticated: false,
  authenticateUser: () => {},
});

const LoggedInProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState(false);

  const authenticateUser = () => {};

  return (
    <loggedInContext.Provider
      value={{
        user,
        authenticated,
        authenticateUser,
      }}
    >
      {children}
    </loggedInContext.Provider>
  );
};

export default LoggedInProvider;
