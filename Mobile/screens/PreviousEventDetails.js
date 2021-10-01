import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Header from "../components/Header";
import EventDetailsCard from "../components/EventDetailsCard";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const PreviousEventDetails = (props) => {
  const prevEvents = useSelector(
    (state) => state.addPreviousEvent.previousEvents
  );

  let event;
  for (let i = 0; i < prevEvents.length; i++) {
    if (prevEvents[i].id == props.id) {
      event = prevEvents[i];
      break;
    }
  }

  return (
    <View style={style.screen}>
      <ScrollView>
        <Header title={event.name.toUpperCase()} onBack={props.onBack}></Header>
        <View style={style.imageConatiner}>
          <View style={style.imageConatiner}>
            <Image
              source={{
                uri: event.imageURL,
              }}
              style={style.image}
            />
          </View>
        </View>

        <EventDetailsCard
          date={event.date}
          description={event.description}
          isMailBoxAccessed={event.isMailBoxAccessed ? "Yes" : "No"}
          rating={event.rating}
          userType={event.userType}
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
