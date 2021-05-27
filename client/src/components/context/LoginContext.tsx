import { createContext, FC, useEffect, useState } from "react";
import { User } from "../../helpers/typings";

interface LoginInput {
  email: string;
  password: string;
}

interface LoggedInValue {
  user: User | undefined;
  allUsers: User[] | undefined;
  validateLogin: (data: LoginInput) => void;
  logOut: () => void;
  getAllUsers: () => void;
  updateUser: (user: User) => void;
}

export const LoggedInContext = createContext<LoggedInValue>({
  user: undefined,
  allUsers: [],
  validateLogin: () => false,
  logOut: () => {},
  getAllUsers: () => {},
  updateUser: () => {},
});

const LoggedInProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [allUsers, setAllUsers] = useState<User[] | []>([]);

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

  //CHECK IF THERE IS AN ACTIVE LOGGED IN - COOKIE, AND SET USER
  const authenticateLoggedIn = () => {
    fetch("/users/authenticate", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          console.log(result.message);
          setUser(undefined);
        } else {
          setUser(result.user);
        }
      });
  };

  useEffect(() => {
    authenticateLoggedIn();
  }, []);

  const getAllUsers = () => {
    fetch("/users", {
      method: "GET",
      credentials: "include",
    }).then((res) =>
      res.json().then((result) => {
        if (result.message) {
          console.log(result.message);
          setAllUsers(result.users);
        } else {
          setAllUsers(result);
        }
      })
    );
  };

  const updateUser = (data: User) => {
    fetch(`/users/${data._id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message) {
          console.log(result.message);
        } else {
          console.log(result);
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

  return (
    <LoggedInContext.Provider
      value={{
        user,
        allUsers,
        validateLogin,
        logOut,
        getAllUsers,
        updateUser,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
