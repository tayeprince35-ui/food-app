// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import MapView, {
//   Marker,
//   Polyline,
//   PROVIDER_GOOGLE,
// } from "react-native-maps";

// const RESTAURANT = {
//   name: "Mama's Kitchen",
//   location: {
//     latitude: 7.3775,
//     longitude: 3.947,
//   },
// };

// const CUSTOMER = {
//   address: "12 Bodija Road, Ibadan",
//   location: {
//     latitude: 7.3801,
//     longitude: 3.9502,
//   },
// };

// const DRIVER = {
//   name: "Samuel",
//   rating: 4.9,
// };

// const DRIVER_LOCATION = {
//   latitude: 7.3788,
//   longitude: 3.9485,
// };

// const DRIVER_ROUTE = [
//   {
//     latitude: 7.3775,
//     longitude: 3.947,
//   },
//   {
//     latitude: 7.3778,
//     longitude: 3.9474,
//   },
//   {
//     latitude: 7.3781,
//     longitude: 3.9478,
//   },
//   {
//     latitude: 7.3785,
//     longitude: 3.9482,
//   },
//   {
//     latitude: 7.3788,
//     longitude: 3.9485,
//   },
//   {
//     latitude: 7.3792,
//     longitude: 3.9489,
//   },
//   {
//     latitude: 7.3796,
//     longitude: 3.9495,
//   },
//   {
//     latitude: 7.3801,
//     longitude: 3.9502,
//   },
// ];

// export default function DeliveryScreen() {
//   return (
//     <View style={styles.container}>

//       {/* MAP */}
//       <MapView
//         style={styles.map}
//         provider={PROVIDER_GOOGLE}
//         initialRegion={{
//           latitude: 7.379,
//           longitude: 3.9486,
//           latitudeDelta: 0.006,
//           longitudeDelta: 0.006,
//         }}
//         showsUserLocation={false}
//         showsMyLocationButton={false}
//         showsCompass={false}
//         toolbarEnabled={false}
//       >

//         {/* DELIVERY ROUTE */}
//         <Polyline
//           coordinates={DRIVER_ROUTE}
//           strokeColor="#00A859"
//           strokeWidth={5}
//         />

//         {/* RESTAURANT */}
//         <Marker coordinate={RESTAURANT.location}>
//           <View style={styles.restaurantMarker}>
//             <Ionicons
//               name="restaurant"
//               size={20}
//               color="#FFFFFF"
//             />
//           </View>
//         </Marker>

//         {/* CUSTOMER */}
//         <Marker coordinate={CUSTOMER.location}>
//           <View style={styles.customerMarker}>
//             <Ionicons
//               name="home"
//               size={20}
//               color="#FFFFFF"
//             />
//           </View>
//         </Marker>

//         {/* DRIVER */}
//         <Marker coordinate={DRIVER_LOCATION}>
//           <View style={styles.driverMarker}>
//             <Ionicons
//               name="bicycle"
//               size={24}
//               color="#FFFFFF"
//             />
//           </View>
//         </Marker>
//       </MapView>

//       {/* TOP HEADER */}
//       <View style={styles.topHeader}>

//         <Pressable
//           style={styles.backButton}
//           onPress={() => router.back()}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={22}
//             color="#111111"
//           />
//         </Pressable>

//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>
//             Track Order
//           </Text>

//           <Text style={styles.orderNumber}>
//             Order #1024
//           </Text>
//         </View>

//         <Pressable style={styles.helpButton}>
//           <Ionicons
//             name="help-circle-outline"
//             size={23}
//             color="#111111"
//           />
//         </Pressable>

//       </View>

//       {/* CENTER MAP BUTTON */}
//       <Pressable style={styles.centerButton}>
//         <Ionicons
//           name="locate-outline"
//           size={24}
//           color="#00A859"
//         />
//       </Pressable>

//       {/* BOTTOM SHEET */}
//       <View style={styles.bottomSheet}>

//         {/* HANDLE */}
//         <View style={styles.handle} />

//         {/* STATUS */}
//         <View style={styles.statusHeader}>

//           <View style={styles.statusIcon}>
//             <Ionicons
//               name="bicycle"
//               size={24}
//               color="#FFFFFF"
//             />
//           </View>

//           <View style={styles.statusTextContainer}>
//             <Text style={styles.statusTitle}>
//               Your food is on the way
//             </Text>

