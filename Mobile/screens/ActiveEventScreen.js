import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

export const CHECK_ACTIVE_EVENT = "CHECK_ACTIVE_EVENT";

import Header from "../components/Header";
import CustomButton3 from "../components/CustomButton3";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";

const startActiveEvent = (msgKey, ackResponse) => {
  return async () => {
    //async code
    await fetch(
      `https://hardware-node-test-default-rtdb.asia-southeast1.firebasedatabase.app/messages/-MjhnXW1CcA_sTXEssD1/${msgKey}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ack: ackResponse }),
      }
    );
  };
};

let key;
let imageURL;
let userType;

const getMzgDetails = () => {
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
          ack: resData[key].ack,
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

      imageURL = lastElement.msgURL;
      userType = lastElement.userType;
      key = lastElement.key;

      dispatch({ type: CHECK_ACTIVE_EVENT, activeEvent: lastElement });
    } catch (error) {
      throw error;
    }
  };
};

const ActiveEventScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  //to see if there is an active event or not
  const loadActiveEvent = useCallback(async () => {
    setError(null);
    // setIsRefreshing(true);
    try {
      // await dispatch(checkForActiveEvent());
      await dispatch(getMzgDetails());
    } catch (error) {
      setError(error.message);
    }
    // setIsRefreshing(false);
  }, [dispatch, setError]);

  //at the first render of the component, see if there is an active event or not
  useEffect(() => {
    setIsLoading(true);
    loadActiveEvent().then(() => {
      setIsLoading(false);
    });
  }, [setIsLoading, loadActiveEvent]);

  //get the initialize message detials

  //accept the active event or deline event
  const startEvent = useCallback(
    async (userResponse) => {
      setError(null);
      try {
        await dispatch(startActiveEvent(key, userResponse));
        userResponse == "true" ? props.onPress() : props.onBack();
      } catch (error) {
        setError(error.message);
      }
    },
    [dispatch, setError]
  );

  if (error) {
    return (
      <View style={styles.screen}>
        <Header title="Active Events" onBack={props.onBack}></Header>
        <View style={styles.errorMsg}>
          <Text style={styles.noEvent}>{error}</Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingWheel}>
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Active Event" onBack={props.onBack} noBack="Yes"></Header>
      <ScrollView>
        <View style={styles.imageConatiner}>
          <Image
            source={{
              uri: imageURL,
            }}
            style={styles.image}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>
              There is an active event!({userType})
            </Text>
            <View style={styles.buttonContainer}>
              <CustomButton3
                styles={styles.declineButton}
                onPress={startEvent.bind(null, "false")}
              >
                Decline
              </CustomButton3>
              <CustomButton3
                styles={styles.acceptButton}
                onPress={startEvent.bind(null, "true")}
              >
                Accept
              </CustomButton3>
            </View>
          </View>

          {/* <View style={styles.fieldContainer}>
            <Text style={styles.label}>Intercom Comminunication</Text>
            <View style={styles.buttonContainer}>
              <CustomButton3>Record Voice</CustomButton3>
              <CustomButton3>Play Voice</CustomButton3>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Mail Box Access</Text>
            <View style={styles.buttonContainer}>
              <CustomButton3 onPress={() => {}}>Open</CustomButton3>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Close Event</Text>
            <View style={styles.buttonContainer}>
              <CustomButton3 onPress={props.onPress}>Close</CustomButton3>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageConatiner: {
    height: 300,
    width: 300,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  fieldContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.cardColor,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loadingWheel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  noEvent: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
  },
  declineButton: {
    backgroundColor: "red",
  },
  acceptButton: {
    backgroundColor: "#30ba29",
  },
});

export default ActiveEventScreen;
