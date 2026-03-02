import { Text, View, Image, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { router } from "expo-router";
import { useState } from "react";
import API from '../../api/axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = () => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Pacifico_400Regular,
  });
  if (!fontsLoaded) return null;
  
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleSignIn = () => {
    router.replace("/(auth)/signin")
  }
  
  const handleSignUp = async () => {
    setLoading(true)
    try{
      if (!fullName.trim()) {
        setError("Full name is required")
        return
      }

      if (!email.trim()) {
        setError("Email is required")
        return
      }
    
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(email)) {
        setError("Enter valid email")
        return
      }
      if (!password.trim()) {
        setError("Password is required")
        return
      }
        
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
        
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      const response = await API.post('/auth/register',{
        fullName,
        email,
        password
      })
      
      await AsyncStorage.setItem("token", response.data.token)
      console.log(response.data.token)
      const token = await AsyncStorage.getItem("token");
      console.log("TOKEN SAVED:", token);
      
      console.log('Sign in successful: ',response.data)
      setError("")
      router.navigate("/home")
    }catch(error){
      console.log(error.response?.data || error.message)
    }finally{
      setLoading(false)
    }
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
              <Ionicons name="mail-outline" size={16} color="gray" />
              <TextInput
              value={fullName}
              onChangeText ={setFullName}
              className ="flex-1 ml-1"
              placeholder="Your Name"/>
            </View>
          </View>
          
          <View className="mb-1">
            <Text style={{ fontFamily: "Poppins_400Regular" }}>Email</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg" >
              <Ionicons name="mail-outline" size={16} color="gray" />
              <TextInput 
              value={email}
              onChangeText ={setEmail}
              autoCapitalize="none"
              className ="flex-1 ml-1"
              placeholder="Email Address"/>
            </View>
          </View>
          
          <View>
            <Text style={{ fontFamily: "Poppins_400Regular"}}> Password</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg">
              <Ionicons name="lock-closed-outline" size={16} color="gray" />
              <TextInput 
              value={password}
              onChangeText ={setPassword}
              secureTextEntry={!showPassword}
              className ="flex-1 ml-1"
              placeholder="Password"/>
              <Pressable onPress={()=> setShowPassword(!showPassword)}>
                <Ionicons 
                name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={20}
                color="gray"
                />
              </Pressable>
            </View>
          </View>
          
          <View className="mb-1">
            <Text style={{ fontFamily: "Poppins_400Regular"}}>Confirm Password</Text>
            <View className="flex-row justify-center px-2 py-1 my-1 bg-white rounded-lg shadow-lg">
              <Ionicons name="lock-closed-outline" size={16} color="gray"/>
              <TextInput 
                placeholder="Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                className="flex-1 ml-1"
              />
              <Pressable onPress={()=> setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={20}
                color="gray"
                />
              </Pressable>
            </View>
          </View>

          {error ? (
            <Text className="mt-1 text-red-600">{error}</Text>
          ) : null}
          
          <Pressable            
            className="my-3 bg-[#D85D3E] w-full rounded-2xl flex-row justify-center items-center p-1">
              <Text 
                onPress={handleSignUp}
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