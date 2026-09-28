// import { Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import { router, useLocalSearchParams } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     Keyboard,
//     Platform,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import MapView, { Region } from "react-native-maps";

// const { width, height } = Dimensions.get("window");

// const FALLBACK_REGION: Region = {
//   latitude: 7.3775,
//   longitude: 3.947,
//   latitudeDelta: 0.015,
//   longitudeDelta: 0.0121,
// };

// export default function MapScreen() {
//   const mapRef = useRef<MapView>(null);

//   // Get the location sent from ChooseDeliveryAddress
//   const params = useLocalSearchParams<{
//     latitude?: string;
//     longitude?: string;
//     address?: string;
//   }>();

//   const passedLatitude = Number(params.latitude);
//   const passedLongitude = Number(params.longitude);

//   const startingRegion: Region =
//     Number.isFinite(passedLatitude) && Number.isFinite(passedLongitude)
//       ? {
//           latitude: passedLatitude,
//           longitude: passedLongitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }
//       : FALLBACK_REGION;

//   const [region, setRegion] = useState<Region>(startingRegion);

//   const [address, setAddress] = useState({
//     title: params.address || "Fetching...",
//     subtitle: "",
//   });

//   const [searchText, setSearchText] = useState("");
//   const [isLoadingAddress, setIsLoadingAddress] = useState(false);

//   const isMapMoving = useRef(false);

//   // --------------------------------------------------
//   // Reverse geocode: coordinates -> address
//   // --------------------------------------------------
//   const fetchAddress = async (latitude: number, longitude: number) => {
//     setIsLoadingAddress(true);

//     try {
//       const addresses = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });

//       if (addresses.length > 0) {
//         const addressData = addresses[0];

//         const mainAddress =
//           addressData.name ||
//           addressData.street ||
//           addressData.district ||
//           "Selected Location";

//         const fullAddress = [
//           addressData.street,
//           addressData.city,
//           addressData.region,
//           addressData.country,
//         ]
//           .filter(Boolean)
//           .join(", ");

//         setAddress({
//           title: mainAddress,
//           subtitle: fullAddress || "Address details not available",
//         });
//       } else {
//         setAddress({
//           title: "Unknown Location",
//           subtitle: "Could not fetch address",
//         });
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error);

//       setAddress({
//         title: "Network Error",
//         subtitle: "Please check your connection",
//       });
//     } finally {
//       setIsLoadingAddress(false);
//     }
//   };

//   // --------------------------------------------------
//   // Map moved by dragging
//   // --------------------------------------------------
//   const onRegionChangeComplete = (newRegion: Region) => {
//     setRegion(newRegion);

//     if (!isMapMoving.current) {
//       fetchAddress(newRegion.latitude, newRegion.longitude);
//     }

//     isMapMoving.current = false;
//   };

//   // --------------------------------------------------
//   // Search for a location
//   // --------------------------------------------------
//   const handleSearch = async () => {
//     if (!searchText.trim()) return;

//     Keyboard.dismiss();
//     setIsLoadingAddress(true);

//     try {
//       const results = await Location.geocodeAsync(searchText);

//       if (results.length > 0) {
//         const { latitude, longitude } = results[0];

//         const newRegion: Region = {
//           latitude,
//           longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };

//         isMapMoving.current = true;

//         mapRef.current?.animateToRegion(newRegion, 1000);

//         setRegion(newRegion);

//         await fetchAddress(latitude, longitude);
//       } else {
//         setIsLoadingAddress(false);

//         Alert.alert("Not Found", "Could not find that location.");
//       }
//     } catch (error) {
//       console.error("Search error:", error);

//       setIsLoadingAddress(false);

//       Alert.alert("Error", "Failed to search location.");
//     }
//   };

//   // --------------------------------------------------
//   // Current location from map screen
//   // --------------------------------------------------
//   const getCurrentLocation = async () => {
//     setIsLoadingAddress(true);

//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Denied",
//           "Permission to access location was denied.",
//         );

//         setIsLoadingAddress(false);
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });

//       const { latitude, longitude } = location.coords;

//       const newRegion: Region = {
//         latitude,
//         longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       };

//       isMapMoving.current = true;

//       mapRef.current?.animateToRegion(newRegion, 1000);

//       setRegion(newRegion);

//       await fetchAddress(latitude, longitude);
//     } catch (error) {
//       console.error(error);

//       Alert.alert(
//         "Location Error",
//         "Please enable location services in your device settings.",
//       );

//       setIsLoadingAddress(false);
//     }
//   };

//   // --------------------------------------------------
//   // Initial address
//   // --------------------------------------------------
//   useEffect(() => {
//     // If Screen 1 already sent an address,
//     // we don't need to fetch it immediately.
//     if (params.address) {
//       setAddress({
//         title: params.address,
//         subtitle: "Current location",
//       });

//       return;
//     }

//     fetchAddress(startingRegion.latitude, startingRegion.longitude);
//   }, []);

