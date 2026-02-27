import { Text, View, Image, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { router } from "expo-router";

const SignUpScreen = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Pacifico_400Regular,
  });
  if (!fontsLoaded) return null;
  
  const handleSignIn =() =>{
    router.replace('/(auth)/signin')
  }
    
  return (
    <View className="bg-[#F2E5DC] flex-1 p-5 items-center justify-center">
      <View className=" w-[90%] h-[90%]">
        <View className="items-center justify-center w-full">
          <Text 
            className="text-[28px] mb-4 text-[#D85D3E]"
            style={{ fontFamily: "Pacifico_400Regular" }}>
            Planora
          </Text>

          <Image source={require('../../assets/images/4903406.jpg')}
            style={{width: "100%", height: 140 }}
            resizeMode="cover"
          />
        </View>
        
        <View className="flex-1 px-6 pt-8 ">
          <View className="mb-1">
            <Text style={{ fontFamily: "Poppins_400Regular" }}>Full Name</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg" >
              <Ionicons name="mail-outline" size={16} className="mx-1 text-gray-500" />
              <TextInput placeholder="Your Name"/>
            </View>
          </View>
          <View className="mb-1">
            <Text style={{ fontFamily: "Poppins_400Regular" }}>Email</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg" >
              <Ionicons name="mail-outline" size={16} className="mx-1 text-gray-500" />
              <TextInput placeholder="Email Address"/>
            </View>
          </View>
          <View className="mb-1">
            <Text style={{ fontFamily: "Poppins_400Regular"}}>Password</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg">
              <Ionicons name="lock-closed-outline" size={16} className="mx-1 text-gray-500"/>
              <TextInput placeholder="Password" />
            </View>
          </View>
          <View>
            <Text style={{ fontFamily: "Poppins_400Regular"}}>Confirm Password</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg">
              <Ionicons name="lock-closed-outline" size={16} className="mx-1 text-gray-500"/>
              <TextInput placeholder="Password"/>
            </View>
          </View>
          <Pressable
            
            className="my-3 bg-[#D85D3E] w-full rounded-2xl flex-row justify-center items-center p-1">
              <Text 
                className="text-lg text-white" 
                style={{ fontFamily: "Poppins_600SemiBold" }}>
                  Sign Up
              </Text>
          </Pressable>
          <Text style={{ fontFamily: "Poppins_600SemiBold" }}>Already have an account? 
            <Pressable onPress={handleSignIn}>
              <Text className="text-[#b33b1d] mx-1">Sign In</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SignUpScreen