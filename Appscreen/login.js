import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLock, faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { Linking } from 'react-native';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/auth'
export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
   
      if (email.trim() === "" || password.trim() === "") {
        Alert.alert("Error", "Please enter both email and password.");
        return;
      }
      
      const response = await fetch('http://192.168.1.2:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        Alert.alert("Success","User successfully logged in.")
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
       
      } else {
      
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error) {
     
      console.error('Login error:', error);
      Alert.alert("Error", "An unexpected error occurred. Please try again later.");
    }
  };
  const handleForgotPassword = async () => {
    try {
      if (email.trim() === "") {
        Alert.alert("Error", "Please enter your email.");
        return;
      }
  
      const response = await fetch('http://192.168.1.2:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
  
      if (response.ok) {
        Alert.alert("Success", "Temporary password generated and sent to your email.");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert("Error", "An unexpected error occurred. Please try again later.");
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
  
      const initialUrl = await Linking.getInitialURL();
      const { scheme, host } = Linking.parse(initialUrl);
  
      const redirectUrl = await WebBrowser.openAuthSessionAsync(GOOGLE_AUTH_URL, `${scheme}://${host}/auth/google/callback`);
  
      if (redirectUrl) {
        const response = await fetch("http://192.168.1.2:3000/api/auth/google/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ redirectUrl }), 
        });
  
        if (response.ok) {
          navigation.navigate("Home");
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message);
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert("Error", "An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
      </TouchableOpacity>

      <ImageBackground
        source={require("../assets/Maskbackround.png")}
        style={styles.backgroundStyle}
      >
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </ImageBackground>

      <View style={styles.cont}>
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome back!</Text>
          <Text style={styles.textlog}>
            Log in to your existing account of SUPERWIN
          </Text>
        </View>

        <View style={styles.textInputView}>
          <FontAwesomeIcon icon={faUser} style={styles.textboxicon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.textInputView}>
          <FontAwesomeIcon icon={faLock} style={styles.textboxicon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <Text
          style={styles.forgot}
          onPress={handleForgotPassword} 
        >
          Forgot Password?
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
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignIn}
          >
            <Image source={require("../assets/Google.png")} />
            <Text style={styles.socialText}> Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => console.log("Login with Facebook Pressed")}
          >
            <Image source={require("../assets/Facebook.png")} />
            <Text style={styles.socialText}> Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-end", // Ensures the content is aligned at the bottom
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 10,
  },
  backgroundStyle: {
    flex: 1, // This will ensure it takes all available space in its container
    width: "100%", // Ensures the background covers the full width of its container
    justifyContent: "flex-end", // Aligns the child content to the bottom
    alignItems: "center", // Centers the child content horizontally
  },
  logo: {
    width: 200, // Set a fixed width for the logo
    height: 150, // Set a fixed height for the logo
    resizeMode: "contain", // Ensures the image scales correctly within the bounds
  },
  cont: {
    width: "100%",
    alignItems: "center",
    padding: 30,
    paddingBottom: 50, // Adds padding at the bottom
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF1A",
    borderRadius: 10,
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 12,
  },
  textboxicon: {
    color: "#fff",
    marginRight: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  textlog: {
    color: "#EBEBF5",
    fontSize: 16,
  },
  heading: {
    color: "#EBEBF5",
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 56,
    color: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  forgot: {
    color: "#A903D2",
    fontSize: 14,
    marginBottom: 20,
  },
  linearGradient: {
    marginTop: 20,
    width: "100%",
    height: 64,
    borderRadius: 10,
    justifyContent: "flex-end", // Center the button text vertically
    alignItems: "center", // Center the button text horizontally
  },
  buttonContainer: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFFFFF6B",
  },
  orText: {
    width: 30,
    textAlign: "center",
    color: "#fff",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  socialButton: {
    flexDirection: "column",
    alignItems: "center",
  },
  socialText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
