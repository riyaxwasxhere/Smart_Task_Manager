import { Text, View, Image, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { router } from "expo-router";
import { useState } from "react";
import API from '../../api/axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Pacifico_400Regular,
  });
  if (!fontsLoaded) return null;
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleSignUp =() =>{
    router.replace('/(auth)/signup')
  }

  const handleSignIn = async () => {
    setLoading(true)
    try{
      if(!email.trim()) {
        setError("Email is required")
        return
      }
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(email)){
        setError("Enter valid email")
        return
      }
      if(!password.trim()){
        setError("Password is required")
        return
      }

      const response = await API.post("/auth/login",{
        email,
        password
      })

      await AsyncStorage.setItem("token", response.data.token);

      const token = await AsyncStorage.getItem("token");
console.log("TOKEN SAVED:", token);
      
      console.log('Sign in successful: ',response.data)
      setError("")
      router.navigate("/home")
    }catch(error){
      console.log(error.response?.data || error.message)
    } finally {
      setLoading(false);
    }
  }
    
  return (
    <View className="bg-[#FBE1CA] flex-1 p-5 items-center justify-center">
      <View className=" w-[90%] h-[90%]">
        <View className="items-center justify-center w-full">
          
          <Text 
            className="text-[28px] mb-4 text-[#D85D3E]"
            style={{ fontFamily: "Pacifico_400Regular" }}>
            Planora
          </Text>

          <Image source={require('../../assets/images/3926247.jpg')}
            style={{width: "100%", height: 180 }}
            resizeMode="cover"
          />
          
        </View>
        
        <View className="flex-1 px-6 pt-8 ">
          
          <View>
            <Text style={{ fontFamily: "Poppins_400Regular" }}>Email</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg" >
              <Ionicons name="mail-outline" size={16} color="gray" />
              <TextInput
              value={email}
              onChangeText={setEmail}
              className="flex-1 ml-1"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Email Address"
              style={{ outlineStyle: "none" }}
              />
            </View>
          </View>
          
          <View>
            <Text style={{ fontFamily: "Poppins_400Regular"}}>Password</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg">
              <Ionicons name="lock-closed-outline" size={16} color="gray" />
              <TextInput 
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              className="flex-1 ml-1"
              style={{ outlineStyle: "none" }}
              />
              
              <Pressable onPress={()=> setShowPassword(!showPassword)}>
                <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="gray"
                />
              </Pressable>
            </View>
            {error ? (
              <Text className="mt-1 text-red-600">{error}</Text>
            ) : null}
          </View>
          
          <Pressable
            onPress = {handleSignIn}
            className="mt-5 mb-4 bg-[#D85D3E] w-full rounded-2xl flex-row justify-center items-center p-1">
              <Text 
                className="text-lg text-white" 
                style={{ fontFamily: "Poppins_600SemiBold" }}>
                  Sign In 
              </Text>
          </Pressable>
          <Text style={{ fontFamily: "Poppins_600SemiBold" }}>Don't have an account? 
            <Pressable onPress={handleSignUp}>
              <Text className="text-[#b33b1d] mx-1">Sign Up</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SignInScreen