// screens/Details.jsx

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Details = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
      <Text>Product Name: Shoes</Text>
      <Text>Price: ₹1999</Text>
      <Text>Description: Comfortable running shoes</Text>

      <View style={{ marginVertical: 10 }} />

      <Button
        title="Add to Cart"
        onPress={() => navigation.navigate('Cart')}
      />

      <View style={{ marginVertical: 10 }} />

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
})