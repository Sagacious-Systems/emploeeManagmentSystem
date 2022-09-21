//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button, TextInput } from "react-native";
import { useState } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import * as AuthSession from 'expo-auth-session';
//import auth from '@react-native-firebase/auth';
//import AsyncStorage from "@react-native-async-storage/async-storage";

// create a component
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const reset = async () => {
    setShowLoading(true);
    try {
      firebase.auth().sendPasswordResetEmail(email);
      setShowLoading(false);
    } catch (e) {
      setShowLoading(false);
      Alert.alert(e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 28, height: 50, fontWeight:'bold' }}>Reset Password!</Text>
        </View>
        <View style={styles.text}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Email"
            //leftIcon={<Icon name="mail" size={24} />}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.Input}
           //icon={<Icon name="input" size={15} color="white" />}
            title="Reset"
            onPress={() => reset()}
          />
        </View>
     
       {showLoading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
       )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    height: 400,
    padding: 20,
  },
  subContainer: {
    marginBottom: 20,
    padding: 5,
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontSize: 18,
    width:380,
    border:1,
    borderRadius:5,
    borderColor:'grey',
    backgroundColor:'white',
    paddingVertical:10
    
  },
Input:{
    fontWeight:'bold'
}
});
//make this component available to the app
export default ForgotPassword;
