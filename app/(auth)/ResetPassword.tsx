import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
// If using Expo: import { Ionicons } from '@expo/vector-icons';

import { SafeAreaView } from "react-native-safe-area-context";
const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* KeyboardAvoidingView ensures the inputs don't get hidden by the keyboard */}
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
          <Text style={styles.title}>
            Reset Your HeyBite{'\n'}Account Password
          </Text>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              placeholderTextColor="#888888"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons 
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#888888" 
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#888888"
              secureTextEntry={!isConfirmVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setIsConfirmVisible(!isConfirmVisible)}
            >
              <Ionicons 
                name={isConfirmVisible ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#888888" 
              />
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
    paddingBottom: 100, // Push content up slightly from the bottom
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 34,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333', // Subtle border
    borderRadius: 26,
    backgroundColor: '#1E1E1E', // Slightly lighter than background
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    height: '100%',
  },
  eyeIcon: {
    padding: 8,
  },
  continueButton: {
    backgroundColor: '#2C8A56', // HeyBite Green
    borderRadius: 26,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;