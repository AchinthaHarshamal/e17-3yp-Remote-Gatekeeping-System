import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";

import EventCard from "../components/EventCard";
import Header from "../components/Header";
import { useSelector } from "react-redux";

import { FlatList, State } from "react-native-gesture-handler";

const PreviousEvents = (props) => {
  const prevEvents = useSelector(
    (state) => state.addPreviousEvent.previousEvents
  );

  const renderPreviousEventList = (itemData) => {
    return (
      <EventCard
        name={itemData.item.name}
        description={itemData.item.description}
        image={itemData.item.imageURL}
        id={itemData.item.id}
        rating={itemData.item.rating}
        onPress={props.onPress}
      ></EventCard>
    );
  };

  return (
    <View style={styles.screen}>
      <Header title="Previous Events" onBack={props.onBack}></Header>
      <View style={styles.listContainer}>
        <FlatList
          data={prevEvents}
          renderItem={renderPreviousEventList}
          contentContainerStyle={styles.list}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    height: 200,
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 10,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    paddingTop: 80,
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  backButtonContainer: {
    marginTop: 40,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default PreviousEvents;
