import Event from "../../Modal/Event";

export const CLOSE_PREVIOUS_EVENT = "CLOSE_PREVIOUS_EVENT";
export const GET_EVENT_DETAILS = "GET_EVENT_DETAILS";

export const fetchEvents = () => {
  return async (dispatch) => {
    //async code

    try {
      const response = await fetch(
        "https://remote-getekeeping-device-default-rtdb.firebaseio.com/events.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      console.log(resData);

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
            null
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
  date
) => {
  return async (dispatch) => {
    //async code
    const response = await fetch(
      "https://remote-getekeeping-device-default-rtdb.firebaseio.com/events.json",
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
        }),
      }
    );

    const resData = await response.json();

    eventDetails.id = resData.name;

    dispatch({
      type: CLOSE_PREVIOUS_EVENT,
      newEvent: {
        id: resData.name,
        name: name,
        date: date,
        rating: rating,
        description: description,
        mailBoxAccess: mailBoxAccess,
      },
    });
  };
};
