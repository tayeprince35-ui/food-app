import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 overflow-hidden bg-[#F97316]">
      {/* Background decoration */}
      <View className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-orange-400" />
      <View className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#C2410C]" />

      <View className="absolute left-10 top-32 h-3 w-3 rounded-full bg-orange-200" />
      <View className="absolute right-12 top-1/3 h-5 w-5 rounded-full bg-orange-300" />

      {/* Main content */}
      <View className="flex-1 items-center justify-center">
        <View className="items-center">
          <View className="h-44 w-44 items-center justify-center rounded-[45px] bg-white shadow-2xl elevation-lg">
            <Image
              source={require('../assets/images/logo.png')}
              className="h-32 w-32"
              resizeMode="contain"
            />
          </View>

          <Text className="mt-8 text-5xl font-extrabold text-white">
            Foodie
          </Text>

          <View className="mt-4 h-1 w-12 rounded-full bg-white" />

          <Text className="mt-5 text-base font-medium text-orange-50">
            Delicious meals
          </Text>

          <Text className="text-base font-medium text-orange-100">
            delivered straight to you
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <Text className="text-xs font-semibold uppercase tracking-[3px] text-orange-100">
          Made with love
        </Text>

        <Text className="mt-2 text-lg text-white">♥</Text>
      </View>
    </View>
  );
}
