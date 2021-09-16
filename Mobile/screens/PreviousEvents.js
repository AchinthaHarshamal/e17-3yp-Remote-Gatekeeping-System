import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";

import BackButton from "../components/BackButton";
import EventCard from "../components/EventCard";

import { PreviousEventsList } from "../dummy data/DummyData";
import { FlatList } from "react-native-gesture-handler";

const renderPreviousEventList = (itemData) => {
  return (
    <EventCard
      name={itemData.item.name}
      description={itemData.item.description}
      image={itemData.item.imageURL}
      id={itemData.item.id}
    ></EventCard>
  );
};

const PreviousEvents = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Previous Events</Text>
        <View style={styles.backButtonContainer}>
          <BackButton>&#8592;</BackButton>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={PreviousEventsList}
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
