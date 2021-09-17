import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Header from "../components/Header";
import Colors from "../constants/Colors";
import RatingStars from "../components/RatingStars";
import CustomButton2 from "../components/CustomButton2";

const CloseActiveEventScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Header onBack={props.onBack} title="CLOSING THE EVENT.."></Header>
      <View style={styles.formInput}>
        <TextInput
          style={styles.nameInput}
          placeholder="Enter the name of the event"
        ></TextInput>
        <View style={styles.ratingStarContainer}>
          <RatingStars rating={3} size={50}></RatingStars>
          <Text style={styles.rateLabel}>Rate this event...</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.description}
            placeholder="Describe your experience..."
            multiline
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton2 onPress={props.onClose}>Close Event</CustomButton2>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  formInput: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: Colors.cardColor,
    padding: 20,
  },
  nameInput: {
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderColor: "#e0be75",
    backgroundColor: "white",
  },
  ratingStarContainer: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
  },
  rateLabel: {
    opacity: 0.6,
  },
  descriptionContainer: {
    // borderWidth: 1,
    marginTop: 15,
  },
  description: {
    borderWidth: 1,
    height: 200,
    padding: 10,
    borderColor: "#e0be75",
    backgroundColor: "white",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
});

export default CloseActiveEventScreen;
