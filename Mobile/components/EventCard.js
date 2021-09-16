import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const EventCard = (props) => {
  return (
    <TouchableOpacity>
      <View style={style.cardContainer}>
        <View style={style.imageConatiner}>
          <Image
            source={require("../dummy data/dummyImages/e1.jpg")}
            style={style.image}
          />
        </View>
        <View style={style.detailsContainer}>
          <View style={style.nameContainer}>
            <Text style={style.name}>{props.name}</Text>
          </View>
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
    backgroundColor: "#d6b2eb",
  },
  imageConatiner: {
    flex: 1,
    borderRadius: 12,
    marginRight: 5,
    overflow: "hidden",
  },
  detailsContainer: {
    // borderWidth: 1,
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
  },
  name: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
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
