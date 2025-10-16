import { Fonts } from "@/constants/Fonts";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
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
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();

  const products = data?.pages.flatMap((page) => page) ?? [];

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
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Explorá las
            {"\n"}últimas tendencias
          </Text>
          <Text style={styles.subtitle}>
            Estilo unico y calidad, al mejor {"\n"}precio del mercado
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
          <Image
            source={{ uri: item?.images?.[0] }}
            resizeMode="cover"
            style={styles.productImage}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.productName} numberOfLines={2}>
        {item?.title}
      </Text>
      <Text style={styles.productPrice}>${item?.price?.toFixed(2)}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) {
      return <View style={{ height: tabBarHeight + 30 }} />;
    }

    return (
      <View style={{ ...styles.footerLoader, marginBottom: tabBarHeight }}>
        <ActivityIndicator size="small" color="#171717" />
        <Text style={styles.footerLoaderText}>Cargando más productos...</Text>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#171717" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Ionicons name="warning-outline" size={48} color="#EF4444" />
          <Text style={styles.errorText}>Error al cargar productos</Text>
          <Text style={styles.errorSubtext}>Por favor, intenta nuevamente</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        ListHeaderComponent={renderListHeader}
        renderItem={renderListItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productsContainer}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#757575",
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: "#171717",
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#757575",
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
    height: 160,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productName: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: "#171717",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#171717",
  },
  listFooter: {
    height: 30,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerLoaderText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#757575",
  },
});
