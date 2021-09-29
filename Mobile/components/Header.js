import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colors from "../constants/Colors";
import BackButton from "../components/BackButton";

const Header = (props) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{props.title}</Text>
        {props.noBack == "Yes" ? (
          <View></View>
        ) : (
          <View style={styles.backButtonContainer}>
            <BackButton onPress={props.onBack}></BackButton>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 35,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
});

export default Header;
