import { LucideEye, LucideEyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type UserInputProps = {
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
}: UserInputProps) {
  const [focused, setFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container} className="relative">
      <TextInput
        style={[
          styles.input,
          focused && styles.focusedInput,
          secureTextEntry && { paddingRight: 48 },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#888888"
        secureTextEntry={secureTextEntry && !isPasswordVisible} // Toggle visibility
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
      />
      {secureTextEntry && (
        <Pressable
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute top-3 right-3">
          {isPasswordVisible ? (
            <LucideEyeOff color={'#F28C28'} size={24} />
          ) : (
            <LucideEye color={'#F28C28'} size={24} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    outlineStyle: 'none' as any,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: '#F97316',
    borderWidth: 2,
  },
});
