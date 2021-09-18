import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

import Header from "../components/Header";
import Colors from "../constants/Colors";
import RatingStarsInteractive from "../components/RatingStarsInteractive";
import CustomButton2 from "../components/CustomButton2";
import CloseEventContext from "../contextAPI/CloseEventContext";

const CloseActiveEventScreen = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handelOnPress = () => {
    if ((name.length == 0) | (description.length == 0)) {
      Alert.alert(
        "Incorrect Details!",
        "Please fill all the fields",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    props.onClose();
    console.log("Ishara");
  };

  const handleNameOnChange = (name) => {
    setName(name);
  };

  const handleDesOnChange = (desc) => {
    setDescription(desc);
  };

  return (
    <CloseEventContext.Provider
      value={{
        isMailBoxAccessed: false,
        eventName: name,
        eventDescription: description,
        rating: 0,
      }}
    >
      <KeyboardAvoidingView style={styles.screen}>
        <Header onBack={props.onBack} title="CLOSING THE EVENT.."></Header>
        <ScrollView>
          <View style={styles.formInput}>
            <TextInput
              autoFocus={false}
              style={styles.nameInput}
              placeholder="Enter the name of the event"
              onChangeText={handleNameOnChange}
            ></TextInput>
            <View style={styles.ratingStarContainer}>
              <RatingStarsInteractive
                rating={3}
                size={50}
              ></RatingStarsInteractive>
              <Text style={styles.rateLabel}>Rate this event...</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <TextInput
                multiline
                autoFocus={false}
                style={styles.description}
                placeholder="Describe your experience..."
                onChangeText={handleDesOnChange}
              ></TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton2 onPress={handelOnPress}>Close Event</CustomButton2>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CloseEventContext.Provider>
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
    borderWidth: 0.5,
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
    borderWidth: 0.5,
    height: 200,
    padding: 10,
    borderColor: "#e0be75",
    backgroundColor: "white",
    fontSize: 18,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
});

export default CloseActiveEventScreen;
