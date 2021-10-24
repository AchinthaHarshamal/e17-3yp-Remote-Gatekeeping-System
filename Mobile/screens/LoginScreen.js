import React, { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formError, setFormError] = useState();

  const dispatch = useDispatch();

  const handleLogIn = async () => {
    if (email.length == 0 || password.length == 0) {
      setFormError("Please fill all the fields");
      return;
    }

    if (!email.includes("@")) {
      setFormError("Please enter a valid Email");
      return;
    }

    if (password.length < 8) {
      setFormError("Password should be at least 8 characters!");
      return;
    }
    setFormError();
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(authActions.login(email, password));
      await dispatch(authActions.fetchUserInfo());
      props.onPress();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const handleEmailOnChange = (input) => {
    setEmail(input);
  };

  const handlePasswordOnChange = (input) => {
    setPassword(input);
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
          </View>
          {formError ? (
            <Text style={styles.voiceReceived} t>
              {formError}
            </Text>
          ) : (
            <View></View>
          )}
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
  voiceReceived: {
    fontSize: 12,
    color: "#8A8989",
    paddingTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
