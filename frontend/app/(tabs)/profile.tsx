import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#F7EFE6] p-4">

      <Text className="px-3 mb-6 text-2xl font-bold">
        Profile
      </Text>

      <View className="bg-[#fbbf84] rounded-2xl p-4 mb-6 flex-1">

        <View className="items-center mb-4">
          <View className="w-16 h-16 rounded-full p-5 bg-[#D97742] items-center justify-center">
            <Ionicons name="person" size={28} color="white" />
          </View>
        </View>

        <View className="px-2 py-3 mb-3 bg-white rounded-lg shadow-lg">
          <Text>Personal Details</Text>
        </View>
        <View className="px-2 py-3 mb-3 bg-white rounded-lg shadow-lg">
          <Text>Theme</Text>
        </View>
        <View className="px-2 py-3 mb-3 bg-white rounded-lg shadow-lg">
          <Text>Settings</Text>
        </View>
        <View className="px-2 py-3 mb-3 bg-white rounded-lg shadow-lg">
          <Text>Change Password</Text>
        </View>
      </View>

      <Pressable
        onPress={handleLogout}
        className="bg-[#D97742] py-3 rounded-xl flex-row justify-center items-center gap-2"
      >
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text className="text-lg font-semibold text-white">
          Logout
        </Text>
      </Pressable>

    </View>
  );
};

export default Profile;