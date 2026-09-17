import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Configuration for the bars to match the image shape
// We use an array to define the max height of each bar
const BAR_DATA = [
  { maxHeight: 40, delay: 0 },
  { maxHeight: 60, delay: 100 },
  { maxHeight: 50, delay: 200 }, // Middle dip
  { maxHeight: 80, delay: 300 }, // Highest peak
  { maxHeight: 50, delay: 400 }, // Middle dip
  { maxHeight: 60, delay: 500 },
  { maxHeight: 40, delay: 600 },
];

const BAR_WIDTH = 6;
const BAR_GAP = 6;
const MIN_HEIGHT = 15; // The height the bars shrink down to
const COLOR_GREEN = '#00C851'; // Approximate green from image

const AnimatedBar = ({ maxHeight, delay }: {maxHeight:number, delay: number} ) => {
  const height = useSharedValue(maxHeight);

  useEffect(() => {
    // We animate between the maxHeight and the MIN_HEIGHT
    height.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(MIN_HEIGHT, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(maxHeight, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, // Infinite loop
        true // Reverse (though sequence handles it, this ensures smoothness)
      )
    );
  }, [height, maxHeight, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  return <Animated.View style={[styles.bar, animatedStyle]} />;
};

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        
        {/* The Equalizer Icon */}
        <View style={styles.iconContainer}>
          {BAR_DATA.map((bar, index) => (
            <AnimatedBar
              key={index}
              maxHeight={bar.maxHeight}
              delay={bar.delay}
            />
          ))}
        </View>

        {/* The Text */}
        <Text style={styles.loadingText}>LOADING..</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f', // Dark background
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50, // Slight visual adjustment
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align bars to the bottom
    height: 100, // Container height taller than the tallest bar
    marginBottom: 20,
  },
  bar: {
    width: BAR_WIDTH,
    backgroundColor: COLOR_GREEN,
    borderRadius: 10, // Rounded caps
    marginHorizontal: BAR_GAP / 2,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2, // Space out the letters like in the image
    fontFamily: 'System', // Or a custom font if you have one
  },
});