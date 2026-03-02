import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Filter = ({
  selectedPriority,
  setSelectedPriority,
  selectedStatus,
  setSelectedStatus,
}) => {

  const [visible, setVisible] = useState(false);

  // TEMP STATES (for apply button)
  const [tempPriority, setTempPriority] = useState([]);
  const [tempStatus, setTempStatus] = useState([]);

  // open modal → copy current filters
  useEffect(() => {
    if (visible) {
      setTempPriority(selectedPriority);
      setTempStatus(selectedStatus);
    }
  }, [visible]);

  // MULTI SELECT FUNCTION
  const toggleItem = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // APPLY FILTER
  const handleApply = () => {
    setSelectedPriority(tempPriority);
    setSelectedStatus(tempStatus);
    setVisible(false);
  };

  // REMOVE FILTER
  const handleRemoveFilter = () => {
    setTempPriority([]);
    setTempStatus([]);
    setSelectedPriority([]);
    setSelectedStatus([]);
    setVisible(false);
  };

  return (
    <View>

      {/* FILTER BUTTON */}
      <Pressable
        onPress={() => setVisible(true)}
        className="bg-[#D97742] px-3 py-1 rounded-lg border-white border-2"
      >
        <Ionicons name="filter" size={18} color="white" />
      </Pressable>

      {/* MODAL */}
      <Modal transparent visible={visible} animationType="fade">

        {/* OUTSIDE CLICK AREA */}
        <Pressable
          className="items-end justify-start flex-1 pt-10 pr-3 bg-black/30"
          onPress={() => setVisible(false)}
        >

          {/* MODAL BOX */}
          <Pressable
            onPress={() => {}}
            className="bg-white w-[75%] p-4 rounded-xl absolute top-8 right-2"
          >

            <Text className="font-bold text-[15px] mb-2 border-b">
              Filter Tasks
            </Text>

            {/* PRIORITY */}
            <Text className="mb-1 font-medium">Priority</Text>

            <View className="flex-row gap-2 mb-3">
              {["high", "medium", "low"].map((item) => (
                <Pressable
                  key={item}
                  onPress={() =>
                    toggleItem(item, tempPriority, setTempPriority)
                  }
                  className={`px-3 py-1 rounded-lg ${
                    tempPriority.includes(item)
                      ? "bg-[#D97742]"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={
                      tempPriority.includes(item)
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* STATUS */}
            <Text className="mb-1 font-medium">Status</Text>

            <View className="flex-row gap-2 mb-4">
              {["pending", "completed"].map((item) => (
                <Pressable
                  key={item}
                  onPress={() =>
                    toggleItem(item, tempStatus, setTempStatus)
                  }
                  className={`px-3 py-1 rounded-lg ${
                    tempStatus.includes(item)
                      ? "bg-[#D97742]"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={
                      tempStatus.includes(item)
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* APPLY */}
            <Pressable
              onPress={handleApply}
              className="bg-[#D97742] py-2 rounded-lg items-center mb-2"
            >
              <Text className="font-semibold text-white">
                Apply
              </Text>
            </Pressable>

            {/* REMOVE FILTER */}
            <Pressable
              onPress={handleRemoveFilter}
              className="items-center py-2 bg-gray-300 rounded-lg"
            >
              <Text className="font-semibold text-black">
                Remove Filter
              </Text>
            </Pressable>

          </Pressable>

        </Pressable>
      </Modal>
    </View>
  );
};

export default Filter;