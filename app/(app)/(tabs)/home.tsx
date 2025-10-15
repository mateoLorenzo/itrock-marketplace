import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.navigate("/(app)/(tabs)/products");
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>go to /products</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
