import React from "react";
import {
  ScrollView,
  View,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Start({ navigation }) {
  // Destructure navigation directly from props
  return (
    <ScrollView style={styles.bgcolor1}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/Maskbackround.png")}
          style={styles.backgroundStyle}
        >
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </ImageBackground>

        <View style={styles.textWrapper}>
          <View style={styles.textWrap}>
            <Text style={styles.headerText}>
              Generate anything what’s in your mind now
            </Text>
            <Text style={styles.descriptionText}>
              An AI that developed to help you generate what’s in your mind into
              beautiful visual
            </Text>
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#A903D2", "#410095"]}
            style={styles.linearGradient}
            angle={"45"}
          useAngle={true}
          >
           <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>LETS GO!</Text>
          </TouchableOpacity>
          </LinearGradient>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Onboard")} // Correctly use destructured navigation
              >
                <Text style={styles.signInText}>Sign Up Here</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgcolor1: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000", // Background color of the ScrollView
  },
  container: {
    flex: 1,
    // backgroundColor: "#eee",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 0,
  },
  backgroundStyle: {
    width: "100%",
    height: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 200,
    resizeMode: "contain",
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    height: "50%",
  },
  textWrap: {
    justifyContent: "flex-end",
  },
  headerText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#EBEBF5",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  linearGradient: {
    marginTop: 20,
    width: 346,
    height: 64,
    borderRadius: 10,
    justifyContent: "flex-end", // Center the button text vertically
    alignItems: "center", // Center the button text horizontally
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 60,
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  signInText: {
    color: "#A903D2",
    fontSize: 16,
    fontWeight: "bold",
  },
});
