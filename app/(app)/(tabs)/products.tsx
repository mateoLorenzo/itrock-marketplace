import { Fonts } from "@/constants/Fonts";
import { useAuth } from "@/contexts/AuthContext";
import { mockProducts } from "@/data/mockData";
import { Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProductsScreen = () => {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { top, bottom } = useSafeAreaInsets();
  const tabBarHeight = bottom + 80;

  const onProductPress = () => {
    router.push("/checkout");
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const renderListHeader = () => (
    <View style={{ paddingTop: top + 40 }}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userEmail}>{state.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            style={styles.logoutIcon}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.header]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lo último {"\n"}en tecnología</Text>
          <Text style={styles.subtitle}>
            Perifericos unicos, al mejor {"\n"}precio del mercado
          </Text>
        </View>
      </View>
      <View style={styles.headerSeparator} />
    </View>
  );

  const renderListItem = ({ item }: { item: Product }) => (
    <View style={styles.productCardContainer}>
      <TouchableOpacity style={styles.productCard} onPress={onProductPress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        </View>
      </TouchableOpacity>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockProducts}
        ListHeaderComponent={renderListHeader}
        renderItem={renderListItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productsContainer}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={() => (
          <View style={{ height: tabBarHeight + 30 }} />
        )}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    // paddingBottom: 30,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userEmail: {
    fontFamily: Fonts.regular,
    color: "#000000",
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#EF4444",
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
  logoutIcon: {
    transform: [{ rotate: "180deg" }],
    marginRight: 2,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
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
  headerSeparator: {
    width: Dimensions.get("window").width,
    right: 20,
    height: 1,
    backgroundColor: "#312c2c",
    opacity: 0.1,
    marginTop: 20,
    marginBottom: 30,
  },
  productsContainer: {
    paddingHorizontal: 20,
  },
  row: {
    gap: 15,
  },
  itemSeparator: {
    height: 30,
  },
  productCardContainer: {
    flex: 1,
  },
  productCard: {
    backgroundColor: "#F7F7F5",
    borderRadius: 20,
    marginBottom: 15,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: "#171717",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: "#171717",
  },
  listFooter: {
    height: 30,
  },
});
