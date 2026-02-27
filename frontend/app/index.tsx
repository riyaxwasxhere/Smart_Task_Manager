import { Text, View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { router } from "expo-router";

export default function Index() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Pacifico_400Regular,
  });
  if (!fontsLoaded) return null;

  const handleGetStarted =() =>{
    router.replace('/(auth)/signin')
  }
  

  return (
    <View className="bg-[#FCEADE] flex-1 p-5 items-center justify-center">
      <View className=" w-[90%] h-[90%]">
        <View className="items-center justify-center w-full">
          <Text 
            className="text-[28px] mb-4 text-[#D85D3E]"
            style={{ fontFamily: "Pacifico_400Regular" }}>
            Planora
          </Text>

          <Image source={require('../assets/images/istockphoto-1345182424-612x612.jpg')}
            style={{width: "100%", height: 180 }}
            resizeMode="cover"
          />
        </View>
        
        <View className="items-center flex-1 px-6 pt-8">
          <Text className="text-xl text-center text-black" style={{ fontFamily: "Poppins_700Bold" }}>Plan Smart. </Text>
          <Text className="mb-4 text-xl text-center text-black" style={{ fontFamily: "Poppins_700Bold" }}>Work Better.</Text>
          <Text 
            className="mb-8 text-sm text-center text-gray-600"
            style={{ fontFamily: "Poppins_400Regular" }}>
              Planora makes task planning simple and efficient. Stay organized and get more done every day.
          </Text>
          <Pressable
            onPress={handleGetStarted}
            className="bg-[#D85D3E] w-full rounded-2xl flex-row justify-center items-center p-2 ">
            <Text className="text-lg text-white" style={{ fontFamily: "Poppins_600SemiBold" }}>Let's Get Started </Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

