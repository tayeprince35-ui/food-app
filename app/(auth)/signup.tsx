import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from "react-native-toast-message";
import { z } from "zod";
import signupSchema from '../../lib/schemas/signupSchema';
import { supabase } from "../../lib/supabase";
import PrimaryButton from './../../components/PrimaryButton';
import UserInput from './../../components/UserInput';
type SignupFormData = z.infer<typeof signupSchema>;
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState:{errors}} = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
     username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

const handleSignUp = async (data: SignupFormData) => {
  
  

  setLoading(true);
  
   try {
  const {username, email, password, confirmPassword } = data;


  const { data:authData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
  Toast.show({
    type: "error",
    text1: "Sign Up Failed",
    text2: error.message,
  });
  return;
}
  

  const user = authData.user;
console.log(user)
  if (!user) {
    console.log("User was not created.");
    return;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
     username,
    });

  if (profileError) {
    console.log("Profile Error:", profileError.message);
    return;
  }

Toast.show({
  type: "success",
  text1: "Success",
  text2: "Account created successfully!",
});
  router.replace('/(tabs)');}
 finally {
    setLoading(false);
  }
};
  return (
    <ScrollView style={styles.container} className="bg-stone-900 w-full">

      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/56/bc/6b/56bc6b2f4da849b6988a3ceb3ff6d48c.jpg' }}
        resizeMode="cover"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 480 }}
      >
        <View className="flex justify-center h-64">
          <Text
            className="text-center text-white text-3xl font-semibold"
            style={{ fontFamily: 'Poppins_600SemiBold' }}
          >
            Sign up NOw
          </Text>
          <Text
            className="text-center text-gray-100 text-base font-normal mt-2"
            style={{ fontFamily: 'Poppins_400Regular' }}
          >
            To get Started
          </Text>
        </View>
      </ImageBackground>


      <View
        style={{ borderTopRightRadius: 230, marginTop: 232 }}
        className="bg-white flex-1 w-full px-6 pt-8 pb-6"
      >
       
        <View className="mb-5 w-4/5">
          <Text className="text-gray-600 text-xs font-semibold tracking-wide mb-2">
            NAME
          </Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
    <UserInput
      placeholder="Name e.g John Doe"
     onBlur={onBlur}
      value={value}
         
      onChangeText={onChange}
    />
  )}
/>
 {errors.username && (
    <Text className="text-red-500 text-xs mt-1">
      {errors.username.message}
    </Text>
  )}
        </View>

        {/* Password */}
        <View className="mb-6">
          <Text className="text-gray-600 text-xs font-semibold tracking-wide mb-2">
            PASSWORD
          </Text>
           <Controller
            control={control}
           
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
    <UserInput
      placeholder="Password"
     onBlur={onBlur}
      value={value}
         secureTextEntry
         
      onChangeText={onChange}
    />
  )}
/>
 {errors.password && (
    <Text className="text-red-500 text-xs mt-1">
      {errors.password.message}
    </Text>
  )}
        </View>
        <View className="mb-6">
          <Text className="text-gray-600 text-xs font-semibold tracking-wide mb-2">
            EMAIL
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <UserInput
                placeholder="Enter your email"
              
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
           {errors.email && (
    <Text className="text-red-500 text-xs mt-1">
      {errors.email.message}
    </Text>
  )}
        </View>
        <View className="mb-6">
          <Text className="text-gray-600 text-xs font-semibold tracking-wide mb-2">
            CONFIRM PASSWORD
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <UserInput
                placeholder="Confirm your password"
               onBlur={onBlur}
                secureTextEntry
                value={value}
               
                onChangeText={onChange}
              />
            )}
          />
           {errors.confirmPassword && (
    <Text className="text-red-500 text-xs mt-1">
      {errors.confirmPassword.message}
    </Text>
  )}
        </View>

          
        </View>

        
        <View className="mt-2">
         <PrimaryButton
  title={loading ? "Creating Account..." : "Sign Up"}
  // disabled={loading}
  onPress={handleSubmit(handleSignUp)}
/>  </View>

   <View className="mt-6">
            <Text className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Text
                className="text-orange-500 font-semibold"
                onPress={() => router.push('/(auth)/login')}
              >
               Log in
              </Text>
            </Text>
          </View>

        <View className="flex-row items-center mt-8 mb-4">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="text-gray-400 text-xs px-3">or</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
          
        </View>
         <View className="items-center justify-center flex flex-row gap-8">
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png'   }} className="w-10 h-10" />
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/281/281764.png'   }} className="w-10 h-10" />
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3670/3670151.png'   }} className="w-10 h-10" />
            </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});