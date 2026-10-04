import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const RADIUS = 32;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#34C759",
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
        tabBarShowLabel: true,

        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 20,
          height: 65,

          borderRadius: RADIUS,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.18)",

          // Completely transparent base
          backgroundColor: "transparent",

          elevation: 0,

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
        },

        tabBarBackground: () => (
          <View style={styles.glassClip}>
            <BlurView
              intensity={35}
              tint="dark"
              blurMethod="dimezisBlurView"
              style={StyleSheet.absoluteFill}
            />

            {/* Very subtle glass edge */}
            <View style={styles.glassBorder} />

            {/* Tiny top reflection */}
            <View style={styles.topHighlight} />
          </View>
        ),

        tabBarItemStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="food/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="restaurant/[id]"
        options={{
          href: null,
        }}
      />
   <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

         <Tabs.Screen
        name="orders"
        options={{
          title: "orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glassClip: {
    ...StyleSheet.absoluteFill,
    borderRadius: RADIUS,
    overflow: "hidden",
  },

  glassBorder: {
    ...StyleSheet.absoluteFill,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  topHighlight: {
    position: "absolute",
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
});
