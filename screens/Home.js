import { Text, View, StyleSheet, Image, Button, pla } from "react-native";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import "firebase/firestore";
import * as Location from "expo-location";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import * as ImagePicker from 'expo-image-picker';
//import { LinearGradient } from "expo-linear-gradient";
//import { Card } from 'react-native-elements';
import TextBox from "../components/TextBox";
const styles = StyleSheet.create({
  view: {
    //flex: 1,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    height: 900,
  },
  date: {
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 30,
    color: "green",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 20,
    marginTop: 20,
  },
  checkIn: {
    width: "30%",
    marginVertical: 70,
    backgroundColor: "green",
    marginTop: 40,
  },
  checkOUt: {
    width: "30%",
    marginVertical: 70,
    backgroundColor: "#ff0000",
    marginTop: 40,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    fontStyle: "italic",
    marginVertical: 40,
  },
  logo: {
    width: "60%",
    maxWidth: 300,
    maxHeight: 250,
    marginVertical: "2%",
    marginTop: 80,
  },
  log: {
    maxWidth: 300,
    maxHeight: 250,
    marginTop: "35%",
    backgroundColor: "#e0c222",
  },
  profile: {
    marginTop: "80%",
  },
  // logo:{width: 250,
  // //maxWidth: 300,
  // //maxHeight: 250,
  // height: 250,
  // marginVertical: "10%",
  // borderRadius: 240 / 2,},
  card: {
    alignItems: "center",
    barder: 1,
    borderColor: "black",
    backgroundColor: "white",
    width: 350,
    height: 400,
    borderRadius: 10,
    marginTop: 2,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
//code for store data in firestore
export default function Home({ navigation, email }) {
  const [checkIn, setCheckIn] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  const createUserProfileDocument = async (user, additionalData) => {
    // if (!user) return;
    console.log("value of useremail", userEmail);
    const docRef = firestore.doc(`users/${userEmail}`);
    const docSnapshot = await docRef.get();
    //console.log("docsnapshot", docSnapshot.data());
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    {
      const createdAt = new Date();
      try {
        await docRef.set(
          {
            createdAt: timestamp,
            CheckIn: currentTime,
          },
          { merge: true }
        );
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return docRef;
  };

  const createUserProfileDocumentOut = async (user, additionalData) => {
    //if (!user) return;
    console.log("value of useremail", userEmail);

    const docRef = firestore.doc(`users/${userEmail}`);
    const docSnapshot = await docRef.get();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    {
      const createdAt = new Date();
      try {
        await docRef.set(
          {
            createdAt: timestamp,
            CheckOut: currentCTime,
          },
          { merge: true }
        );
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return docRef;
  };
  //code for maps
  async function GetCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync(
        {
          latitude,
          longitude,
        },
        console.log(latitude, longitude)
      );

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.city}`;

        alert(address);
      }
    }
  }
  //code for time
  let newTime = new Date().toLocaleTimeString("en-US");
  const [currentTime, setCurrentTime] = useState(newTime);
  const UpdateTime = () => {
    newTime = new Date().toLocaleTimeString("en-US");
    setCurrentTime(newTime);
    alert("Your Are Successfully Checked In");
    //setCheckIn(newTime);
  };
  let newCTime = new Date().toLocaleTimeString("en-US");
  const [currentCTime, setCurrentCTime] = useState(newCTime);
  const UpdateCTime = () => {
    newTime = new Date().toLocaleTimeString("en-US");
    setCurrentCTime(newTime);
    alert("You Are Successfully Checked Out ");
  };
  function name() {
    console.log("hello");
  }
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const todoRef = firebase.firestore().collection("newData");
  const [addData, setAddData] = useState("");

  // const addField = () => {
  //   if (addData && addData.length > 0) {
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const data = {
  //       Name: addData,
  //       createdAt: timestamp,
  //     };
  //     todoRef
  //       .add(data)
  //       .then(() => {
  //         setAddData("");
  //         //Keyboard.dismiss();
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   }
  // };

  if ((latitude = "31.486997259091144" && (longitude = "74.30590500211524"))) {
    return (
      //<LinearGradient colors={['#def2f7', '#98b6df', '#7891c2']} style={styles.linearGradient}>
      <View style={styles.view}>
        <Image source={require("../assets/logo4.jpg")} style={styles.logo} />
        <Text style={styles.text}>Employee Attendance Time</Text>
        <View style={styles.card}>
          {/* <TextBox
            placeholder="Enter Your Name"
            onChangeText={(Name) => setAddData(Name)}
            value={addData}
          /> */}

          <Text style={styles.Text}>
            CheckIn Time: <Text style={styles.date}>{currentTime}</Text>
          </Text>
          <Btn
            title="Check In "
            onClick={() => {
              AsyncStorage.getItem("userName").then((v) => setUserEmail(v));

              UpdateTime();
              createUserProfileDocument();
              GetCurrentLocation();
            }}
            style={styles.checkIn}
          />
          <Text style={styles.Text}>
            CheckOut Time:<Text style={styles.date}>{currentCTime}</Text>
          </Text>
          <Btn
            title="Check Out "
            onClick={() => {
              AsyncStorage.getItem("userName").then((v) => setUserEmail(v));

              UpdateCTime();
              createUserProfileDocumentOut();
              GetCurrentLocation();
            }}
            style={styles.checkOUt}
          />
        </View>
        {/* <Btn title='select' onClick={()=>navigation.navigate('Select')}/> */}
        <Btn
          title="Log Out"
          onClick={() => firebase.auth().signOut()}
          style={styles.log}
        />
      </View>
      //</LinearGradient>
    );
  } else {
    alert("your are not in location");
  }
}
