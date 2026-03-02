import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const days = [
  { day: "Mon", date: 11 },
  { day: "Tue", date: 12 },
  { day: "Wed", date: 13 },
  { day: "Thu", date: 14 },
  { day: "Fri", date: 15 },
  { day: "Sat", date: 16 },
  { day: "Sun", date: 17 },
];

// Different tasks for different dates
const taskData: any = {
  11: [
    { title: "Wireframing", time: "12:00 PM", done: true, color: "#E95B7A" },
    { title: "UI Design", time: "1:30 PM", done: false, color: "#EEF0FF" },
  ],
  12: [
    { title: "Prototyping", time: "3:00 PM", done: false, color: "#FFF6DD" },
  ],
  13: [
    { title: "Usability Testing", time: "3:45 PM", done: true, color: "#EFFFF6" },
  ],
  14: [
    { title: "Meeting", time: "4:30 PM", done: false, color: "#FFEFF2" },
  ],
};

const Tasks = () => {
  const [selectedDate, setSelectedDate] = useState(14);

  const tasks = taskData[selectedDate] || [];

  return (
    <View className="flex-1 bg-[#F3F3F3] px-3 pt-10">

      {/* Selected Date Title */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-[#2B2B2B]">
        11-Feb-2026
        </Text>
        <Ionicons name="calendar-outline" size={20} />
      </View>

      {/* Week Days */}
      <View className="flex-row justify-between mb-5">
        {days.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedDate(item.date)}
            className="items-center"
          >
            <Text className="text-[11px] text-gray-500">{item.day}</Text>

            <View
              className={`mt-1 px-2 py-1 rounded-lg ${
                selectedDate === item.date
                  ? "bg-[#5865F2]"
                  : "bg-transparent"
              }`}
            >
              <Text
                className={`text-[12px] font-bold ${
                  selectedDate === item.date
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timeline */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {tasks.map((item: any, index: number) => (
          <View key={index} className="flex-row mb-4">

            {/* Timeline */}
            <View className="items-center mr-3">
              <View
                className={`w-3 h-3 rounded-full border-2 border-pink-400 ${
                  item.done ? "bg-pink-400" : "bg-white"
                }`}
              />
              <View className="w-[2px] h-full bg-pink-300" />
            </View>

            {/* Task Card */}
            <View
              style={{ backgroundColor: item.color }}
              className="flex-1 p-3 rounded-2xl"
            >
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#2B2B2B]">
                  {item.title}
                </Text>
                <Text className="text-[11px] text-gray-600">
                  {item.time}
                </Text>
              </View>
            </View>

          </View>
        ))}

        {tasks.length === 0 && (
          <Text className="mt-10 text-center text-gray-500">
            No tasks for this date
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Tasks;