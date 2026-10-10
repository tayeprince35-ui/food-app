import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Region, UrlTile } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const IS_ANDROID = Platform.OS === "android";

const FALLBACK_REGION: Region = {
  latitude: 7.3775,
  longitude: 3.947,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

const DEFAULT_DELTA = 0.01;
const GEOCODE_DEBOUNCE_MS = 400;

// Free OpenStreetMap tiles (fine for dev/portfolio; use MapTiler/Stadia for production)
const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

type AddressState = {
  title: string;
  subtitle: string;
};

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const params = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
    address?: string;
  }>();

  // Guard against "" -> 0 (Number("") === 0 passes isFinite)
  const passedLatitude = params.latitude ? Number(params.latitude) : NaN;
  const passedLongitude = params.longitude ? Number(params.longitude) : NaN;

  const startingRegion: Region =
    Number.isFinite(passedLatitude) && Number.isFinite(passedLongitude)
      ? {
          latitude: passedLatitude,
          longitude: passedLongitude,
          latitudeDelta: DEFAULT_DELTA,
          longitudeDelta: DEFAULT_DELTA,
        }
      : FALLBACK_REGION;

  const [region, setRegion] = useState<Region>(startingRegion);
  const [address, setAddress] = useState<AddressState>({
    title: params.address || "Fetching...",
    subtitle: "",
  });
  const [searchText, setSearchText] = useState("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const geocodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --------------------------------------------------
  // Reverse geocode
  // --------------------------------------------------
  const fetchAddress = useCallback(
    async (latitude: number, longitude: number) => {
      setIsLoadingAddress(true);

      try {
        const results = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (results.length > 0) {
          const a = results[0];

          const mainAddress =
            a.name || a.street || a.district || a.city || "Selected Location";

          const fullAddress = [a.street, a.city, a.region, a.country]
            .filter(Boolean)
            .join(", ");

          setAddress({
            title: mainAddress,
            subtitle: fullAddress || "Address details not available",
          });
        } else {
          setAddress({
            title: "Unknown Location",
            subtitle: "Could not fetch address",
          });
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setAddress({
          title: "Network Error",
          subtitle: "Please check your connection",
        });
      } finally {
        setIsLoadingAddress(false);
      }
    },
    [],
  );

  // --------------------------------------------------
  // Map settled -> debounce the reverse geocode
  // --------------------------------------------------
  const onRegionChangeComplete = useCallback(
    (newRegion: Region) => {
      setRegion(newRegion);

      if (geocodeTimer.current) clearTimeout(geocodeTimer.current);

      geocodeTimer.current = setTimeout(() => {
        fetchAddress(newRegion.latitude, newRegion.longitude);
      }, GEOCODE_DEBOUNCE_MS);
    },
    [fetchAddress],
  );

  // --------------------------------------------------
  // Search by text
  // --------------------------------------------------
  const handleSearch = useCallback(async () => {
    const q = searchText.trim();
    if (!q) return;

    Keyboard.dismiss();
    setIsLoadingAddress(true);

    try {
      const results = await Location.geocodeAsync(q);

      if (results.length === 0) {
        setIsLoadingAddress(false);
        Alert.alert("Not Found", "Could not find that location.");
        return;
      }

      const { latitude, longitude } = results[0];
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: DEFAULT_DELTA,
        longitudeDelta: DEFAULT_DELTA,
      };

      // onRegionChangeComplete will do the reverse-geocode
      mapRef.current?.animateToRegion(newRegion, 1000);
      setRegion(newRegion);
    } catch (err) {
      console.error("Search error:", err);
      setIsLoadingAddress(false);
      Alert.alert("Error", "Failed to search location.");
    }
  }, [searchText]);

  // --------------------------------------------------
  // Use current GPS location
  // --------------------------------------------------
  const getCurrentLocation = useCallback(async () => {
    setIsLoadingAddress(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setIsLoadingAddress(false);
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied.",
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: DEFAULT_DELTA,
        longitudeDelta: DEFAULT_DELTA,
      };

      mapRef.current?.animateToRegion(newRegion, 1000);
      setRegion(newRegion);
    } catch (err) {
      console.error(err);
      setIsLoadingAddress(false);
      Alert.alert(
        "Location Error",
        "Please enable location services in your device settings.",
      );
    }
  }, []);

  // --------------------------------------------------
  // First mount: hydrate address if not passed in
  // --------------------------------------------------
  useEffect(() => {
    if (params.address) {
      setAddress({ title: params.address, subtitle: "Current location" });
      return;
    }
    fetchAddress(startingRegion.latitude, startingRegion.longitude);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (geocodeTimer.current) clearTimeout(geocodeTimer.current);
    };
  }, []);

  // --------------------------------------------------
  // Confirm
  // --------------------------------------------------
  const handleConfirm = () => {
    if (isLoadingAddress) return;

    router.replace({
      pathname: "/(tabs)",
      params: {
        latitude: String(region.latitude),
        longitude: String(region.longitude),
        address: address.title,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Map: Apple Maps on iOS (no key), OSM tiles on Android (no key) */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        mapType={IS_ANDROID ? "none" : "standard"}
        initialRegion={startingRegion}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={Keyboard.dismiss}
        showsUserLocation
        showsMyLocationButton={false}
        rotateEnabled={false}
      >
        {IS_ANDROID && (
          <UrlTile
            urlTemplate={OSM_TILE_URL}
            maximumZ={19}
            tileSize={256}
            flipY={false}
            zIndex={-1}
          />
        )}
      </MapView>

      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search streets, places"
              placeholderTextColor="#666"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />

            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* Center pin */}
      <View style={styles.centerPinContainer} pointerEvents="none">
        <Ionicons
          name="location-sharp"
          size={45}
          color="#00C853"
          style={styles.pinShadow}
        />
      </View>

      {/* My location button */}
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={getCurrentLocation}
        disabled={isLoadingAddress}
      >
        <Ionicons name="locate" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandleContainer}>
          <Text style={styles.dragText}>
            Drag the map to position the pin
          </Text>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressRow}>
            {isLoadingAddress ? (
              <ActivityIndicator
                size="small"
                color="#00C853"
                style={{ marginRight: 8 }}
              />
            ) : (
              <Ionicons name="location-sharp" size={20} color="#00C853" />
            )}

            <Text style={styles.addressTitle} numberOfLines={1}>
              {isLoadingAddress ? "Locating..." : address.title}
            </Text>
          </View>

          {!isLoadingAddress && address.subtitle ? (
            <Text style={styles.addressSubtitle} numberOfLines={2}>
              {address.subtitle}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            isLoadingAddress && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={isLoadingAddress}
        >
          <Text style={styles.confirmButtonText}>Select this location</Text>
        </TouchableOpacity>
      </View>

      {/* OSM attribution (required by OSM's tile usage policy) */}
      {IS_ANDROID && (
        <Text style={styles.attribution}>© OpenStreetMap contributors</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    marginTop: 4,
  },

  backButton: {
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 45,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  searchIcon: { marginRight: 8 },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    height: "100%",
  },

  centerPinContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -22.5,
    marginTop: -45,
    zIndex: 5,
  },

  pinShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },

  myLocationButton: {
    position: "absolute",
    bottom: 260,
    right: 20,
    backgroundColor: "#fff",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 9,
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  dragHandleContainer: {
    alignItems: "center",
    marginBottom: 15,
  },

  dragText: {
    color: "#999",
    fontSize: 12,
  },

  addressCard: {
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    minHeight: 80,
    justifyContent: "center",
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  addressTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },

  addressSubtitle: {
    color: "#AAA",
    fontSize: 13,
    marginLeft: 28,
    lineHeight: 18,
  },

  confirmButton: {
    backgroundColor: "#00C853",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmButtonDisabled: {
    opacity: 0.6,
  },

  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  attribution: {
    position: "absolute",
    bottom: 230,
    left: 8,
    fontSize: 10,
    color: "#333",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 4,
    borderRadius: 3,
    zIndex: 8,
  },
});