import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import COLORS from "./COLOR";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Btn from "../components/Btn";
const image = require("./images/avatar.png");
export default function LeaveDetails({ navigation }) {
  const [leaveDetails, setLeaveDetails] = useState({});

  // const array = [{ name: "Apple" }, { name: "Orange" }, { name: "Banana" }];

  const getLeaveDetails = async () => {
    try {
      const res = await axios.get(
        "http://192.168.5.18:5001/employees/631882feb6d3aba26a758537"
      );
      // console.log("get req in leave details", res);
      res && setLeaveDetails(res.data);
    } catch (error) {
      console.log(" Errors while get list of user leaves", error);
    }
  };

  useEffect(() => {
    getLeaveDetails();
  }, []);

  // console.log("Leaves of user", leaveDetails.Leaves);
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.linearStart, COLORS.linearEnd]}
    >
      <SafeAreaView>
        <Text style={styles.headerText}>Leave Details</Text>
        <View style={styles.headercontainer}>
          <Image source={image} style={styles.img} />
          <View>
            <Text style={styles.text}> {leaveDetails.firstname}</Text>
            <Text style={{ color: COLORS.textColor, marginLeft: 30 }}>
              {" "}
              Designation: {leaveDetails.designation}
            </Text>
          </View>
        </View>
        <Card
          theme={{
            colors: { background: "#F0F4C3", surface: "#CFD8DC" },
            width: 30,
          }}
        >
          {leaveDetails.Leaves &&
            leaveDetails.Leaves.map((i, d) => {
              // console.log(" Data", i.leaveType);
              return (
                <View>
                  <Text>{i.leaveType}</Text>
                  {/* <Text>{i.from}</Text> */}
                  {/* <Text>{i.to}</Text> */}
                  <Text>{i.reason}</Text>
                </View>
              );
            })}
          <Text>Contact Detail: {leaveDetails.phone}</Text>

          {/* <FlatList
            data={array}
            renderItem={({ item }) => <Text>{item.name}</Text>}
            keyExtractor={(item) => item.key}
          /> */}
        </Card>
        {/* <TouchableOpacity style={[styles.button, styles.buttonStyle]}>
          <Text
            style={[styles.textStyle, { marginTop: 1 }]}
            onPress={() => navigation.navigate("ApplyForLeave")}
          >
            Apply For Leave{" "}
          </Text>
        </TouchableOpacity> */}
        <Btn
          title="Apply For Leave"
          style={styles.button}
          onClick={() => navigation.navigate("ApplyForLeave")}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.textColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  headercontainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
  },
  text: {
    color: COLORS.textColor,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 50,
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: COLORS.buttonColor,
  },
  textStyle: {
    color: COLORS.textColor,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20,
  },
  button: {
    width: "60%",
    backgroundColor: "#e0c222",
    marginHorizontal:"17%"
  },
});
