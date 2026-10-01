import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// If using Expo: import { Ionicons } from '@expo/vector-icons';

const VerifyOtpNowScreen = () => {
  // State to hold the 5 digits
  const [otp, setOtp] = useState(['', '', '', '', '']);
  // Refs to handle focus moving to the next input automatically
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (text.length === 1 && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
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
          <TouchableOpacity style={styles.backButton}>
             <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={20} color="#26A65B" />
            <Text style={styles.logoText}>HeyBite</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          
          <Text style={styles.title}>Verify OTP Now</Text>
          
          <Text style={styles.subtitle}>
            Enter the 5-Digit Code Sent to You
          </Text>

          {/* OTP Input Boxes (5 Digits) */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
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
          <TouchableOpacity style={styles.verifyButton}>
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
    backgroundColor: '#121212', // Dark background
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
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 80, // Push content up slightly
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spreads the 5 boxes evenly
    marginBottom: 40,
    paddingHorizontal: 10, // Prevents boxes from touching screen edges
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#333333', // Subtle border for the dark theme
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
  verifyButton: {
    backgroundColor: '#2C8A56', // HeyBite Green
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendButton: {
    backgroundColor: '#143823', // Dark green background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2C8A56',
  },
  resendText: {
    color: '#2C8A56',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default VerifyOtpNowScreen;