import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

import Header from "../components/Header";
import CustomButton3 from "../components/CustomButton3";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import * as activeEventActions from "../store/actions/activeEventAction";

import Colors from "../constants/Colors";

const ActiveEventScreen = (props) => {
  // const [isMailBoxAccessed, setIsMailBoxAccessed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const loadActiveEvent = useCallback(async () => {
    setError(null);
    // setIsRefreshing(true);
    try {
      await dispatch(activeEventActions.checkForActiveEvent());
    } catch (error) {
      console.log(error.message);

      setError(error.message);
    }
    // setIsRefreshing(false);
  }, [dispatch, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadActiveEvent().then(() => {
      setIsLoading(false);
    });
  }, [setIsLoading, loadActiveEvent]);

  const value = useSelector((state) => state.activeEvent.activeEventDetails);
  if (value != null) {
    console.log("value is", value.msgURL);
  }

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

  // const mailBoxAccessActionHandler = () => {
  //   dispatch(updateMailBoxAccess(isMailBoxAccessed));
  // };

  // const handleMailBoxAccess = () => {
  //   setIsMailBoxAccessed(true);
  //   mailBoxAccessActionHandler();
  // };

  return (
    <View style={styles.screen}>
      <Header title="Active Event" onBack={props.onBack}></Header>
      <ScrollView>
        <View style={styles.imageConatiner}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={styles.image}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.fieldContainer}>
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
          </View>
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
});

export default ActiveEventScreen;
