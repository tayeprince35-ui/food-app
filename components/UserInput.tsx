import { LucideEye, LucideEyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type UserInputProps = TextInputProps & {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
};

export default function UserInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  onBlur,
  ...props
}: UserInputProps) {
  const [focused, setFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          focused && styles.focusedInput,
          secureTextEntry && { paddingRight: 48 },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        cursorColor="#00A859"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        {...props}
      />
      {secureTextEntry && (
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIconButton}
        >
          {isPasswordVisible ? (
            <LucideEyeOff color="#9CA3AF" size={20} />
          ) : (
            <LucideEye color="#9CA3AF" size={20} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#1C1F26',
    borderWidth: 1,
    borderColor: '#2D323E',
    borderRadius: 26,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#FFFFFF',
    outlineStyle: 'none' as any,
  },
  focusedInput: {
    borderColor: '#00A859',
    borderWidth: 1.5,
  },
  eyeIconButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});