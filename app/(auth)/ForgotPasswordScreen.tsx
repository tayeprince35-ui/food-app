import { LucideMail } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'; // <--- Added Image here

const Forgotimage = require('./../../assets/icons/forgot.png');

export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      
      {/* 1. Title */}
      <Text style={styles.title}>Forgot Password</Text>

      <View style={styles.imageContainer}>
        <Image source={Forgotimage} style={{ width: 150, height: 150 }} resizeMode="contain" />
      </View>

      {/* 3. Description Text */}
      <Text style={styles.description}>
        Please enter your email to receive a confirmation code to set a new password
      </Text>

      {/* 4. Email Input Field */}
      <View style={styles.inputWrapper}>
        {/* Simple Mail Icon component */}
        <LucideMail/>
        
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#888888"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* 5. Send Code Button */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Send Code</Text>
      </Pressable>

    </View>
  );
}

// Basic styling to match the image exactly
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Very dark background
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    color: '#D1D1D1', // Light gray text
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Slightly lighter dark background
    borderRadius: 30, // Rounded pill shape
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 16,
    height: 55,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#2E7D32', // Dark Green
    height: 55,
    borderRadius: 30, // Rounded pill shape
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});