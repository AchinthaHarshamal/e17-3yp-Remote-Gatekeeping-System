import Event from "../../Modal/Event";

export const CLOSE_PREVIOUS_EVENT = "CLOSE_PREVIOUS_EVENT";
export const GET_EVENT_DETAILS = "GET_EVENT_DETAILS";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchEvents = () => {
  return async (dispatch) => {
    //async code

    try {
      const userDetails = await AsyncStorage.getItem("userDetails");

      const transformedDetails = JSON.parse(userDetails);

      const nodeId = transformedDetails.nodeId;

      const url =
        "https://gate-keeper-6fad9-default-rtdb.asia-southeast1.firebasedatabase.app/events/"
          .concat(nodeId)
          .concat(".json");

      const response = await fetch(url);

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

export const addNewPrevEvent = (
  name,
  rating,
  description,
  mailBoxAccess,
  date,
  imageURL,
  userType
) => {
  return async (dispatch) => {
    //async code

    const userDetails = await AsyncStorage.getItem("userDetails");

    const transformedDetails = JSON.parse(userDetails);

    const nodeId = transformedDetails.nodeId;

    const url =
      "https://gate-keeper-6fad9-default-rtdb.asia-southeast1.firebasedatabase.app/events/"
        .concat(nodeId)
        .concat(".json");

    const response = await fetch(
      url,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //need to implement the image URL and others
          name,
          rating,
          description,
          mailBoxAccess,
          date,
          imageURL,
          userType,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CLOSE_PREVIOUS_EVENT,
      newEvent: {
        id: resData.name,
        name: name,
        date: date,
        rating: rating,
        description: description,
        mailBoxAccess: mailBoxAccess,
        imageURL: imageURL,
        userType: userType,
      },
    });
  };
};
