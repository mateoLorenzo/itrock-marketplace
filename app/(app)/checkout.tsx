import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CheckoutScreen</Text>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
