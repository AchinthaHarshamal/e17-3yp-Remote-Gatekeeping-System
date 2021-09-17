import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import { PreviousEventsList } from "../dummy data/DummyData";
import RatingStars from "./RatingStars";
import selectIdContext from "../contextAPI/selectId";

const EventCard = (props) => {
  const imageSources = [
    require("../assets/images/dummy/e1.jpg"),
    require("../assets/images/dummy/e2.jpg"),
    require("../assets/images/dummy/e3.jpg"),
    require("../assets/images/dummy/e4.jpg"),
  ];

  let index;

  for (let i = 0; i < PreviousEventsList.length; i++) {
    if (PreviousEventsList[i].id == props.id) {
      index = i;
      break;
    }
  }

  let ctxid;

  const doThis = () => props.onPress;

  return (
    <selectIdContext.Provider
      value={{
        id: ctxid,
      }}
    >
      <TouchableOpacity onPress={doThis}>
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
    </selectIdContext.Provider>
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
