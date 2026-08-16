import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router/stack';
import Toast, { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import './../global.css';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#1E293B',
        borderLeftColor: '#10B981', 
        borderLeftWidth: 5,
        borderRadius: 12,
        height: 64,
        width: '92%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        color: '#F8FAFC',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.2,
      }}
      text2Style={{
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#1E293B',
        borderLeftColor: '#EF4444', // Vivid red indicator
        borderLeftWidth: 5,
        borderRadius: 12,
        height: 64,
        width: '92%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      text1Style={{
        color: '#F8FAFC',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.2,
      }}
      text2Style={{
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),
};
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
if (!fontsLoaded) {
    return null;
  }
  return (
  <>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    <Toast config={toastConfig} />
  </>
)}
