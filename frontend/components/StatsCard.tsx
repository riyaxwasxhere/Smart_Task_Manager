import { View, Text } from 'react-native'
import React from 'react'

const StatsCard = ({ title, count}) => {
  const colors ={
    Total : "bg-[#bdb3f5]",
    Pending: "bg-[#b2e6ea]",
    Completed: "bg-[#b0f2c7]"
  }
  const bgColor = colors[title] || "bg-gray-500"
  
  return (
    <View 
    className={`w-[32.3%] py-3 px-2 flex-row justify-between ${bgColor} rounded-lg text-lg shadow-lg`}>
      <Text className="">{title}</Text>
      <Text className=''>{count}</Text>
    </View>
  )
}

export default StatsCard