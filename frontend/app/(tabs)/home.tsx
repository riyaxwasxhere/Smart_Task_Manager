import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Search from '../../components/Search'
import Filter from '../../components/Filter'
import StatsCard from '../../components/StatsCard'
import TaskCard from '../../components/TaskCard'
import ProgressBar from '../../components/ProgressBar'
import API from '../../api/axios'


const Home = () => {
  const [tasks, setTasks] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [searchedText, setSearchedText] = useState("")
  const [selectedPriority, setSelectedPriority ] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  const fetchTasks = async () =>{
    try {
      const response = await API.get('/tasks/get-all-tasks')
      setTasks(response.data)
    }catch(error) {
      console.log(error.response?.data || error.message)
    }
  }

  useEffect(()=>{
    fetchTasks()
  },[])

  const today = new Date().toISOString().split("T")[0]
  const todayTasks = tasks.filter(
    (task) => task.createdAt.split("T")[0] === today
  )
  
  const totalCount = todayTasks.length
  const completedCount = todayTasks.filter(
    (t) => t.status === "completed"
  ).length
  const pendingCount = todayTasks.filter(
    (t) => t.status === "pending"
  ).length
    
  const progress =
    totalCount === 0
      ? 0
      : Math.round((completedCount / totalCount) * 100)
  
  const handleSearch = () => {
    setSearchedText(searchInput)
  }

  let filteredTasks = todayTasks

  if (searchedText.trim()) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(searchedText.toLowerCase())
    )
  }
  
  if (selectedPriority) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === selectedPriority
    )
  }

  if (selectedStatus) {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === selectedStatus
    )
  }
      
  return (
    <ScrollView className='bg-[#F7EFE6]'>
      <Header/>
      <View className='px-2'>
        <Text className='px-2 text-lg font-semibold '>Today</Text>
        <View className='flex-row flex-wrap gap-1 '>
            <StatsCard title="Total" count={totalCount} />
            <StatsCard title="Pending" count={pendingCount} />
            <StatsCard title="Completed" count={completedCount} />
        </View>
        
        <ProgressBar progress={progress} />
        
        <View className='flex-row items-center justify-between gap-1'>
            <Search value={searchInput} onChangeText={setSearchInput} onSearch={handleSearch} />
            <Filter
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
        </View>
        
        <View className='gap-2 bg-[#b08b77] p-2 rounded-lg'> 
          {filteredTasks.length === 0 ? (
            <Text className="text-center text-white">
              No tasks added today
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
      </View>
      
    </ScrollView>
  )
}

export default Home