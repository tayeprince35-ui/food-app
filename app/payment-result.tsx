import { functionError } from "@/lib/orders";
import { supabase } from "@/lib/supabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentResult() {
  const { reference, trxref } = useLocalSearchParams<{
    reference?: string;
    trxref?: string;
  }>();
  const ref = reference ?? trxref;

  const [failed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [retry, setRetry] = useState<{ orderId: string; total: string } | null>(
    null,
  );

  useEffect(() => {
    const run = async () => {
      if (!ref) {
        setFailed(true);
        setMessage("Missing payment reference.");
        return;
      }
      try {
        await supabase.auth.getSession(); // make sure the session is restored
        const { data, error } = await supabase.functions.invoke(
          "paystack-verify",
          { body: { reference: ref } },
        );
        if (error) throw new Error(await functionError(error));
        if (data?.error) throw new Error(data.error);

        if (data.status === "paid") {
          router.replace({
            pathname: "/confirmation",
            params: { orderId: String(data.orderId) },
          });
          return;
        }

        // not paid: let the user try again
        const { data: order } = await supabase
          .from("orders")
          .select("id, total")
          .eq("id", data.orderId)
          .single();
        if (order) {
          setRetry({ orderId: String(order.id), total: String(order.total) });
        }
        setFailed(true);
        setMessage(
          data.status === "abandoned"
            ? "The payment was not completed."
            : `Payment ${data.status}.`,
        );
      } catch (e) {
        console.error("VERIFY ERROR:", e);
        setFailed(true);
        setMessage((e as Error).message);
      }
    };
    run();
  }, [ref]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0B0D0C",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0B0D0C" />
      {!failed ? (
        <>
          <ActivityIndicator size="large" color="#22C55E" />
          <Text style={{ color: "#FFF", marginTop: 16, fontSize: 16 }}>
            Confirming your payment...
          </Text>
        </>
      ) : (
        <>
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "700" }}>
            Payment not confirmed
          </Text>
          <Text
            style={{ color: "#8E938F", marginTop: 8, textAlign: "center" }}
          >
            {message}
          </Text>

          {retry && (
            <TouchableOpacity
              style={{
                backgroundColor: "#22C55E",
                borderRadius: 30,
                height: 52,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 24,
              }}
              onPress={() =>
                router.replace({
                  pathname: "/payment",
                  params: { orderId: retry.orderId, amount: retry.total },
                })
              }
            >
              <Text style={{ color: "#FFF", fontWeight: "700" }}>
                Try again
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{ marginTop: 16 }}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={{ color: "#8E938F" }}>Back to home</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}