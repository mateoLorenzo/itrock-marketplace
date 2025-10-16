import reviewsData from "@/assets/feed.json";
import { Fonts } from "@/constants/Fonts";
import { useAuth } from "@/contexts/AuthContext";
import { Review } from "@/interfaces";
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

const HomeScreen = () => {
  const router = useRouter();
  const { state, logout } = useAuth();
  const { top, bottom } = useSafeAreaInsets();
  const tabBarHeight = bottom + 80;

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
          <Text style={styles.title}>¡Te damos {"\n"}la bienvenida!</Text>
          <Text style={styles.subtitle}>
            Conocé las mejores reseñas {"\n"}de productos premium
          </Text>
        </View>
      </View>
      <View style={styles.headerSeparator} />
    </View>
  );

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${hours}:${minutes}hs`;
  };

  const renderListItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      {item.avatarUrl ? (
        <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
      ) : (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(item.fullName)}</Text>
        </View>
      )}
      <View style={styles.reviewContent}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text style={styles.date}>{formatDate(item.timestamp)}</Text>
        <Text style={styles.reviewText}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviewsData}
        ListHeaderComponent={renderListHeader}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        style={styles.reviewsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={styles.reviewSeparator} />}
        ListFooterComponent={() => (
          <View style={{ height: tabBarHeight + 30 }} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
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
  headerSeparator: {
    height: 1,
    backgroundColor: "#171717",
    opacity: 0.1,
    marginBottom: 30,
    width: Dimensions.get("window").width,
    right: 20,
  },
  reviewsContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  reviewSeparator: {
    height: 1,
    backgroundColor: "#171717",
    opacity: 0.1,
    marginVertical: 25,
  },
  reviewItem: {
    flexDirection: "row",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#F7F7F5",
  },
  avatarText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: "#E5E5E5",
  },
  reviewContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: "#171717",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: "#9E9E9E",
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#171717",
    lineHeight: 20,
  },
});
