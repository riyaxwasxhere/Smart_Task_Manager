import React from "react";
import { View } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  return (
    <View className="bg-[#f4d2ae] rounded-2xl p-3 mb-4">

      <RNCalendar
        current={selectedDate || new Date().toISOString().split("T")[0]}
  onDayPress={(day) => {
    setSelectedDate(day.dateString);
  }}
        
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#D97742",
          },
        }}
        theme={{
          calendarBackground: "#f4d2ae",
          monthTextColor: "#000",
          dayTextColor: "#000",
          textDisabledColor: "#64748b",
          todayTextColor: "#D97742",
          arrowColor: "#000",
          textSectionTitleColor: "#000",
          selectedDayBackgroundColor: "#D97742",
          selectedDayTextColor: "#fff",
        }}
      />

    </View>
  );
};

export default Calendar;