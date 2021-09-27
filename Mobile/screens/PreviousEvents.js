import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";

import EventCard from "../components/EventCard";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";

import * as EventActions from "../store/actions/addPreviousEventAction";

const PreviousEvents = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const prevEvents = useSelector(
    (state) => state.addPreviousEvent.previousEvents
  );

  const dispatch = useDispatch();

  const loadedEvents = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(EventActions.fetchEvents());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadedEvents().then(() => {
      setIsLoading(false);
    });
  }, [setIsLoading, loadedEvents]);

  if (error) {
    return (
      <View style={styles.screen}>
        <Header title="Previous Events" onBack={props.onBack}></Header>
        <View style={styles.loadingWheel}>
          <Text style={styles.noEvent}>An error occured!</Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingWheel}>
        <ActivityIndicator
          size="large"
          color={Colors.primaryColor}
        ></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && prevEvents.length == 0) {
    return (
      <View style={styles.screen}>
        <Header title="Previous Events" onBack={props.onBack}></Header>
        <View style={styles.loadingWheel}>
          <Text style={styles.noEvent}>No Event Found!</Text>
        </View>
      </View>
    );
  }

  const renderPreviousEventList = (itemData) => {
    return (
      <EventCard
        name={itemData.item.name}
        description={itemData.item.description}
        image={itemData.item.imageURL}
        id={itemData.item.id}
        rating={itemData.item.rating}
        onPress={props.onPress}
        // imageURL={itemData.item.imageURL}
      ></EventCard>
    );
  };

  return (
    <View style={styles.screen}>
      <Header title="Previous Events" onBack={props.onBack}></Header>
      <View style={styles.listContainer}>
        <FlatList
          onRefresh={loadedEvents}
          refreshing={isRefreshing}
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
  loadingWheel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noEvent: {
    fontSize: 20,
    color: "grey",
  },
});

export default PreviousEvents;
