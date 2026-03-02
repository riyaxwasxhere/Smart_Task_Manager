import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Tabs, usePathname } from 'expo-router'
import TabsScreen from 'react-native-screens/lib/typescript/components/tabs/TabsScreen'

const TabLayout = () => {
  const pathname = usePathname();
  const showBtn = !pathname.includes("profile");
  return (
    <View className='flex-1'>
      <Tabs screenOptions={{
        headerShown: false
      }}>
      </Tabs>
      {showBtn && (
          <TouchableOpacity
            onPress={() => router.push("/create")}
            className="absolute bottom-16 right-5 bg-[#5865F2] w-12 h-12 rounded-full justify-center items-center  shadow-lg"
          >
            <Text className="text-3xl text-white ">+</Text>
          </TouchableOpacity>
        )}
    </View>
  )
}

export default TabLayout