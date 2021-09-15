import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import WelcomePage from "../screens/WelcomePage";

const MealsNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  WelcomePage: {
    screen: WelcomePage,
  },
});

export default createAppContainer(LoginScreen);
