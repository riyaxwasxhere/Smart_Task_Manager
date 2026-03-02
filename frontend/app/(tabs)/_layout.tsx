import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  const pathname = usePathname();
  const showBtn = !pathname.includes("profile");

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#5865F2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            paddingBottom: 6,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="tasks"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-done" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {showBtn && (
        <TouchableOpacity
          onPress={() => router.push("/create")}
          className="absolute bottom-16 right-5 bg-[#5865F2] w-12 h-12 rounded-full justify-center items-center shadow-lg"
        >
          <Text className="text-3xl text-white">+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TabLayout;