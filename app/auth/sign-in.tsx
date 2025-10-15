import { Fonts } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const { top } = useSafeAreaInsets();

  // just validate if input has value.
  const validateForm = (): boolean => {
    const isEmailEmpty = !email.trim();
    const isPasswordEmpty = !password.trim();

    setShowEmailError(isEmailEmpty);
    setShowPasswordError(isPasswordEmpty);

    return isEmailEmpty || isPasswordEmpty;
  };

  const handleSignIn = () => {
    const formHasErrors = validateForm();
    if (formHasErrors) {
      return;
    }

    router.push("/(app)/(tabs)/home");
  };

  const onChangeEmail = (text: string) => {
    setEmail(text);
    if (showEmailError) setShowEmailError(false);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
    if (showPasswordError) setShowPasswordError(false);
  };

  return (
    <View style={{ ...styles.container, paddingTop: top + 50 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <Text style={styles.subtitle}>
              Te damos la bienvenida. Ingresa a tu cuenta {"\n"}
              para empezar a disfrutar de la app.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Correo electronico</Text>
              <TextInput
                style={[styles.input, showEmailError && styles.inputError]}
                placeholder="email@email.com"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={onChangeEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {showEmailError && (
                <Text style={styles.errorText}>
                  Completa este campo para continuar
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contraseña</Text>
              <View
                style={[
                  styles.passwordContainer,
                  showPasswordError && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  placeholder="**********"
                  placeholderTextColor="#BDBDBD"
                  value={password}
                  onChangeText={onChangePassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#171717"
                  />
                </TouchableOpacity>
              </View>
              {showPasswordError && (
                <Text style={styles.errorText}>
                  Completa este campo para continuar
                </Text>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{ ...styles.button }}
              onPress={handleSignIn}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.medium,
    color: "#171717",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#707070",
    lineHeight: 25,
  },
  formContainer: {
    flex: 1,
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: "#171717",
    marginBottom: 4,
  },
  input: {
    height: 64,
    borderWidth: 1,
    borderColor: "#171717",
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#171717",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "#EF4444",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    borderWidth: 1,
    borderColor: "#171717",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#171717",
  },
  eyeIcon: {
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: "auto",
    paddingTop: 20,
  },
  button: {
    bottom: 30,
    backgroundColor: "#171717",
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
});
