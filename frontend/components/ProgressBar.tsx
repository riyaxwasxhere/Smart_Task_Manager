import { View, Text } from "react-native"

type Props = {
  progress: number
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <View className="w-full mt-2">  
    <Text className="my-1">Your progress</Text>    
      <View className="relative justify-center w-full h-6 overflow-hidden bg-[#f4d2ae] rounded-full">
        <Text className="absolute z-10 p-1 px-2 text-sm font-semibold">{progress}%</Text>
        <View
          className="h-[85%] mx-0.5 bg-[#D97742] rounded-full py-1"
          style={{ width: `${progress}%` }}
        />
      </View>

    </View>
  )
}

export default ProgressBar