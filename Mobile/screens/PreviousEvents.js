import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PreviousEvents = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Previous Events!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PreviousEvents;
