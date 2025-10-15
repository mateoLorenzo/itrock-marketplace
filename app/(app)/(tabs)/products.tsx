import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProductsScreen = () => {
  const router = useRouter();

  const handleCheckout = () => {
    router.navigate("/(app)/checkout");
  };

  return (
    <View style={styles.container}>
      <Text>ProductsScreen</Text>
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>go to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: "#171717",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  buttonText: {
    color: "#E5E5E5",
    fontSize: 16,
  },
});
