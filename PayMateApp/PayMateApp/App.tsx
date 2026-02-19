import React from "react";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import FriendsScreen from "./screens/FriendsScreen";
import PayScreen from "./screens/PayScreen";
import SuccessScreen from "./screens/SuccessScreen";

// MUST be called before navigation
enableScreens();

export type RootStackParamList = {
  Friends: undefined;
  Pay: { name: string; upi: string };
  Success: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
