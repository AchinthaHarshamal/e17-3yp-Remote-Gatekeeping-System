import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const RatingStars = (props) => {
  const [rating, setRating] = useState(0);

  const starArray = [];

  for (let i = 0; i < rating; i++) {
    starArray.push("star");
  }

  for (let i = 0; i < 5 - rating; i++) {
    starArray.push("staro");
  }

  const handleOnPress = (key) => {
    setRating(key);
  };

  return (
    <View style={style.ratingsContainer}>
      {starArray.map((entry, index) => {
        return (
          <TouchableOpacity
            key={Math.random()}
            onPress={handleOnPress.bind(null, index + 1)}
          >
            <AntDesign name={entry} size={props.size || 24} color="black" />
          </TouchableOpacity>
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
