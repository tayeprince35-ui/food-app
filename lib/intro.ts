import AsyncStorage from "@react-native-async-storage/async-storage";

const INTRO_KEY = "hasSeenIntro";

let cachedValue: boolean | null = null;
let cachedPromise: Promise<boolean> | null = null;

// Synchronous read — safe to call after readIntroSeen() resolves once.
export function getCachedIntroSeen(): boolean | null {
  return cachedValue;
}

// Async read — caches so both _layout and index share the same promise.
export function readIntroSeen(): Promise<boolean> {
  if (cachedValue !== null) return Promise.resolve(cachedValue);
  if (!cachedPromise) {
    cachedPromise = AsyncStorage.getItem(INTRO_KEY)
      .then((v) => {
        cachedValue = v === "true";
        return cachedValue;
      })
      .catch(() => {
        cachedValue = false;
        return false;
      });
  }
  return cachedPromise;
}

export function writeIntroSeen(value: boolean): Promise<void> {
  cachedValue = value;
  cachedPromise = Promise.resolve(value);
  return AsyncStorage.setItem(INTRO_KEY, value ? "true" : "false").catch(
    () => {},
  );
}
