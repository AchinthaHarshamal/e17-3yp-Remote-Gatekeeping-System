import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import Header from "../components/Header";
import CustomButton3 from "../components/CustomButton3";
import { ScrollView, State } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const ActiveInteractiveScreen = (props) => {
  const details = useSelector((state) => state.activeEvent.activeEventDetails);

  return (
    <View style={styles.screen}>
      <Header
        title={details.userType.toUpperCase()}
        onBack={props.onBack}
        noBack="Yes"
      ></Header>
      <ScrollView>
        <View style={styles.imageConatiner}>
          <Image
            source={{
              uri: details.msgURL,
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
  declineButton: {
    backgroundColor: "red",
  },
  acceptButton: {
    backgroundColor: "#30ba29",
  },
});

export default ActiveInteractiveScreen;
