import React, { useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS, RADIUS, SPACING } from "../theme";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom || SPACING.md }]}>
      <LinearGradient
        colors={['rgba(20,20,30,0.85)', 'rgba(10,10,15,0.95)']}
        style={styles.tabBarBackground}
      />
      
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        
        const animatedScale = useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;

        useEffect(() => {
          Animated.spring(animatedScale, {
            toValue: isFocused ? 1.15 : 1,
            useNativeDriver: true,
            friction: 4,
          }).start();
        }, [isFocused]);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconMap: any = { Home: "🏠", Transactions: "📋", Profile: "👤" };
        
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Animated.View style={[
              styles.iconContainer, 
              isFocused && styles.iconActiveFocused,
              { transform: [{ scale: animatedScale }] }
            ]}>
              <Text style={styles.iconText}>{iconMap[route.name]}</Text>
            </Animated.View>
            <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
              {route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  iconContainer: {
    width: 44,
    height: 32,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  iconActiveFocused: {
    backgroundColor: 'rgba(0,240,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,240,255,0.3)',
  },
  iconText: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
