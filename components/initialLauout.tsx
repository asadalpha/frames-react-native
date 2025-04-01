import { useSegments } from "expo-router";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { Stack } from "expo-router"; // Import Stack component for screen navigation

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const inAuthScreen = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isLoaded]); // Adding dependencies to useEffect

  // If not loaded, don't render anything
  if (!isLoaded) {
    return null;
  }

  // You can add your Stack navigation here
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define your screen components */}
    </Stack>
  );
}
