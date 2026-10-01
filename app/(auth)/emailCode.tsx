import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Logo = require('./../../assets/icons/logo.png');

const OTP_LENGTH = 5;

const VerifyOtpNowScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number): void => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (text.length === 1 && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ): void => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (): void => {
    const code = otp.join('');

    // Testing only: remove once the real OTP check is in place
    if (code === '12345') {
      router.push('/(auth)/ResetPassword');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>HeyBite</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Verify OTP Now</Text>

          <Text style={styles.subtitle}>Enter the 5-Digit Code Sent to You</Text>

          {/* OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.otpBox}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectionColor="#2C8A56"
                placeholderTextColor="#888888"
              />
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          {/* Resend OTP Button */}
          <View style={styles.resendContainer}>
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>Didn't get OTP? Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
    height: 60,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'PlusJakarta-SemiBold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 80,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'PlusJakarta-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'PlusJakarta-Medium',
  },
  verifyButton: {
    backgroundColor: '#2C8A56',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PlusJakarta-SemiBold',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendButton: {
    backgroundColor: '#143823',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2C8A56',
  },
  resendText: {
    color: '#2C8A56',
    fontSize: 12,
    fontFamily: 'PlusJakarta-Medium',
  },
});

export default VerifyOtpNowScreen;