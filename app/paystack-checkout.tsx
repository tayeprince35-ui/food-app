import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function PaystackCheckout() {
  const { url, reference } = useLocalSearchParams<{
    url: string;
    reference: string;
  }>();
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    router.replace({ pathname: "/payment-result", params: { reference } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0D0C" }}>
      <TouchableOpacity onPress={finish} style={{ padding: 14 }}>
        <Text style={{ color: "#fff" }}>Close</Text>
      </TouchableOpacity>

      <WebView
        source={{ uri: url }}
        onNavigationStateChange={(s) => {
          if (
            s.url.includes("standard.paystack.co/close") ||
            s.url.includes("trxref=") ||
            s.url.includes("reference=")
          ) {
            finish();
          }
        }}
      />
    </SafeAreaView>
  );
}