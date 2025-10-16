import {
  HomeActive,
  HomeInactive,
  ProductsActive,
  ProductsInactive,
} from "@/components/Icon";
import { Fonts } from "@/constants/Fonts";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = 80 + bottom;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#171717",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          minHeight: tabBarHeight,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
          paddingBottom: 20,
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          position: "absolute",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={6}
            tint="light"
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(255, 255, 255, 0.75)" },
            ]}
          />
        ),
        tabBarLabelStyle: {
          fontFamily: Fonts.regular,
          fontSize: 12,
          marginTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarLabel: ({ focused, children }) => (
            <Text
              style={{
                fontFamily: focused ? Fonts.medium : Fonts.regular,
                fontSize: 12,
                marginTop: 10,
                color: "#171717",
              }}
            >
              {children}
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? <HomeActive /> : <HomeInactive />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
          tabBarLabel: ({ focused, children }) => (
            <Text
              style={{
                fontFamily: focused ? Fonts.medium : Fonts.regular,
                fontSize: 12,
                marginTop: 10,
                color: "#171717",
              }}
            >
              {children}
            </Text>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? <ProductsActive /> : <ProductsInactive />,
        }}
      />
    </Tabs>
  );
}
