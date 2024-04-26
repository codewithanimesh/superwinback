import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

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
  SafeAreaView,
  Dimensions,
} from "react-native";

export default function LoginPage({ navigation }) {
  const carouselItems = [
    {
      source: require("../assets/banner1.png"),
    },
    {
      source: require("../assets/banner2.png"),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.source} // Use the 'source' from the item
          resizeMode="contain" // Change to 'contain' to avoid stretching if needed
          style={styles.slideImage}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require("../assets/Maskbackround.png")}
            resizeMode="stretch"
          ></ImageBackground>
          <View style={styles.header}>
            <Image
              source={require("../assets/logo.png")}
              resizeMode="stretch"
              style={styles.logoimage}
            />

            <View style={styles.balanceContainer}>
              <Image
                source={require("../assets/rupee.png")}
                resizeMode="stretch"
                style={styles.midSizeImage}
              />

              <View style={styles.balanceInnerContainer}>
                <Text style={styles.whiteTextSmall}>{"Total Balance"}</Text>
                <Text style={styles.whiteTextLarge}>{"50,684.89"}</Text>
              </View>
              <Image
                source={require("../assets/refresh.png")}
                resizeMode="stretch"
                style={styles.iconSmall}
              />
            </View>
          </View>

          <View style={styles.container}>
            <Carousel
              data={carouselItems}
              renderItem={renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={300}
              layout="default"
            />
          </View>
        </View>
        {/* Additional Views and Components can be similarly refactored */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#191B23",
  },
  header:{
    flex:1,
    flexDirection: "row",
    padding:16,
    width:"100%",
    justifyContent:"center",
  },
  logoimage: {
    width: 70,
    height: 50,
  },
  balanceContainer: {
    flex:1,
    flexDirection: "row",
  },
  imageBackground: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  slide: {
    width: 300,
    height: 128,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "floralwhite",
  },
  slideImage: {
    width: "100%",
  },
});
