import { StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import COLORS from "./COLOR";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import Foundation from "react-native-vector-icons/Foundation";
import axios from "axios";

export default function ApplyForLeave({ navigation }) {
  const data = [
    { leaveType: "Sick Leave", value: "1" },
    { leaveType: "Casual Leave", value: "2" },
    { leaveType: "Paternity Leave", value: "3" },
    { leaveType: "Religious Leave", value: "4" },
    { leaveType: "Maternity Leave", value: "5" },
    { leaveType: "Unpaid Leave", value: "6" },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [dateStart, setDateStart] = useState(new Date(1528578000000));
  const [dateEnd, setDateEnd] = useState(new Date(1528578000000));
  const [mode, setMode] = useState("date");
  const [modeEnd, setModeEnd] = useState("date");
  const [show, setShow] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [reqLeaveDays, setReqLeaveDays] = useState();
  const [reason, setReason] = useState();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: COLORS.buttonColor }]}>
          Leave Types
        </Text>
      );
    }
    return null;
  };

  //start date of leave
  const onChangeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateStart(currentDate);
  };

  //end date of leave
  const onChangeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEnd(false);
    setDateEnd(currentDate);
  };

  //start date mode of leave
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //end date mode of leave
  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  //start leave date picker
  const showDatepicker = () => {
    // console.log(" Msg");
    showMode("date");
  };

  //end leave date picker
  const showDatepickerEnd = () => {
    // console.log(" Msg");
    showModeEnd("date");
  };

  const postData = {
    leaveType: value,
    from: dateStart,
    to: dateEnd,
    // reqLeaveDays,
    // status: status,
    // attachment: attachment,
    reason: reason,
  };

  const leaveSubmitHandler = async () => {
    try {
      const res = await axios.post(
        "http://192.168.5.18:5001/leaverequest/addrequest",
        postData
      );
      // console.log(" responce of data", res);

      res && navigation.navigate("LeaveDetails");
    } catch (error) {
      console.log(" Errors while requesting leave", error);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.linearStart, COLORS.linearEnd]}
    >
      <Text style={styles.headerText}>Leave Requests</Text>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Leave Type</Text>
        </View>
        <View style={styles.bg}>
          {renderLabel()}
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && { borderColor: COLORS.buttonColor },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="leaveType"
            valueField="leaveType"
            placeholder={!isFocus ? "Select leave" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.leaveType);
              setIsFocus(!isFocus);
              console.log(" focus in dropdown", isFocus);
            }}
          />
        </View>
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>From Date</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
          }}
        >
          <Text style={styles.modalText}>
            {" "}
            {dateStart.toLocaleDateString()}
            {"     "}
          </Text>
          <Foundation
            name="calendar"
            size={25}
            color={COLORS.textColor}
            onPress={showDatepicker}
          />
        </View>
        {showEnd && (
          <DateTimePicker
            testID="EndDateTimePicker"
            value={dateStart}
            mode={modeEnd}
            // is24Hour={true}
            onChange={onChangeDateEnd}
          />
        )}
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>To Date</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 30,
          }}
        >
          <Text style={styles.modalText}>
            {" "}
            {dateEnd.toLocaleDateString()}
            {"     "}
          </Text>
          <Foundation
            name="calendar"
            size={25}
            color={COLORS.textColor}
            onPress={showDatepickerEnd}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateEnd}
            mode={mode}
            // is24Hour={true}
            onChange={onChangeDateStart}
          />
        )}
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Total Days</Text>
        </View>
        <TextInput
          value={reqLeaveDays}
          keyboardType={"number-pad"}
          style={{
            // borderWidth: 1,
            paddingHorizontal: 50,
            color: COLORS.textColor,
          }}
          onChangeText={(text) => setReqLeaveDays(text)}
        ></TextInput>
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Reason</Text>
        </View>
        <TextInput
          value={reason}
          style={{
            paddingHorizontal: 50,
            color: COLORS.textColor,
          }}
          onChangeText={(text) => setReason(text)}
        ></TextInput>
      </View>
      <View style={styles.border}>
        <View style={styles.bgText}>
          <Text>Attachment</Text>
        </View>
        <Text style={{ color: COLORS.textColor }}>choose a file...</Text>
        {/* <TextInput
          value={reason}
          style={{
            paddingHorizontal: 50,
            color: COLORS.textColor,
          }}
          onChangeText={(text) => setReason(text)}
        ></TextInput> */}
      </View>
      <TouchableOpacity style={[styles.button, styles.buttonStyle]}>
        <Text
          style={[styles.textStyle, { marginTop: 1 }]}
          onPress={leaveSubmitHandler}
        >
          Save{" "}
        </Text>
      </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 30,
    marginTop: 60,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.textColor,
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 5,
  },
  bgText: {
    backgroundColor: COLORS.textColor,
    marginRight: 20,
    width: "40%",
    alignItems: "center",
    padding: 5,
  },
  bg: {
    marginRight: 20,
    width: "50%",
    alignItems: "center",
    padding: 5,
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
  dropdown: {
    height: 20,
    width: 150,
    paddingHorizontal: 10,
  },
  label: {
    position: "absolute",
    color: COLORS.buttonColor,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.textColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.textColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    color: COLORS.textColor,
  },
});