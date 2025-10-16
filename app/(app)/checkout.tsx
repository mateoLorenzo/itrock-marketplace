import { Amex, ArrowBack, Card, Mastercard, Visa } from "@/components/Icon";
import { Fonts } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
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

  const [cardNameError, setCardNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expirationError, setExpirationError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardType, setCardType] = useState<
    "visa" | "mastercard" | "amex" | null
  >(null);

  const cardNameRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const expirationRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const handleBack = () => {
    router.back();
  };

  const validateCardName = (name: string): string => {
    if (!name.trim()) {
      return "Ingresa un nombre válido";
    }
    if (name.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres";
    }
    return "";
  };

  const validateCardNumber = (number: string): string => {
    if (!number.trim()) {
      return "Ingresa un número de tarjeta válido";
    }

    const cleanNumber = number.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cleanNumber)) {
      return "Ingresa un número de tarjeta válido";
    }
    return "";
  };

  const validateExpiration = (exp: string): string => {
    if (!exp.trim()) {
      return "Ingresa una fecha válida";
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      return "Ingresa una fecha válida ";
    }
    const [month, year] = exp.split("/");
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (monthNum < 1 || monthNum > 12) {
      return "El mes debe estar entre 01 y 12";
    }
    if (
      yearNum < currentYear ||
      (yearNum === currentYear && monthNum < currentMonth)
    ) {
      return "La tarjeta ha expirado";
    }
    return "";
  };

  const validateCvv = (cvvCode: string): string => {
    if (!cvvCode.trim()) {
      return "Ingresa un cvv válido";
    }
    if (!/^\d{3,4}$/.test(cvvCode)) {
      return "Ingresa un cvv válido";
    }
    return "";
  };

  const validateForm = (): boolean => {
    const cardNameValidationError = validateCardName(cardName);
    const cardNumberValidationError = validateCardNumber(cardNumber);
    const expirationValidationError = validateExpiration(expiration);
    const cvvValidationError = validateCvv(cvv);

    setCardNameError(cardNameValidationError);
    setCardNumberError(cardNumberValidationError);
    setExpirationError(expirationValidationError);
    setCvvError(cvvValidationError);

    return (
      cardNameValidationError !== "" ||
      cardNumberValidationError !== "" ||
      expirationValidationError !== "" ||
      cvvValidationError !== ""
    );
  };

  const handleFinalizePurchase = () => {
    const formHasErrors = validateForm();
    if (formHasErrors) {
      return;
    }
    Alert.alert(
      "Gracias por tu compra",
      "Tu pedido ha sido registrado con éxito, que lo disfrutes!"
    );
    router.back();
  };

  const focusCardName = () => cardNameRef.current?.focus();
  const focusCardNumber = () => cardNumberRef.current?.focus();
  const focusExpiration = () => expirationRef.current?.focus();
  const focusCvv = () => cvvRef.current?.focus();

  const onChangeCardName = (text: string) => {
    setCardName(text);
    if (cardNameError) setCardNameError("");
  };

  const detectCardType = (
    number: string
  ): "visa" | "mastercard" | "amex" | null => {
    const cleanNumber = number.replace(/\s/g, "");

    // Visa usualy starts with 4
    if (/^4/.test(cleanNumber)) {
      return "visa";
    }

    // Mastercard usually starts with 5 (51-55) or 2 (2221-2720)
    if (
      /^5[1-5]/.test(cleanNumber) ||
      /^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d{2}|7[0-1]\d|720)/.test(cleanNumber)
    ) {
      return "mastercard";
    }

    // American Express usually starts with 34 or 37
    if (/^3[47]/.test(cleanNumber)) {
      return "amex";
    }

    return null;
  };

  const formatCardNumber = (text: string): string => {
    const cleanText = text.replace(/\D/g, "");
    const limitedText = cleanText.substring(0, 16);
    return limitedText.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const onChangeCardNumber = (text: string) => {
    const formattedText = formatCardNumber(text);
    const detectedType = detectCardType(formattedText);

    setCardNumber(formattedText);
    setCardType(detectedType);

    if (cardNumberError) setCardNumberError("");
  };

  const formatExpiration = (text: string): string => {
    if (!text) return "";
    const cleanText = text.replace(/\D/g, "");

    if (!cleanText) return "";
    const limitedText = cleanText.substring(0, 4);

    // If has 2 digits, return only the digits without "/"
    if (limitedText.length === 2) {
      return limitedText;
    }

    // If has more than 2 digits, add "/" after the second digit
    if (limitedText.length > 2) {
      return limitedText.substring(0, 2) + "/" + limitedText.substring(2);
    }

    return limitedText;
  };

  const onChangeExpiration = (text: string) => {
    const formattedText = formatExpiration(text);
    setExpiration(formattedText);
    if (expirationError) setExpirationError("");
  };

  const onChangeCvv = (text: string) => {
    setCvv(text);
    if (cvvError) setCvvError("");
  };

  const renderCardIcon = () => {
    switch (cardType) {
      case "visa":
        return <Visa width={40} height={40} />;
      case "mastercard":
        return <Mastercard width={40} height={40} />;
      case "amex":
        return <Amex width={40} height={40} />;
      default:
        return (
          <View style={styles.cardContainer}>
            <Card width={30} height={30} />
          </View>
        );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: bottom + 10 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
            <TouchableOpacity
              style={[
                styles.inputGroup,
                cardNameError && styles.inputGroupError,
              ]}
              onPress={focusCardName}
              activeOpacity={1}
            >
              <Text style={styles.inputLabel}>Nombre en la tarjeta</Text>
              <TextInput
                ref={cardNameRef}
                style={styles.input}
                value={cardName}
                onChangeText={onChangeCardName}
                placeholder="Nombre completo"
              />
            </TouchableOpacity>
            {cardNameError !== "" && (
              <Text style={styles.errorText}>{cardNameError}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.inputGroup,
                cardNumberError && styles.inputGroupError,
              ]}
              onPress={focusCardNumber}
              activeOpacity={1}
            >
              <Text style={styles.inputLabel}>Número de tarjeta</Text>
              <TextInput
                ref={cardNumberRef}
                style={[styles.input, styles.cardNumberInput]}
                value={cardNumber}
                onChangeText={onChangeCardNumber}
                placeholder="0000 0000 0000 0000"
                keyboardType="numeric"
              />
              <View style={styles.cardIconContainer}>
                <View style={styles.cardIconSeparator} />
                {renderCardIcon()}
              </View>
            </TouchableOpacity>
            {cardNumberError !== "" && (
              <Text style={styles.errorText}>{cardNumberError}</Text>
            )}

            <View style={styles.rowContainer}>
              <View style={styles.halfWidth}>
                <TouchableOpacity
                  style={[
                    styles.inputGroup,
                    expirationError && styles.inputGroupError,
                  ]}
                  onPress={focusExpiration}
                  activeOpacity={1}
                >
                  <Text style={styles.inputLabel}>Vencimiento</Text>
                  <TextInput
                    ref={expirationRef}
                    style={styles.input}
                    value={expiration}
                    onChangeText={onChangeExpiration}
                    placeholder="00/00"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </TouchableOpacity>
                {expirationError !== "" && (
                  <Text style={styles.errorText}>{expirationError}</Text>
                )}
              </View>

              <View style={styles.halfWidth}>
                <TouchableOpacity
                  style={[
                    styles.inputGroup,
                    cvvError && styles.inputGroupError,
                  ]}
                  onPress={focusCvv}
                  activeOpacity={1}
                >
                  <Text style={styles.inputLabel}>Código</Text>
                  <TextInput
                    ref={cvvRef}
                    style={styles.input}
                    value={cvv}
                    onChangeText={onChangeCvv}
                    placeholder="CVV"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </TouchableOpacity>
                {cvvError !== "" && (
                  <Text style={styles.errorText}>{cvvError}</Text>
                )}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.finalizeButton}
            onPress={handleFinalizePurchase}
            activeOpacity={0.4}
          >
            <Text style={styles.finalizeButtonText}>Finalizar compra</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: bottom }} />
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
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
    marginTop: 20,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: 20,
    padding: 20,
  },
  inputGroupError: {
    borderColor: "#EF4444",
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#707070",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#171717",
    backgroundColor: "#FFFFFF",
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardNumberInput: {
    flex: 1,
    borderWidth: 0,
    marginRight: 12,
  },
  cardIconContainer: {
    position: "absolute",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    right: 20,
  },
  cardIconSeparator: {
    width: 1,
    height: "100%",
    backgroundColor: "#707070",
  },
  cardContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 15,
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
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "#EF4444",
    marginTop: 8,
  },
});
