import { useAuth } from "@/lib/AuthContext";
import { getCachedIntroSeen, readIntroSeen } from "@/lib/intro";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const { session, isGuest } = useAuth();

  // Synchronous seed — _layout already read this before Slot rendered.
  const [introSeen, setIntroSeen] = useState<boolean | null>(
    getCachedIntroSeen(),
  );

  useEffect(() => {
    if (introSeen !== null) return;
    let alive = true;
    readIntroSeen().then((v) => {
      if (alive) setIntroSeen(v);
    });
    return () => {
      alive = false;
    };
  }, [introSeen]);

  // Should never hit this — _layout gates on introSeen before rendering us.
  if (introSeen === null) return null;

  if (session || isGuest) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href={introSeen ? "/(auth)/login" : "/splash"} />;
}
