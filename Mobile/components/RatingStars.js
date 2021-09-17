import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const RatingStars = (props) => {
  const rating = props.rating;

  const starArray = [];

  for (let i = 0; i < rating; i++) {
    starArray.push("star");
  }

  for (let i = 0; i < 5 - rating; i++) {
    starArray.push("staro");
  }

  return (
    <View style={style.ratingsContainer}>
      {starArray.map((entry) => {
        return (
          <AntDesign name={entry} size={24} color="black" key={Math.random()} />
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  ratingsContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RatingStars;
