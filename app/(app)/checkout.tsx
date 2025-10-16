import { ArrowBack, Visa } from "@/components/Icon";
import { Fonts } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckoutScreen = () => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleFinalizePurchase = () => {
    if (!expiration || !cvv) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    Alert.alert("Éxito", "Compra finalizada correctamente");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottom + 10 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: top + 20 }]}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowBack width={40} height={40} />
          </TouchableOpacity>
          <Text style={styles.title}>Agregá un {"\n"}metodo de pago</Text>
          <Text style={styles.subtitle}>
            Ingresa los datos de tu tarjeta para {"\n"}finalizar la compra
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre en la tarjeta</Text>
            <TextInput
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
              placeholder="Nombre completo"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Número de tarjeta</Text>
            <TextInput
              style={[styles.input, styles.cardNumberInput]}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="0000 0000 0000 0000"
              keyboardType="numeric"
            />
            <View style={styles.visaContainer}>
              <View style={styles.visaSeparator} />
              <Visa width={40} height={40} />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Vencimiento</Text>
              <TextInput
                style={styles.input}
                value={expiration}
                onChangeText={setExpiration}
                placeholder="00/00"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>Código</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setSavePaymentMethod(!savePaymentMethod)}
            activeOpacity={0.4}
          >
            <View style={styles.checkbox}>
              {savePaymentMethod && (
                <Ionicons name="checkmark" size={16} color="#171717" />
              )}
            </View>
            <Text style={styles.checkboxText}>Guardar metodo de pago</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.buttonContainer, { paddingBottom: bottom }]}>
        <TouchableOpacity
          style={styles.finalizeButton}
          onPress={handleFinalizePurchase}
          activeOpacity={0.4}
        >
          <Text style={styles.finalizeButtonText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    color: "#757575",
    lineHeight: 25,
  },
  form: {
    paddingHorizontal: 20,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
    height: 88,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 20,
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#707070",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: "#171717",
    backgroundColor: "#FFFFFF",
  },
  cardNumberInput: {
    flex: 1,
    borderWidth: 0,
    marginRight: 12,
  },
  visaContainer: {
    position: "absolute",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    right: 20,
  },
  visaSeparator: {
    width: 1,
    height: "100%",
    backgroundColor: "#707070",
  },
  visaText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: "#1976D2",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#171717",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#171717",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  finalizeButton: {
    backgroundColor: "#171717",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  finalizeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: "#FFFFFF",
  },
});
