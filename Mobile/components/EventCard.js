import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import { useSelector } from "react-redux";

import RatingStars from "./RatingStars";

const EventCard = (props) => {
  const prevEvents = useSelector(
    (state) => state.addPreviousEvent.previousEvents
  );

  // below to be commented when fetching the image from the source
  const imageSources = [
    require("../assets/images/dummy/e1.jpg"),
    require("../assets/images/dummy/e2.jpg"),
    require("../assets/images/dummy/e3.jpg"),
    require("../assets/images/dummy/e4.jpg"),
  ];

  let index;

  for (let i = 0; i < prevEvents.length; i++) {
    if (prevEvents[i].id == props.id) {
      index = i;
      break;
    }
  }

  // above to be commented when fetching the image from the source

  const handleOnPress = () => {
    props.onPress(props.id);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={style.cardContainer}>
        <View style={style.imageConatiner}>
          <Image source={imageSources[index]} style={style.image} />
        </View>
        <View style={style.detailsContainer}>
          <View style={style.nameContainer}>
            <Text style={style.name}>{props.name}</Text>
          </View>
          <RatingStars rating={props.rating}></RatingStars>
          <View style={style.descriptionContainer}>
            <Text style={style.description}>{props.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    height: 180,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#e6f2f7",
  },
  imageConatiner: {
    flex: 1,
    borderRadius: 12,
    marginRight: 5,
    overflow: "hidden",
  },
  detailsContainer: {
    flex: 1,
    borderRadius: 12,
    marginLeft: 5,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  nameContainer: {
    marginVertical: 5,
    padding: 5,
  },
  name: {
    color: "black",
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
  },
  descriptionContainer: {
    margin: 5,
    borderRadius: 8,
    padding: 5,
    opacity: 1,
  },
  description: {
    fontSize: 15,
  },
});

export default EventCard;
