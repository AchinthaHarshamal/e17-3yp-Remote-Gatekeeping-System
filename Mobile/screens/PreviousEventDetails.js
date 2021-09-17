import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Header from "../components/Header";
import EventDetailsCard from "../components/EventDetailsCard";
import { ScrollView } from "react-native-gesture-handler";

import { PreviousEventsList } from "../dummy data/DummyData";

const PreviousEventDetails = (props) => {
  let event;
  for (let i = 0; i < PreviousEventsList.length; i++) {
    if (PreviousEventsList[i].id == props.id) {
      event = PreviousEventsList[i];
      break;
    }
  }

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

  return (
    <View style={style.screen}>
      <Header title={event.name} onBack={props.onBack}></Header>
      <View style={style.imageConatiner}>
        <View style={style.imageConatiner}>
          <Image source={imageSources[index]} style={style.image} />
        </View>
      </View>
      <ScrollView>
        <EventDetailsCard
          date={event.date}
          description={event.description}
          isMailBoxAccessed={event.isMailBoxAccessed ? "Yes" : "No"}
          rating={event.rating}
        ></EventDetailsCard>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
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
});

export default PreviousEventDetails;
