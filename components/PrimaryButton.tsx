import { Pressable, Text } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="rounded-xl bg-orange-500 p-2.5">
      <Text className="text-center text-white font-semibold text-lg">{title}</Text>
    </Pressable>
  );
}
