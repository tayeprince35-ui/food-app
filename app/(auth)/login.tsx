import loginSchema from '@/lib/schemas/loginSchema';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import z from 'zod';

import PrimaryButton from './../../components/PrimaryButton';
import UserInput from './../../components/UserInput';
type LoginFormData = z.infer<typeof loginSchema>;
export default function Login() {
  const handleLogin = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
        return;
      }

      const user = authData.user;
      console.log(user);

      if (!user) {
        console.log('User was not found.');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not found',
        });
        return;
      }

      router.replace('/(tabs)');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error, Something went wrong',
        text2: error.message || 'An unexpected error occurred', // ✅ Fixed line
      });
    } finally {
      //Loading logic here later
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <View style={styles.container} className="bg-stone-900 w-full">
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/736x/3a/1b/b2/3a1bb2c5a7bcd8820ec747fb957a500a.jpg',
        }}
        resizeMode="cover"
        className="h-64 w-full ">
        <View className=" flex justify-center h-full ">
          <Text
            className="text-center text-white text-3xl font-semibold "
            style={{ fontFamily: 'Poppins_600SemiBold' }}>
            Log In
          </Text>
          <Text
            className="text-center text-gray-100 text-base font-normal mt-2"
            style={{ fontFamily: 'Poppins_400Regular' }}>
            Please sign in to your existing account
          </Text>
        </View>
      </ImageBackground>

      <View className="bg-white flex-1 w-full rounded-t-3xl -mt-6 px-6 pt-8 pb-6">
        {/* Email */}
        <View className="mb-5">
          <Text className="text-gray-600 text-xs font-semibold tracking-wide mb-2">
            EMAIL
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <UserInput
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
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
        </View>

        {/* Login Button */}
        <View className="mt-2">
          <PrimaryButton title="Login" onPress={handleSubmit(handleLogin)} />
        </View>

        {/* Sign up link */}
        <View className="mt-6">
          <Text className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Text
              className="text-orange-500 font-semibold"
              onPress={() => router.push('/(auth)/signup')}>
              Sign up
            </Text>
          </Text>
        </View>

        <View className="flex-row items-center mt-8 mb-4">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="text-gray-400 text-xs px-3">or</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <View className="items-center justify-center flex flex-row gap-8">
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png',
            }}
            className="w-10 h-10"
          />
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/281/281764.png',
            }}
            className="w-10 h-10"
          />
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/3670/3670151.png',
            }}
            className="w-10 h-10"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
