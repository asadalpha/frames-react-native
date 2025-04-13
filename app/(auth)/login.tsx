import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
      });

      // After the user successfully signs in, we navigate
      if (createdSessionId) {
        router.replace("/(tabs)");
      } else {
        // Handle error or unsuccessful login flow
        console.log("Google Sign-In failed.");
      }
    } catch (error) {
      console.log("OAuth Error: " + error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="albums-outline" size={32} color={Colors.white} />
        </View>
        <Text style={styles.appName}>frames</Text>
        <Text style={styles.tagline}>fit with frames</Text>
      </View>
      {/* Illustration Section */}
      <Image
        source={require("@/assets/images/illustration1.png")}
        style={styles.illustration}
      />
      {/* LoginButton Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color="#000" />
          </View>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
