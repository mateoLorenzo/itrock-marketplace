import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SignInScreen = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/(app)/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

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
