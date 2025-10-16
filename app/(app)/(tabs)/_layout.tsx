import {
  HomeActive,
  HomeInactive,
  ProductsActive,
  ProductsInactive,
} from "@/components/Icon";
import { Fonts } from "@/constants/Fonts";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#171717",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          minHeight: 75 + bottom,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
          paddingBottom: 20,
          borderTopWidth: 1,
          borderTopColor: "#00000010",
        },
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
          tabBarIcon: ({ focused }) =>
            focused ? <HomeActive /> : <HomeInactive />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
          tabBarIcon: ({ focused }) =>
            focused ? <ProductsActive /> : <ProductsInactive />,
        }}
      />
    </Tabs>
  );
}
