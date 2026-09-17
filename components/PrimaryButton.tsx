import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ title, onPress, disabled, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={style}
      className="rounded-xl  p-2.5"
      // note: inline `style` and `className` colors can conflict — see below
    >
      <Text className="text-center text-white font-semibold text-lg">
        {disabled ? '...' : title}
      </Text>
    </Pressable>
  );
}