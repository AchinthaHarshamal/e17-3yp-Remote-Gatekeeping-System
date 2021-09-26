export const CHECK_ACTIVE_EVENT = "CHECK_ACTIVE_EVENT";

export const checkForActiveEvent = () => {
  return async (dispatch) => {
    //async code

    try {
      const response = await fetch(
        "https://hardware-node-test-default-rtdb.asia-southeast1.firebasedatabase.app/messages/-MjhnXW1CcA_sTXEssD1.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      const loadedEvents = [];

      for (const key in resData) {
        loadedEvents.push({
          key: key,
          event: resData[key].event,
          from: resData[key].from,
          msgType: resData[key].msgType,
          msgURL: resData[key].msgURL,
          time: new Date(resData[key].time),
          to: resData[key].to,
          userType: resData[key].userType,
        });
      }

      const lastElement = loadedEvents.pop();

      if (lastElement.msgType !== "image") {
        throw new Error("There is no active event happening currrently!");
      }

      //   console.log(lastElement);

      dispatch({ type: CHECK_ACTIVE_EVENT, activeEvent: lastElement });
    } catch (error) {
      throw error;
    }
  };
};
