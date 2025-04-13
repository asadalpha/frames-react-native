import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { styles } from "@/styles/create.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/theme";

export default function CreateScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  if (!selectImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create</Text>
          <View style={{ width: 28 }}></View>
        </View>

        <TouchableOpacity style={styles.emptyImageContainer}>
          <Ionicons name="image-outline" size={48} color={COLORS.grey} />
          <Text style={styles.emptyImageText}>Tap to select image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