//             <Text style={styles.etaText}>
//               Arriving in about 18 min
//             </Text>
//           </View>

//         </View>

//         {/* PROGRESS */}
//         <View style={styles.progressContainer}>

//           {/* STEP 1 */}
//           <View style={styles.progressStep}>
//             <View
//               style={[
//                 styles.progressCircle,
//                 styles.progressCircleActive,
//               ]}
//             >
//               <Ionicons
//                 name="checkmark-circle"
//                 size={15}
//                 color="#FFFFFF"
//               />
//             </View>
//           </View>

//           <View
//             style={[
//               styles.progressLine,
//               styles.progressLineActive,
//             ]}
//           />

//           {/* STEP 2 */}
//           <View style={styles.progressStep}>
//             <View
//               style={[
//                 styles.progressCircle,
//                 styles.progressCircleActive,
//               ]}
//             >
//               <Ionicons
//                 name="restaurant"
//                 size={15}
//                 color="#FFFFFF"
//               />
//             </View>
//           </View>

//           <View
//             style={[
//               styles.progressLine,
//               styles.progressLineActive,
//             ]}
//           />

//           {/* STEP 3 */}
//           <View style={styles.progressStep}>
//             <View
//               style={[
//                 styles.progressCircle,
//                 styles.progressCircleActive,
//               ]}
//             >
//               <Ionicons
//                 name="bag-handle"
//                 size={15}
//                 color="#FFFFFF"
//               />
//             </View>
//           </View>

//           <View
//             style={[
//               styles.progressLine,
//               styles.progressLineActive,
//             ]}
//           />

//           {/* STEP 4 */}
//           <View style={styles.progressStep}>
//             <View
//               style={[
//                 styles.progressCircle,
//                 styles.progressCircleActive,
//               ]}
//             >
//               <Ionicons
//                 name="bicycle"
//                 size={15}
//                 color="#FFFFFF"
//               />
//             </View>
//           </View>

//           <View style={styles.progressLine} />

//           {/* STEP 5 */}
//           <View style={styles.progressStep}>
//             <View style={styles.progressCircle}>
//               <Ionicons
//                 name="checkmark-done-circle"
//                 size={15}
//                 color="#A7A7A7"
//               />
//             </View>
//           </View>

//         </View>

//         {/* PROGRESS LABELS */}
//         <View style={styles.labelsRow}>
//           <Text style={styles.progressLabel}>
//             Confirmed
//           </Text>

//           <Text style={styles.progressLabel}>
//             Preparing
//           </Text>

//           <Text style={styles.progressLabel}>
//             Picked up
//           </Text>

//           <Text style={styles.progressLabel}>
//             On way
//           </Text>

//           <Text style={styles.progressLabel}>
//             Delivered
//           </Text>
//         </View>

//         {/* DRIVER CARD */}
//         <View style={styles.driverCard}>

//           <View style={styles.driverAvatar}>
//             <Ionicons
//               name="person"
//               size={25}
//               color="#00A859"
//             />
//           </View>

//           <View style={styles.driverInfo}>

//             <Text style={styles.driverName}>
//               {DRIVER.name}
//             </Text>

//             <View style={styles.ratingRow}>

//               <Ionicons
//                 name="star"
//                 size={14}
//                 color="#F5A623"
//               />

//               <Text style={styles.ratingText}>
//                 {DRIVER.rating} • Delivery Partner
//               </Text>

//             </View>

//           </View>

//           <View style={styles.driverActions}>

//             <Pressable style={styles.driverAction}>
//               <Ionicons
//                 name="call"
//                 size={19}
//                 color="#00A859"
//               />
//             </Pressable>

//             <Pressable style={styles.driverAction}>
//               <Ionicons
//                 name="chatbubble"
//                 size={18}
//                 color="#00A859"
//               />
//             </Pressable>

//           </View>

//         </View>

//         {/* DELIVERY LOCATION */}
//         <View style={styles.locationRow}>

//           <View style={styles.locationIcon}>
//             <Ionicons
//               name="location"
//               size={20}
//               color="#00A859"
//             />
//           </View>

//           <View style={styles.locationTextContainer}>

//             <Text style={styles.locationTitle}>
//               Delivering to
//             </Text>

//             <Text style={styles.locationAddress}>
//               {CUSTOMER.address}
//             </Text>

