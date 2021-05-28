import { createContext, FC, useEffect, useState } from "react";
import { LoginInput, RegistrationInput, User } from "../../helpers/typings";

interface UsersValue {
  user: User | undefined;
  allUsers: User[] | undefined;
  validateLogin: (data: LoginInput) => void;
  validateRegistration: (data: RegistrationInput) => void;
  logOut: () => void;
  getAllUsers: () => void;
  updateUser: (user: User) => void;
}

export const UsersContext = createContext<UsersValue>({
  user: undefined,
  allUsers: [],
  validateLogin: () => {},
  validateRegistration: () => {},
  logOut: () => {},
  getAllUsers: () => {},
  updateUser: () => {},
});

const UsersProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [allUsers, setAllUsers] = useState<User[] | []>([]);

  const validateRegistration = (data: RegistrationInput) => {
    fetch("/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          console.log(result.message);
        } else {
          console.log(result);
        }
      });
  };

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
        if (result.errorCode) {
          console.log({ result });
          setAllUsers([]);
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
    <UsersContext.Provider
      value={{
        user,
        allUsers,
        validateLogin,
        validateRegistration,
        logOut,
        getAllUsers,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
