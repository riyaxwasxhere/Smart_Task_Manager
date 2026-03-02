import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import Calendar from "../../components/Calendar";
import Search from "../../components/Search";
import Filter from "../../components/Filter";
import TaskCard from "../../components/TaskCard";
import API from "../../api/axios";
import { useFocusEffect } from "@react-navigation/native";


const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [searchInput, setSearchInput] = useState("");
  const [searchedText, setSearchedText] = useState("");

  const [selectedPriority, setSelectedPriority] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(
        `/tasks/get-all-tasks?date=${selectedDate}`
      );

      setTasks(res.data || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [selectedDate])
  );
  const handleSearch = () => {
    setSearchedText(searchInput);
  };

  let filteredTasks = tasks;

  if (searchedText.trim()) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title
        ?.toLowerCase()
        .includes(searchedText.toLowerCase())
    );
  }

  if (selectedPriority.length > 0) {
    filteredTasks = filteredTasks.filter((task) =>
      selectedPriority.includes(task.priority)
    );
  }

  if (selectedStatus.length > 0) {
    filteredTasks = filteredTasks.filter((task) =>
      selectedStatus.includes(task.status)
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#F7EFE6] px-3 pt-10">
      
      <Text className="mb-2 text-lg font-semibold">
        View all Tasks
      </Text>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <View className="flex-row items-center justify-between gap-1 mt-2">
        <Search
          value={searchInput}
          onChangeText={setSearchInput}
          onSearch={handleSearch}
        />

        <Filter
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </View>

      <View className="gap-2 bg-[#b08b77] p-2 rounded-lg mt-3 mb-20">
        {filteredTasks.length === 0 ? (
          <Text className="text-center text-white">
            No tasks found
          </Text>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={fetchTasks}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Tasks;