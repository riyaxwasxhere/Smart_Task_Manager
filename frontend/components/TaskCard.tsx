import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import API from '../api/axios'

const TaskCard = ({ task, onUpdate }) => {
    const handleComplete = async () => {
        try {
            await API.put(`/tasks/update-task/${task._id}`, {
            status: 
                task.status === "completed"
                ? "pending"
                : "completed",
            })
            onUpdate()
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    
  return (
    <View className='flex-row items-center justify-between w-full h-10 gap-1 px-2 rounded-lg bg-[#5E2E14]'>
        
        <View className='flex-row'>
            
            <Pressable onPress={handleComplete}>
                <Ionicons
                    name={
                        task.status === "completed"
                        ? "checkmark-circle"
                        : "ellipse-outline"
                    }
                    size={20} 
                    color="white" 
                />
            </Pressable>
            
            <Text 
            onPress={handleComplete}
            className={
                task.status === "completed"
                ? "text-gray-300 line-through"
                : "text-white"
            }
            >{task.title}</Text>
        </View>
        <View className='flex-row gap-2'>
            <Ionicons name='create-outline' size={20} color="white" />
            <Ionicons name='trash-bin-outline' size={20} color="white" />
        </View>
    </View>
  )
}

export default TaskCard