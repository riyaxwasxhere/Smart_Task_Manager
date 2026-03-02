import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from "expo-font";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

const Header = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  })
  
  if (!fontsLoaded) return null;

  return (
    <>
      <View className='flex-row items-center justify-between px-4 pt-6 pb-3 '> 
        <View>
          <View className='flex-row'>
            <Text 
            style={{
              fontFamily: "Nunito_700Bold"
            }}
            className='text-xl text-[#0F172A]'>Hello, User</Text>
            
          </View>
          <Text 
          className='text-sm text-[#64748B]'
          style={{
              fontFamily: "Nunito_400Regular"
            }}
          >Let's make today productive.</Text>
        </View>
        <View className='flex-row items-center justify-between gap-2'>
          <Ionicons 
          name='notifications' 
          style={{
            color: "#f4692e"
          }}
          size={22}
          />
        </View>
      </View>
    </>
  )
}

export default Header