import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import TextBox from "../components/TextBox";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import * as Facebook from 'expo-facebook';
const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    //justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  logo: {
    width: "60%",
    maxWidth: 300,
    maxHeight: 250,
    marginVertical: "10%",
    borderRadius: 200,
  },
});

export default function Loginscreen({ navigation }) {
  const [values, setValues] = useState({
    email: "",
    pwd: "",
  });

  function handleChange(text, eventName) {
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  // function Login() {
  //   const { email, pwd } = values;

  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, pwd)
  //     .then(() => {})
  //     .catch((error) => {
  //       alert(error.message);
  //       // ..
  //     });
  // }
  // const config = {
  //   iosClientId:
  //     "224989711578-hhsnq64qnd53tio9cv7qouor7ccllqs5.apps.googleusercontent.com",
  // };
  async function logIn() {
    try {

      await Facebook.initializeAsync({
        appId: '352285113706740'
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <View style={styles.view}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <Text
        style={{
          fontSize: 34,
          fontWeight: "bold",
          marginBottom: 20,
          color: "grey",
          fontStyle: "italic",
        }}
      >
        Demo App
      </Text>
      <TextBox
        placeholder="Email Address"
        onChangeText={(text) => handleChange(text, "email")}
      />
      <TextBox
        placeholder="Password"
        onChangeText={(text) => handleChange(text, "pwd")}
        secureTextEntry={true}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "92%",
        }}
      >
        <Btn onClick={() => Login()} title="Login" style={{ width: "48%" }} />
        <Btn
          onClick={() => navigation.navigate("Sign Up")}
          title="Sign Up"
          style={{ width: "48%", backgroundColor: "#3B71F3" }}
        />
      </View>
      <Btn
        onClick={() => navigation.navigate("ForgotPassword")}
        title="ForgotPassword"
        style={{ width: "48%", backgroundColor: "#3B71F3", marginTop: "20%" }}
      />
      <View>
        <Btn
          onClick={() => logIn()}
          title="Login with Facebook"
          style={{ width: 210 }}
        />
      </View>
    </View>
  );
}
