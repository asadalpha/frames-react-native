import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "black", // Dark background
           borderTopWidth: 0, // Border width
          position: "absolute",
          bottom: 0,
          elevation: 0,
          height: 40,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="bookmark"
              size={size}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="add-circle"
              size={size}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="heart"
              size={size}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="person-circle"
              size={size}
              color={focused ? COLORS.primary : COLORS.grey}
            />
          ),
        }}
      />
    </Tabs>
  );
}
