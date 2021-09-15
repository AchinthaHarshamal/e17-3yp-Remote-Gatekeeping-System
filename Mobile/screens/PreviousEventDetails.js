import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PreviousEventDetails = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Previous Event Details Screen!</Text>
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

export default PreviousEventDetails;
