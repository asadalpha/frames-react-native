import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import InitialLayout from "@/components/initialLauout";

const publishable_key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishable_key) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishable_key} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
          <InitialLayout/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkProvider>


  );
}
