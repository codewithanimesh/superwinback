import React, { useState } from "react";
import Carousel from 'react-native-snap-carousel';
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
  SafeAreaView,  Dimensions,
} from "react-native";

export default function LoginPage({ navigation }) {
    const carouselItems = [
        {
            source: require("../assets/banner1.png")
        },
        {
            source: require("../assets/banner2.png")
        }
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
            style={styles.imageBackground}
          >
            <View style={styles.smallImageContainer}>
              <Image
                source={require("../assets/logo.png")}
                resizeMode="stretch"
                style={styles.smallImageBottom}
              />
            </View>
            <Image
              source={require("../assets/rupee.png")}
              resizeMode="stretch"
              style={styles.midSizeImage}
            />
            <View style={styles.balanceContainer}>
              <Text style={styles.whiteTextSmall}>{"Total Balance"}</Text>
              <View style={styles.balanceInnerContainer}>
                <Text style={styles.whiteTextLarge}>{"50,684.89"}</Text>
                <Image
                  source={require("../assets/refresh.png")}
                  resizeMode="stretch"
                  style={styles.iconSmall}
                />
              </View>
            </View>
          </ImageBackground>
          <View style={styles.container}>
            <Carousel
              data={carouselItems}
              renderItem={renderItem}
              sliderWidth={Dimensions.get('window').width}
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
    paddingBottom: 32,
  },
  imageContainer: {
    marginBottom: 109,
  },
  imageBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 17,
  },
  slide: {
    width: 300,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'floralwhite'
},
slideImage: {
    width: '100%',
},
  smallImageContainer: {
    width: 57,
    marginRight: 148,
  },
  smallImageTop: {
    height: 32,
  },
  smallImageBottom: {
    position: "absolute",
    bottom: -17,
    right: 8,
    width: 41,
    height: 35,
  },
  midSizeImage: {
    width: 32,
    height: 32,
    marginRight: 9,
  },
  balanceContainer: {
    width: 114,
  },
  whiteTextSmall: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 4,
    marginHorizontal: 2,
  },
  balanceInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  whiteTextLarge: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  absoluteLargeImageLeft: {
    position: "absolute",
    bottom: -93,
    left: 17,
    borderRadius: 10,
    width: 336,
    height: 145,
  },
  absoluteLargeImageRight: {
    position: "absolute",
    bottom: -93,
    right: -306,
    borderRadius: 10,
    width: 336,
    height: 145,
  },
  // Additional styles for other components can be added here
  imageContainer: {
    marginBottom: 109,
  },
  imageBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 70,
    paddingHorizontal: 17,
  },
  midSizeImage: {
    width: 32,
    height: 32,
    marginRight: 9,
  },
});
