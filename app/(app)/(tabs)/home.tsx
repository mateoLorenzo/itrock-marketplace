import { Fonts } from "@/constants/Fonts";
import { mockReviews } from "@/data/mockData";
import { Review } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const tabBarHeight = bottom + 80;

  const handleLogout = () => {
    console.log("Logout pressed");
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.initials}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.reviewText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: top + 40 }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>¡Te damos {"\n"}la bienvenida!</Text>
          <Text style={styles.subtitle}>
            Conocé las mejores reseñas {"\n"}de productos premium
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            style={styles.logoutIcon}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.headerSeparator} />

      <FlatList
        data={mockReviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id.toString()}
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
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    width: "100%",
    height: 1,
    backgroundColor: "#171717",
    opacity: 0.1,
  },
  reviewsContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
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
