import React, { useRef } from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function GlowButton({ title, onPress, disabled }: any) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPressIn={pressIn}
      onPressOut={pressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.wrapper,
          { transform: [{ scale }], opacity: disabled ? 0.5 : 1 },
        ]}
      >
        <LinearGradient
          colors={["#FF8A00", "#FF6A00"]}
          style={styles.button}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    shadowColor: "#FF8A00",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  button: {
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },
});