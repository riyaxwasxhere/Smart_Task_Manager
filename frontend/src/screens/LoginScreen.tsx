import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


  return (
    <View className='flex-1 items-center justify-center p-4'>
      <View className='mb-8'>
        <Text className='text-3xl font-bold'>Planora</Text>
      </View>
      
      {/* <Image source={require('../assets/images/login.jpg')} resizeMode='contain'  /> */}
      
      <View className='w-full mt-8 space-y-4'>
        <View className='w-full'>
            <Text className='text-lg font-semibold ' >Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                className='border p-2 rounded'
            />
        </View>
        <View className='w-full'>
            <Text className='text-lg font-semibold'>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                className='border p-2 rounded'
            />
        </View>
        <TouchableOpacity className='bg-blue-500 p-3 rounded items-center'>
            <Text className='text-white'>Login</Text>
        </TouchableOpacity>

        <Text className='text-center text-gray-600'>
            New User? 
            <Text className='text-blue-500'>
                Sign Up
            </Text>
        </Text>
      </View>
    </View>
  )
}

export default LoginScreen
