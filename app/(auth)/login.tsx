import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

import loginSchema from '../../lib/schemas/loginSchema';
import { supabase } from '../../lib/supabase';
import PrimaryButton from './../../components/PrimaryButton';
import UserInput from './../../components/UserInput';
const Logo = require('../../assets/icons/logo.png');
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true);

    try {
      const { email, password } = data;

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error.message,
        });
        return;
      }

      if (authData.user) {
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'Successfully logged in.',
        });
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: err.message || 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      className="flex-1 bg-[#121417]"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View className="px-6 pt-12 pb-10">
        {/* Navigation Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Pressable 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:opacity-70"
          >
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </Pressable>

          <Pressable className="px-4 py-2 rounded-full bg-[#05321E]">
            <Text className="text-[#00A859] text-xs font-semibold">
              Sign in as guest
            </Text>
          </Pressable>
        </View>

        {/* Brand Logo & Header Text */}
        <View className="items-center mb-8">
          <View className="mb-4">
            <Image source={Logo} style={{ width: 48, height: 48 }} resizeMode="contain" />
      </View>

          <Text className="text-white text-2xl font-bold mb-2 text-center">
            Log in to your account
          </Text>
          <Text className="text-gray-400 text-xs text-center max-w-[260px] leading-5">
            Welcome back! Enter your details below to get started.
          </Text>
        </View>

        {/* Form Inputs */}
        <View className="gap-y-4">
          {/* Email Field */}
          <View>
            <Text className="text-gray-300 text-xs font-medium mb-2">
              Email address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <UserInput
                  placeholder="godfreyajayi25@gmail.com"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.inputStyle}
                  placeholderTextColor="#6B7280"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1 font-medium">
                {errors.email.message}
              </Text>
            )}
          </View>

          {/* Password Field */}
          <View>
            <Text className="text-gray-300 text-xs font-medium mb-2">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <UserInput
                  placeholder="••••••••••••••••"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry
                  style={styles.inputStyle}
                  placeholderTextColor="#6B7280"
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1 font-medium">
                {errors.password.message}
              </Text>
            )}
          </View>

          {/* Forgot Password */}
          <Pressable className="align-self-end mt-1">
            <Text className="text-right text-[#00A859] text-xs font-semibold">
              Forgot password?
            </Text>
          </Pressable>

          {/* Primary Action Button */}
          <View className="mt-4">
            <PrimaryButton
              title={loading ? 'Continuing...' : 'Continue'}
              onPress={handleSubmit(handleLogin)}
              disabled={loading}
              style={{ backgroundColor: '#00A859', borderRadius: 9999, height: 50 }}
            />
          </View>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[0.5px] bg-gray-700/60" />
          <Text className="text-gray-400 text-xs px-3 font-normal">
            Or Sign in with
          </Text>
          <View className="flex-1 h-[0.5px] bg-gray-700/60" />
        </View>

        {/* Social Buttons Stack */}
        <View className="gap-y-3">
          <Pressable className="h-12 w-full bg-[#33383F] rounded-full flex-row items-center justify-center gap-2 active:opacity-80">
            <Ionicons name="logo-google" size={18} color="#EA4335" />
            <Text className="text-white font-semibold text-sm">Google</Text>
          </Pressable>

          <Pressable className="h-12 w-full bg-[#33383F] rounded-full flex-row items-center justify-center gap-2 active:opacity-80">
            <Ionicons name="logo-apple" size={18} color="#FFFFFF" />
            <Text className="text-white font-semibold text-sm">Apple</Text>
          </Pressable>
        </View>

        {/* Redirect to Signup */}
        <View className="mt-6">
          <Text className="text-center text-gray-400 text-xs">
            Don't have an account?{' '}
            <Text
              className="text-[#00A859] font-bold"
              onPress={() => router.push('/(auth)/signup')}
            >
              Sign Up
            </Text>
          </Text>
        </View>

        {/* Terms Footer */}
        <Text className="text-center text-gray-400 text-[11px] leading-5 mt-8 px-4">
          By signing up, You agree to HeyBite's{' '}
          <Text className="text-[#00A859] font-semibold">Terms and Conditions</Text>
          {' '}including{' '}
          <Text className="text-[#00A859] font-semibold">Privacy policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputStyle: {
    backgroundColor: '#1E2228',
    borderColor: '#2A2F37',
    borderWidth: 1,
    borderRadius: 24,
    color: '#FFFFFF',
    paddingHorizontal: 16,
    height: 48,
  },
});