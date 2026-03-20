import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import PayScreen from "../screens/PayScreen";
import SuccessScreen from "../screens/SuccessScreen";
import AddMoneyScreen from "../screens/AddMoneyScreen";
import PinScreen from "../screens/PinScreen";
import ScannerScreen from "../screens/ScannerScreen";
import SplitBillScreen from "../screens/SplitBillScreen";
import { useWalletStore } from "../walletstore";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isAuthenticated = useWalletStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <PinScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Pay" component={PayScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="SplitBill" component={SplitBillScreen} />
    </Stack.Navigator>
  );
}