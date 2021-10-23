import AsyncStorage from "@react-native-async-storage/async-storage";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const GET_USER_INFO = "GET_USER_INFO";

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};

export const getUserInfo = (nodeId, firstName, dpURL) => {
  return {
    type: GET_USER_INFO,
    nodeId: nodeId,
    firstName: firstName,
    dpURL: dpURL,
  };
};

let userId;
let idToken;

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

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );

    saveAuthDataToStorage(resData.idToken, resData.localId, expirationDate);

    userId = resData.localId;
    idToken = resData.idToken;

    console.log(userId);

    dispatch(authenticate(resData.localId, resData.idToken));
  };
};

export const fetchUserInfo = () => {
  return async (dispatch) => {
    console.log("inside fetch", userId);
    const url =
      "https://gate-keeper-6fad9-default-rtdb.asia-southeast1.firebasedatabase.app/users/"
        .concat(userId)
        .concat(".json?")
        .concat("auth=")
        .concat(idToken);
    console.log(url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    console.log(userId);
    console.log(resData.nodeId);
    console.log(resData.fName);

    console.log(resData.imgUrl);

    saveUserDataToStorage(resData.nodeId, resData.fName, resData.imgUrl);

    dispatch(getUserInfo(resData.nodeId, resData.fName, resData.imgUrl));
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  AsyncStorage.removeItem("userDetails");
  return {
    type: LOGOUT,
  };
};

const saveAuthDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

const saveUserDataToStorage = (nodeId, firstName, dpURL) => {
  AsyncStorage.setItem(
    "userDetails",
    JSON.stringify({
      nodeId: nodeId,
      firstName: firstName,
      dpURL: dpURL,
    })
  );
};
