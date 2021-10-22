import AsyncStorage from "@react-native-async-storage/async-storage";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};

// export const signup = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2lgAuXNJGVoeg_QVf7wXb4oRVH3lXyic",
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorResData = await response.json();
//       const errorId = errorResData.error.message;
//       let message = "Something went wrong!";
//       if (errorId === "EMAIL_EXISTS") {
//         message = "This email exists already!";
//       }
//       throw new Error(message);
//     }

//     const resData = await response.json();

//     dispatch(authenticate(resData.localId, resData.idToken));

//     const expirationDate = new Date(
//       new Date().getTime() + parseInt(resData.expiresIn) * 1000
//     );
//     saveDataToStorage(resData.idToken, resData.localId, expirationDate);
//   };
// };

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2lgAuXNJGVoeg_QVf7wXb4oRVH3lXyic",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email is not registered!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not correct!";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(authenticate(resData.localId, resData.idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    // const fetchUserData =

    saveDataToStorage(resData.idToken, resData.localId, expirationDate);

    
  };
};

 const fetchUserData = (userId) => {
  return async (dispatch) => {
    //async code

    try {
      const response = await fetch(
        `https://gate-keeper-6fad9-default-rtdb.asia-southeast1.firebasedatabase.app/users/{userId}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedEvents = [];

      for (const key in resData) {
        loadedEvents.push(
          new Event(
            key,
            resData[key].name,
            new Date(resData[key].date),
            resData[key].rating,
            resData[key].description,
            resData[key].mailBoxAccess,
            resData[key].imageURL,
            resData[key].userType
          )
        );
      }

      dispatch({ type: GET_EVENT_DETAILS, events: loadedEvents.reverse() });
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return {
    type: LOGOUT,
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  console.log(userId);
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
