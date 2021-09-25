import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { loginStateAction } from "../store/actions/loginStateAction";
import * as authActions from "../store/actions/authAction";

const LoginScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const signupHandler = async () => {
    if (name.length == 0 || email.length == 0 || password.length == 0) {
      Alert.alert(
        "Incorrect Details!",
        "Please fill all the fields",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        "Incorrect Details!",
        "Please enter a valid Email",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Incorrect Details!",
        "Password should be at least 8 characters!",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (name.length > 8) {
      Alert.alert(
        "Incorrect Details!",
        "Please Enter Your Nickname!\n(Less than 10 characters)",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }
    setIsLoading(true);
    await dispatch(authActions.signup(email, password));
    setIsLoading(false);
    props.onPress(name);
  };

  const handleNameOnChanage = (input) => {
    setName(input);
  };

  const handleEmailOnChange = (input) => {
    setEmail(input);
  };

  const handlePasswordOnChange = (input) => {
    setPassword(input);
  };

  const handleLogIn = async () => {
    if (name.length == 0 || email.length == 0 || password.length == 0) {
      Alert.alert(
        "Incorrect Details!",
        "Please fill all the fields",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert(
        "Incorrect Details!",
        "Please enter a valid Email",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Incorrect Details!",
        "Password should be at least 8 characters!",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (name.length > 8) {
      Alert.alert(
        "Incorrect Details!",
        "Please Enter Your Nickname!\n(Less than 10 characters)",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: true }
      );
      return;
    }
    setIsLoading(true);
    await dispatch(authActions.login(email, password));
    setIsLoading(false);
    props.onPress(name);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.screen}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>REMOTE GATEKEEPING SYSTEM</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/welcomeScreen.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.allInputFields}>
          <View style={styles.oneField}>
            <Text style={styles.label1}>Name : </Text>
            <TextInput
              blurOnSubmit
              onChangeText={handleNameOnChanage}
              style={styles.input1}
              placeholder="Enter your name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            ></TextInput>
          </View>
          <View style={styles.oneField}>
            <Text style={styles.label2}>Email : </Text>
            <TextInput
              style={styles.input2}
              onChangeText={handleEmailOnChange}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              autoCompleteType={"email"}
              keyboardType="email-address"
              autoCapitalize="none"
            ></TextInput>
          </View>
          <View style={styles.oneField}>
            <Text style={styles.label3}>Password : </Text>
            <TextInput
              onChangeText={handlePasswordOnChange}
              autoCompleteType={"password"}
              secureTextEntry={true}
              style={styles.input3}
              placeholder="Enter your password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            ></TextInput>
          </View>
          <View style={styles.logInButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white"></ActivityIndicator>
            ) : (
              <CustomButton onPress={handleLogIn}>Log In</CustomButton>
            )}
            {isLoading ? (
              <ActivityIndicator size="small" color="white"></ActivityIndicator>
            ) : (
              <CustomButton onPress={signupHandler}>Sign In</CustomButton>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    paddingVertical: 20,
    marginTop: "40%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
  oneField: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomColor: "#fff8dc",
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 60,
  },
  label1: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
  },
  input1: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
    marginLeft: 44,
  },
  label2: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
  },
  input2: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
    marginLeft: 48,
  },
  label3: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
  },
  input3: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
    marginLeft: 24,
  },
  logInButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-around",
    marginTop: 30,
  },
});

export default LoginScreen;
