import React, { useEffect, useState } from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import API from "../api/axios"
import { useLocalSearchParams } from "expo-router"

const Create = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("")
  const [error, setError] = useState("")
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const priorities = ["High", "Medium", "Low"]

  const { task } = useLocalSearchParams()
  const editingTask = task ? JSON.parse(task) : null

  const handleSubmit = async () => {
    try {
      if (!title.trim()) return setError("Title is required")
      if (!description.trim()) return setError("Description is required")
      if (!priority) return setError("Priority is required")

      if (editingTask) {
        await API.put(
          `/tasks/update-task/${editingTask._id}`,
          {
            title,
            description,
            priority: priority.toLowerCase(),
            deadline: date,
          }
        )
        alert("Task updated!")
      } else {
        await API.post("/tasks/create-task", {
          title,
          description,
          priority: priority.toLowerCase(),
          deadline: date,
        })
        alert("Task created!")
      }
      console.log(editingTask)
      console.log(editingTask?.deadline)
      setError("")
      router.back()
    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(
        editingTask.priority.charAt(0).toUpperCase() +
        editingTask.priority.slice(1)
      )
      if (editingTask.deadline) {
        const parsedDate = new Date(editingTask.deadline)

        if (!isNaN(parsedDate)) {
          setDate(parsedDate)
        }
      }
    }
    
  }, [])
    

  return (
    <View className="flex-1">
      <View className="flex-1 w-full p-5 bg-[#f4d2ae] " >
        <View className="flex-row items-center gap-2 mb-4">
          <Ionicons onPress={()=> router.back()} name="chevron-back" size={25} />
          <Text className="text-2xl font-bold text-[#2B2B2B]">
          Create Task
        </Text>

        </View>
        <View className="flex-1">
          <View className="flex-1">
            <Text className="mb-1 text-gray-700">Title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              className="bg-[#f8e9da] rounded-xl px-3 py-3 mb-2"
            />
            <Text className="mb-1 text-gray-700">Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Write description..."
              multiline
              numberOfLines={4}
              className="bg-[#f8e9da] rounded-xl px-3 py-3 mb-2 flex-1"
              textAlignVertical="top"
            />
          </View>
          
          <View>
            <Text className="mb-1 text-gray-700">Priority</Text>
            <View className="flex-row gap-2 mb-2">
              {priorities.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setPriority(item)}
                  className={`px-3 py-1 rounded-xl ${
                    priority === item
                      ? "bg-[#D97742]"
                      : "bg-[#f8e9da]"
                  }`}
                >
                  <Text
                    className={`${
                      priority === item
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
            
            <Text className="mb-1 text-gray-700">Deadline</Text>
            <Pressable
              onPress={() => setShowPicker(true)}
              className="bg-[#f8e9da] rounded-xl px-3 py-2 mb-2"
            >
              <Text className="text-gray-700">
                {date && !isNaN(date)
                ? date.toDateString()
                : "Select Date"}
              </Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="calendar"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowPicker(false)

                  if (event.type === "set" && selectedDate) {
                    setDate(selectedDate)
                  }
                }}
              />
            )}

            {error ? (
              <Text className="mb-2 text-red-500">{error}</Text>
            ) : null}
            
            <Pressable 
            onPress={handleSubmit}
            className="bg-[#D97742] py-2 rounded-xl items-center">
              <Text className="text-lg font-semibold text-white">
                {editingTask ? "Update Task" : "Create Task"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Create