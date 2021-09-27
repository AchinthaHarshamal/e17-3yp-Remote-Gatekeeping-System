import React from "react";
import { View, StyleSheet, Text } from "react-native";

import CustomButton2 from "./CustomButton2";
import RatingStars from "./RatingStars";

const EventDetailsCard = (props) => {
  return (
    <View style={style.card}>
      <View style={style.fieldContainer}>
        <Text style={style.label}>DATE :</Text>
        <View style={style.value}>
          <Text style={style.label}>
            {props.date.getDate()}/{props.date.getMonth()}/
            {props.date.getFullYear()}
          </Text>
        </View>
      </View>

      <View style={style.fieldContainer}>
        <Text style={style.label}>TIME :</Text>
        <View style={style.value}>
          <Text style={style.label}>
            {props.date.toLocaleTimeString("en-US")}
          </Text>
        </View>
      </View>

      <View style={style.fieldContainer}>
        <Text style={style.label}>USER TYPE :</Text>
        <View style={style.value}>
          <Text style={style.label}>{props.userType.toUpperCase()}</Text>
        </View>
      </View>

      <View style={style.ratingsContainer}>
        <Text style={style.label}>RATING :</Text>
        <RatingStars rating={props.rating}></RatingStars>
      </View>

      <View style={style.descriptionContainer}>
        <Text style={style.label}>DESCRIPTION :</Text>
        <View style={style.description}>
          <Text style={style.descriptionVal}>{props.description}</Text>
        </View>
      </View>

      <View style={style.fieldContainer1}>
        <Text style={style.label}>MAIL BOX ACCESS :</Text>
        <View style={style.value}>
          <Text style={style.label}>{props.isMailBoxAccessed}</Text>
        </View>
      </View>
      <View style={style.buttonConatiner}>
        <CustomButton2>Play Voice Messages</CustomButton2>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#e6f2f7",
  },
  label: {
    fontSize: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 5,
  },
  value: {
    marginHorizontal: 15,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  descriptionContainer: {
    marginVertical: 10,
    marginLeft: 5,
  },
  description: {
    paddingVertical: 10,
    marginLeft: 5,
  },
  descriptionVal: {
    fontSize: 18,
  },
  fieldContainer1: {
    flexDirection: "row",
    marginLeft: 5,
  },
  buttonConatiner: {
    alignItems: "center",
    marginBottom: 10,
  },
});

export default EventDetailsCard;
