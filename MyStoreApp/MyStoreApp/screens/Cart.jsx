// screens/Cart.jsx

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Cart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
})