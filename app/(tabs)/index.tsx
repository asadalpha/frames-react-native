import React from 'react'
import { Link, Redirect } from 'expo-router'
import { View } from 'react-native'
import { styles } from "@/styles/auth.styles"

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={"/notification"}>
        Home page
      </Link>
    </View>
  )
}