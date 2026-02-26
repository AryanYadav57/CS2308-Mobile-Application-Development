// screens/Home.jsx

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Store</Text>

      <Button
        title="View Product"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

export default Home

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