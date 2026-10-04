import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import LoadingScreen from "./../components/LoadingScreen";

import { AuthProvider, useAuth } from "@/lib/AuthContext";
import "./../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const INTRO_KEY = "hasSeenIntro";
export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#1E293B",
        borderLeftColor: "#10B981",
        borderLeftWidth: 5,
        borderRadius: 12,
        height: 64,
        width: "92%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        color: "#F8FAFC",
        fontSize: 15,
        fontWeight: "600",
        letterSpacing: -0.2,
      }}
      text2Style={{ color: "#94A3B8", fontSize: 13, fontWeight: "400" }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#1E293B",
        borderLeftColor: "#EF4444",
        borderLeftWidth: 5,
        borderRadius: 12,
        height: 64,
        width: "92%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        color: "#F8FAFC",
        fontSize: 15,
        fontWeight: "600",
        letterSpacing: -0.2,
      }}
      text2Style={{ color: "#94A3B8", fontSize: 13, fontWeight: "400" }}
    />
  ),
};

function InitialLayout() {
  const { session, isLoading, isGuest } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [introSeen, setIntroSeen] = useState<boolean | null>(null);


  const [fontsLoaded, fontError] = useFonts({
    "PlusJakarta-Regular": PlusJakartaSans_400Regular,
    "PlusJakarta-Medium": PlusJakartaSans_500Medium,
    "PlusJakarta-SemiBold": PlusJakartaSans_600SemiBold,
    "PlusJakarta-Bold": PlusJakartaSans_700Bold,
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  });

    // load the flag once
  useEffect(() => {
    AsyncStorage.getItem(INTRO_KEY)
      .then((v) => setIntroSeen(v === "true"))
      .catch(() => setIntroSeen(false));
  }, []);


  useEffect(() => {
    if (session && introSeen === false) {
      setIntroSeen(true);
      AsyncStorage.setItem(INTRO_KEY, "true").catch(() => {});
    }
  }, [session, introSeen]);

  useEffect(() => {
    if (isLoading || introSeen === null) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (session && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!session && !isGuest && !inAuthGroup) {
      router.replace(introSeen ? "/(auth)/login" : "/splash");
    }
  }, [session, isGuest, isLoading, segments, introSeen]);

  if (isLoading || (!fontsLoaded && !fontError)) {
    return <LoadingScreen />;
  }
  if (fontError) {
    console.warn("Font failed to load:", fontError);
  }

  return (
    <>
      <Slot />
      <Toast config={toastConfig} />
    </>
  );
}
export default function RootLayout() {
  return (

      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
  
  );
}
