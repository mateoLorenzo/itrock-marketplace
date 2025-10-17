import {
  HomeActive,
  HomeInactive,
  ProductsActive,
  ProductsInactive,
} from "@/components/Icon";
import { Fonts } from "@/constants/Fonts";
import { ScrollProvider, useScroll } from "@/contexts/ScrollContext";
import { BlurView } from "expo-blur";
import { Tabs, usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabLayoutContent() {
  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = 80 + bottom;
  const pathname = usePathname();
  const router = useRouter();
  const { scrollToTopRef } = useScroll();

  const handleTabPress = (routeName: string) => {
    const currentRoute = pathname.split("/").pop();

    if (currentRoute === routeName) {
      if (
        scrollToTopRef.current[routeName as keyof typeof scrollToTopRef.current]
      ) {
        scrollToTopRef.current[
          routeName as keyof typeof scrollToTopRef.current
        ]?.();
      }
    }
  };

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
              { backgroundColor: "rgba(255, 255, 255, 0.9)" },
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
      screenListeners={{
        tabPress: (e) => {
          const routeName = e.target?.split("-")[0];
          if (routeName === "home" || routeName === "products") {
            e.preventDefault();
            handleTabPress(routeName);
            router.push(`/(app)/(tabs)/${routeName}`);
          }
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Feed",
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
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <ScrollProvider>
      <TabLayoutContent />
    </ScrollProvider>
  );
}
