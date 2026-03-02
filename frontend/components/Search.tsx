import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Search = ({ value, onChangeText, onSearch }) => {
  return (
    <View className='flex-row items-center justify-between flex-1 p-1 my-3 bg-[#f4d2ae] border-2 border-white rounded-lg'>
      <TextInput 
      value={value}
      onChangeText={onChangeText}
       className='flex-1 text-sm' placeholder='Search ... '/>
      <Pressable onPress={onSearch}>
        <Ionicons
          size={18}
          
          name='search' />
      </Pressable>
    </View>
  )
}

export default Search