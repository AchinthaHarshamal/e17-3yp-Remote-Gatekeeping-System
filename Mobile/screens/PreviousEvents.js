import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";

import BackButton from "../components/BackButton";
import EventCard from "../components/EventCard";

import DummyData from "../dummy data/DummyData";

const PreviousEvents = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Previous Events</Text>
        <View style={styles.backButtonContainer}>
          <BackButton>&#8592;</BackButton>
        </View>
      </View>
      <ScrollView style={{ flex: 1, padding: 20, borderWidth: 1 }}>
        {DummyData.map((data) => {
          return (
            <View key={data.id}>
              <EventCard
                name={data.name}
                description={data.description}
                key={data.id}
              ></EventCard>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.2,
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
    marginTop: 50,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
});

export default PreviousEvents;
