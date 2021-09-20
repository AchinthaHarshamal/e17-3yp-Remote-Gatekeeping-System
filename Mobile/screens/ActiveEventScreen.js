import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Header from "../components/Header";
import CustomButton3 from "../components/CustomButton3";
import { ScrollView } from "react-native-gesture-handler";
import { updateMailBoxAccess } from "../store/actions/mailBoxAccessAction";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";

const ActiveEventScreen = (props) => {
  const [isMailBoxAccessed, setIsMailBoxAccessed] = useState(false);

  const dispatch = useDispatch();

  const mailBoxAccessActionHandler = () => {
    dispatch(updateMailBoxAccess(isMailBoxAccessed));
  };

  const handleMailBoxAccess = () => {
    setIsMailBoxAccessed(true);
    mailBoxAccessActionHandler();
  };

  return (
    <View style={styles.screen}>
      <Header title="Active Event" onBack={props.onBack}></Header>
      <ScrollView>
        <View style={styles.imageConatiner}>
          <Image
            source={require("../assets/images/dummy/e1.jpg")}
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
              <CustomButton3 onPress={handleMailBoxAccess}>Open</CustomButton3>
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
});

export default ActiveEventScreen;
