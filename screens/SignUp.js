import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../components/TextBox"
import Btn from "../components/Btn"
import firebase from 'firebase/app';
import "firebase/auth";

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        //justifyContent: "center",
        alignItems: "center",
        marginTop:'20%'
    },
    terms:{
        width:'92%',
        //marginLeft:20,
        color:'grey',
        marginVertical:10,
        marginTop:"5%"
    },
    link:{
        color:'#FDB075'
    }
})

export default function SignUpScreen({ navigation }) {

    const onTermsOfUse=()=>{
        console.warn("Terms Of Use ");
    }
    const onPrivacyPolicy=()=>{
        console.warn("Privacy Policy")
    }

    const [values, setValues] = useState({
        email: "",
        pwd: "",
        pwd2: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function SignUp() {

        const { email, pwd, pwd2 } = values

        if (pwd == pwd2) {
            firebase.auth().createUserWithEmailAndPassword(email, pwd)
                .then(() => {
                })
                .catch((error) => {
                    alert(error.message)
                    // ..
                });
        } else {
            alert("Passwords are different!")
        }
    }

    return <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Sign Up</Text>
        <TextBox placeholder="Email Address" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd")}/>
        <TextBox placeholder="Confirme Password" secureTextEntry={true}  onChangeText={text => handleChange(text, "pwd2")}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp()} title="Sign Up" style={{ width: "48%" }} />
            <Btn onClick={() => navigation.replace("Login")} title="Login" style={{ width: "48%", backgroundColor: "#3B71F3" }} />
        </View>
        <Text style={styles.terms}>By registering, you confirm that you accept
            our <Text style={styles.link} onPress={onTermsOfUse}>Terms of Use</Text> and <Text style={styles.link} onPress={onPrivacyPolicy}>Privacy Policy</Text>
        </Text>
    </View>
}