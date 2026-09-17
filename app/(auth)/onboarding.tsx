import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Logo = require('./../../assets/icons/logo.png');
const BikeImage = require('./../../assets/icons/bike.png');

// Reusable Sky/Cloud Component
const SkyShape = () => (
  <Svg
    width="61"
    height="13"
    viewBox="0 0 61 13"
    fill="none"
  >
    <Path
      d="M60.9683 11.6771C61.4349 8.96393 56.6542 6.73457 53.0667 6.50183C51.3533 6.39159 49.5711 6.59982 47.9495 6.1466C44.4385 5.16666 43.0311 1.52863 39.6042 0.371072C37.0418 -0.486376 34.0892 0.2792 31.6032 1.27752C29.1173 2.27583 26.6543 3.54363 23.8776 3.6845C21.4605 3.80699 18.8445 3.07203 16.7257 4.0336C15.15 4.73793 14.3238 6.1956 12.9011 7.04692C11.4784 7.89825 9.60433 8.08811 7.83737 8.14323C6.07042 8.19835 4.25758 8.2351 2.65126 8.82306C1.04494 9.41103 -0.278363 10.7707 0.0505499 12.1549L60.9683 11.6771Z"
      fill="#FFFFFF"
    />
  </Svg>
);

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    JakartaRegular: PlusJakartaSans_400Regular,
    JakartaMedium: PlusJakartaSans_500Medium,
    JakartaSemiBold: PlusJakartaSans_600SemiBold,
    JakartaBold: PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <LinearGradient
      colors={['#00A859', '#006644']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Top Logo Section */}
      <View style={styles.topSection}>
        <View style={styles.logoRow}>
          <Image
            source={Logo}
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />

          <Text style={styles.logoText}>HeyBite</Text>
        </View>

        <Text style={styles.tagline}>
          Crave it? Get it fast...
        </Text>
      </View>

      {/* Center Illustration */}
      <View style={styles.imageSection}>
        {/* Right Cloud */}
        <View style={styles.cloudRight}>
          <SkyShape />
        </View>

        {/* Left Cloud */}
        <View style={styles.cloudLeft}>
          <SkyShape />
        </View>

        <Image
          source={BikeImage}
          style={styles.bikeImage}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={200}
        />
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomSection}>
        <Text style={styles.heading}>
          Get started Begin Your Journey with Ease!
        </Text>

        <Text style={styles.subtext}>
          Discover great food with just a few steps! Customize, explore, and
          enjoy your perfect meals
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            Get started
          </Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLink}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },

  topSection: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 30,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logo: {
    width: 40,
    height: 40,
  },

  logoText: {
    fontSize: 20,
    fontFamily: 'JakartaBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  tagline: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
    fontFamily: 'JakartaMedium',
    marginTop: 2,
  },

  imageSection: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  cloudRight: {
    position: 'absolute',
    top: -80,
    right: 20,
    zIndex: 2,
  },

  cloudLeft: {
    position: 'absolute',
    top: -35,
    left: 130,
    zIndex: 2,
  },

  bikeImage: {
    width: 324,
    height: 279,
  },

  bottomSection: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },

  heading: {
    fontSize: 24,
    fontFamily: 'JakartaBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtext: {
    fontSize: 12,
    fontFamily: 'JakartaRegular',
    color: '#FFFFFF',
    opacity: 0.85,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 5,
    letterSpacing: 0.5,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#00A859',
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'JakartaBold',
  },

  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    fontFamily: 'JakartaMedium',
  },

  loginLink: {
    color: '#00A859',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'JakartaBold',
  },
});
