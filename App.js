import React from "react";
import { Easing } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./Appscreen/start"; // Assume Start.js is your current file
import LoginPage from "./Appscreen/login"; // Assume Login.js is your new login form file
import Homepage from "./Appscreen/home"; // Assume Login.js is your new login form file
import Onboardpage from "./Appscreen/onboarding"; // Assume Login.js is your new login form file

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
          screenOptions={{
            headerShown: false,
            animation: "fade", // This applies a fade transition. Change to "slide_from_right" for a sliding effect.
            animationTypeForReplace: "pop",
            gestureEnabled: true,
            gestureDirection: "horizontal",
            transitionSpec: {
              open: {
                animation: "timing",
                config: { duration: 500, easing: Easing.easeInOut },
              },
              close: {
                animation: "timing",
                config: { duration: 500, easing: Easing.easeInOut },
              },
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboard"
          component={Onboardpage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