//           </View>

//         </View>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },

//   map: {
//     ...StyleSheet.absoluteFill,
//   },

//   /* HEADER */

//   topHeader: {
//     position: "absolute",
//     top: 55,
//     left: 18,
//     right: 18,
//     height: 62,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 8,

//     elevation: 5,
//   },

//   backButton: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: "#F5F5F5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   headerTitleContainer: {
//     flex: 1,
//     alignItems: "center",
//   },

//   headerTitle: {
//     fontFamily: "PlusJakarta-SemiBold",
//     fontSize: 16,
//     color: "#111111",
//   },

//   orderNumber: {
//     marginTop: 2,    fontSize: 11,
//     color: "#777777",
//     fontFamily: "PlusJakarta-Regular",
//   },

//   helpButton: {
//     width: 42,
//     height: 42,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   /* MAP BUTTON */

//   centerButton: {
//     position: "absolute",
//     right: 18,
//     bottom: 390,
//     width: 52,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 7,

//     elevation: 6,
//   },

//   /* MARKERS */

//   restaurantMarker: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: "#F2994A",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 3,
//     borderColor: "#FFFFFF",
//   },

//   customerMarker: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: "#333333",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 3,
//     borderColor: "#FFFFFF",
//   },

//   driverMarker: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: "#00A859",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 4,
//     borderColor: "#FFFFFF",

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,

//     elevation: 5,
//   },

//   /* BOTTOM SHEET */

//   bottomSheet: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 0,

//     backgroundColor: "#FFFFFF",

//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,

//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 28,

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -3,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,

//     elevation: 10,
//   },

//   handle: {
//     width: 42,
//     height: 4,
//     borderRadius: 10,
//     backgroundColor: "#D9D9D9",
//     alignSelf: "center",
//     marginBottom: 18,
//   },

//   /* STATUS */

//   statusHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   statusIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: "#00A859",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },

//   statusTextContainer: {
//     flex: 1,
//   },

//   statusTitle: {
//     fontFamily: "PlusJakarta-Bold",
//     fontSize: 16,
//     color: "#111111",
//   },

//   etaText: {
//     marginTop: 3,
//     fontFamily: "PlusJakarta-Regular",
//     fontSize: 12,
//     color: "#777777",
//   },

//   /* PROGRESS */

//   progressContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 22,
//   },

//   progressStep: {
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   progressCircle: {
//     width: 27,
//     height: 27,
//     borderRadius: 14,
//     backgroundColor: "#EEEEEE",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   progressCircleActive: {
//     backgroundColor: "#00A859",
//   },

//   progressLine: {
//     flex: 1,
//     height: 3,
//     backgroundColor: "#EEEEEE",
//     marginHorizontal: 3,
//   },

//   progressLineActive: {
//     backgroundColor: "#00A859",
//   },

//   labelsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 7,
//   },

//   progressLabel: {
//     fontFamily: "PlusJakarta-Regular",
//     fontSize: 7.5,
//     color: "#888888",
//     textAlign: "center",
//   },

//   /* DRIVER */

//   driverCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 18,
//     backgroundColor: "#F8F8F8",
//   },

//   driverAvatar: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: "#E5F7EE",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   driverInfo: {
//     flex: 1,
//     marginLeft: 11,
//   },

//   driverName: {
//     fontFamily: "PlusJakarta-SemiBold",
//     fontSize: 14,
//     color: "#111111",
//   },

//   ratingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 4,
//   },

//   ratingText: {
//     fontFamily: "PlusJakarta-Regular",
//     fontSize: 11,
//     color: "#777777",
//     marginLeft: 4,
//   },

//   driverActions: {
//     flexDirection: "row",
//     gap: 8,
//   },

//   driverAction: {
//     width: 38,
//     height: 38,
//     borderRadius: 13,
//     backgroundColor: "#E5F7EE",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   /* LOCATION */

//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 14,
//   },

//   locationIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 12,
//     backgroundColor: "#E5F7EE",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   locationTextContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },

//   locationTitle: {
//     fontFamily: "PlusJakarta-SemiBold",
//     fontSize: 12,
//     color: "#555555",
//   },

//   locationAddress: {
//     marginTop: 2,
//     fontFamily: "PlusJakarta-Regular",
//     fontSize: 12,
//     color: "#888888",
//   },
// });