//   // --------------------------------------------------
//   // UI
//   // --------------------------------------------------
//   return (
//     <View style={styles.container}>
//       {/* Map */}
//       <MapView
//         ref={mapRef}
//         style={styles.map}
//         initialRegion={startingRegion}
//         onRegionChangeComplete={onRegionChangeComplete}
//         showsUserLocation
//         showsMyLocationButton={false}
//         customMapStyle={darkMapStyle}
//       />

//       {/* Header */}
//       <SafeAreaView style={styles.headerContainer}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <Ionicons name="arrow-back" size={24} color="#000" />
//           </TouchableOpacity>

//           <View style={styles.searchContainer}>
//             <Ionicons
//               name="search"
//               size={20}
//               color="#666"
//               style={styles.searchIcon}
//             />

//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search streets, places"
//               placeholderTextColor="#666"
//               value={searchText}
//               onChangeText={setSearchText}
//               onSubmitEditing={handleSearch}
//               returnKeyType="search"
//             />

//             {searchText.length > 0 && (
//               <TouchableOpacity onPress={() => setSearchText("")}>
//                 <Ionicons name="close-circle" size={20} color="#999" />
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </SafeAreaView>

//       {/* Center pin */}
//       <View style={styles.centerPinContainer} pointerEvents="none">
//         <Ionicons
//           name="location-sharp"
//           size={45}
//           color="#00C853"
//           style={styles.pinShadow}
//         />
//       </View>

//       {/* My location button */}
//       <TouchableOpacity
//         style={styles.myLocationButton}
//         onPress={getCurrentLocation}
//       >
//         <Ionicons name="locate" size={24} color="#007AFF" />
//       </TouchableOpacity>

//       {/* Bottom sheet */}
//       <View style={styles.bottomSheet}>
//         <View style={styles.dragHandleContainer}>
//           <Text style={styles.dragText}>
//             Drag the pin to your preferred location
//           </Text>
//         </View>

//         <View style={styles.addressCard}>
//           <View style={styles.addressRow}>
//             {isLoadingAddress ? (
//               <ActivityIndicator
//                 size="small"
//                 color="#00C853"
//                 style={{ marginRight: 8 }}
//               />
//             ) : (
//               <Ionicons name="location-sharp" size={20} color="#00C853" />
//             )}

//             <Text style={styles.addressTitle} numberOfLines={1}>
//               {isLoadingAddress ? "Locating..." : address.title}
//             </Text>
//           </View>

//           {!isLoadingAddress && address.subtitle && (
//             <Text style={styles.addressSubtitle} numberOfLines={2}>
//               {address.subtitle}
//             </Text>
//           )}
//         </View>

//         <TouchableOpacity
//           style={styles.confirmButton}
//           onPress={() => {
//             if (isLoadingAddress) return;

//             router.replace("/(tabs)");
//           }}
//         >
//           <Text style={styles.confirmButtonText}>Select this location</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   map: {
//     width,
//     height,
//   },

//   headerContainer: {
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     zIndex: 10,
//   },

//   headerContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === "android" ? 40 : 10,
//     marginTop: 10,
//   },

//   backButton: {
//     width: 45,
//     height: 45,
//     backgroundColor: "#fff",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   searchContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 25,
//     height: 45,
//     paddingHorizontal: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   searchIcon: {
//     marginRight: 8,
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: "#000",
//     height: "100%",
//   },

//   centerPinContainer: {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     marginLeft: -22.5,
//     marginTop: -45,
//     zIndex: 5,
//   },

//   pinShadow: {
//     textShadowColor: "rgba(0, 0, 0, 0.3)",
//     textShadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     textShadowRadius: 4,
//   },

//   myLocationButton: {
//     position: "absolute",
//     bottom: 260,
//     right: 20,
//     backgroundColor: "#fff",
//     width: 45,
//     height: 45,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//     zIndex: 9,
//   },

//   bottomSheet: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     backgroundColor: "#1E1E1E",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     paddingBottom: Platform.OS === "ios" ? 40 : 25,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 10,
//   },

//   dragHandleContainer: {
//     alignItems: "center",
//     marginBottom: 15,
//   },

//   dragText: {
//     color: "#999",
//     fontSize: 12,
//   },

//   addressCard: {
//     backgroundColor: "#2C2C2C",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 20,
//     minHeight: 80,
//     justifyContent: "center",
//   },

//   addressRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },

//   addressTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//     flex: 1,
//   },

//   addressSubtitle: {
//     color: "#AAA",
//     fontSize: 13,
//     marginLeft: 28,
//     lineHeight: 18,
//   },

//   confirmButton: {
//     backgroundColor: "#00C853",
//     borderRadius: 8,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   confirmButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// const darkMapStyle = [
//   {
//     elementType: "geometry",
//     stylers: [{ color: "#242f3e" }],
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#746855" }],
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [{ color: "#242f3e" }],
//   },
//   {
//     featureType: "administrative.locality",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#d59563" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [{ color: "#38414e" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.stroke",
//     stylers: [{ color: "#212a37" }],
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#9ca5b3" }],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#17263c" }],
//   },
// ];
