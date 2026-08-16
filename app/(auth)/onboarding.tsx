import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import biker from './../../assets/onboard/bike.png';
import food from './../../assets/onboard/food.png';
import payment from './../../assets/onboard/payments.png';

const slides = [
  {
    IMAGE: food,
    title: 'Discover Great Food',
    description:
      'Browse hundreds of restaurants and discover delicious meals near you.',
    number: '01',
    accent: '#F97316',
    softAccent: '#FFEDD5',
  },
  {
    IMAGE: biker,
    title: 'Fast Delivery',
    description:
      'Track your order in real time and get your food delivered quickly.',
    number: '02',
    accent: '#EA580C',
    softAccent: '#FFEDD5',
  },
  {
    IMAGE: payment,
    title: 'Easy & Secure Payment',
    description:
      'Pay safely using your preferred payment method with confidence.',
    number: '03',
    accent: '#C2410C',
    softAccent: '#FFEDD5',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.push('/(auth)/login');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-[#FFF9F4]">
      {/* Top bar */}
      <View className="flex-row items-center justify-between px-6 pt-16">
        <View className="flex-row items-center">
          <View className="mr-2 h-3 w-3 rounded-full bg-orange-500" />

          <Text
            style={{ fontFamily: 'Poppins_600SemiBold' }}
            className="text-xl text-[#21150F]">
            Foodie
          </Text>
        </View>

        <Pressable
          onPress={handleSkip}
          className="rounded-full bg-white px-5 py-2.5 shadow-sm">
          <Text
            style={{ fontFamily: 'Poppins_500Medium' }}
            className="text-sm text-gray-500">
            Skip
          </Text>
        </Pressable>
      </View>

      {/* Illustration section */}
      <View className="relative flex-1 items-center justify-center px-6">
        {/* Background shapes */}
        <View
          className="absolute h-[330px] w-[330px] rounded-[100px]"
          style={{
            backgroundColor: slide.softAccent,
            transform: [{ rotate: '-8deg' }],
          }}
        />

        <View
          className="absolute -right-5 top-20 h-20 w-20 rounded-full"
          style={{ backgroundColor: slide.accent }}
        />

        <View className="absolute bottom-20 left-8 h-5 w-5 rounded-full bg-orange-300" />
        <View className="absolute left-16 top-20 h-3 w-3 rounded-full bg-orange-400" />

        {/* Fixed Animated Wrapper */}
        <Animated.View
          key={currentSlide}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(300)}
          className="z-10 h-72 w-screen items-center justify-center">
          <View
            className="h-full w-full overflow-hidden rounded-3xl bg-white"
            style={{
              shadowColor: '#9A3412',
              shadowOffset: { width: 0, height: 15 },
              shadowOpacity: 0.12,
              shadowRadius: 25,
              elevation: 8,
            }}>
            <Image
              source={slide.IMAGE}
              className="h-full w-full"
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      </View>

      {/* Bottom content card */}
      <View className="rounded-t-[42px] bg-white px-7 pb-9 pt-8">
        <View className="mb-5 flex-row items-center justify-between">
          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              color: slide.accent,
            }}
            className="text-sm tracking-[3px]">
            {slide.number}
          </Text>

          <View className="flex-row items-center">
            {slides.map((_, index) => (
              <Pressable
                key={index}
                onPress={() => setCurrentSlide(index)}
                className="mr-2">
                <View
                  className="h-2 rounded-full"
                  style={{
                    width: index === currentSlide ? 30 : 8,
                    backgroundColor:
                      index === currentSlide ? slide.accent : '#E5E7EB',
                  }}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <Animated.View
          key={`content-${currentSlide}`}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(250)}>
          <Text
            style={{ fontFamily: 'Poppins_600SemiBold' }}
            className="max-w-[320px] text-[32px] leading-[40px] text-[#21150F]">
            {slide.title}
          </Text>

          <Text
            style={{ fontFamily: 'Poppins_400Regular' }}
            className="mt-3 text-[15px] leading-6 text-gray-500">
            {slide.description}
          </Text>
        </Animated.View>

        {/* Bottom action */}
        <Pressable
          onPress={handleNext}
          className="mt-8 flex-row items-center justify-between rounded-[22px] px-6 py-4"
          style={{ backgroundColor: slide.accent }}>
          <Text
            style={{ fontFamily: 'Poppins_600SemiBold' }}
            className="text-[16px] text-white">
            {isLastSlide ? 'Get Started' : 'Continue'}
          </Text>

          <View className="h-10 w-10 items-center justify-center rounded-full bg-white">
            <Text
              style={{ color: slide.accent }}
              className="text-2xl font-bold">
              →
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
