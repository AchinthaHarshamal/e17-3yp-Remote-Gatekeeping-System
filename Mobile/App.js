import { StatusBar } from "expo-status-bar";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";

import Navigation from "./navigation/Navigation";
import { event, set } from "react-native-reanimated";
import CloseActiveEventScreen from "./screens/CloseActiveEventScreen";
import WelcomePage from "./screens/WelcomePage";
import { createStore } from "redux";
import mainReducer from "./store/reducers/mainReducer";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
  // return <WelcomePage></WelcomePage>;
  // return <CloseActiveEventScreen></CloseActiveEventScreen>;
}
