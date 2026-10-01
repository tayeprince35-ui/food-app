import { ResetPasswordForm, resetPasswordSchema } from '@/lib/schemas/resetAuth';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const Logo = require('./../../assets/icons/logo.png');

type FieldErrors = Partial<Record<keyof ResetPasswordForm, string>>;

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleContinue = (): void => {
    const result = resetPasswordSchema.safeParse({ password, confirmPassword });

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setErrors({
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    setErrors({});
    // TODO: supabase.auth.updateUser({ password: result.data.password })
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        {/* Header */}
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
          <Text style={styles.title}>
            Reset Your HeyBite{'\n'}Account Password
          </Text>

          {/* New Password Input */}
          <View style={[styles.inputContainer, errors.password && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              placeholderTextColor="#888888"
              secureTextEntry={!isPasswordVisible}
              value={password}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
              }}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#888888"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          {/* Confirm Password Input */}
          <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#888888"
              secureTextEntry={!isConfirmVisible}
              value={confirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors((e) => ({ ...e, confirmPassword: undefined }));
              }}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsConfirmVisible(!isConfirmVisible)}
            >
              <Ionicons
                name={isConfirmVisible ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#888888"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  keyboardContainer: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'relative',
    height: 60,
  },
  backButton: { position: 'absolute', left: 20, zIndex: 10 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 24, height: 24, marginRight: 8 },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'PlusJakarta-SemiBold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'PlusJakarta-Bold',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 34,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 28,
    backgroundColor: '#1E1E1E',
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: { borderColor: '#E5484D' },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    height: '100%',
  },
  eyeIcon: { padding: 8 },
  errorText: {
    color: '#E5484D',
    fontSize: 12,
    fontFamily: 'PlusJakarta-Medium',
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 16,
  },
  continueButton: {
    backgroundColor: '#2C8A56',
    borderRadius: 26,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PlusJakarta-SemiBold',
  },
});

export default ResetPasswordScreen;