
import React from 'react'
import { Redirect, useRouter } from 'expo-router'


export default function Index() {
  const router = useRouter()
  return (
    ///router.replace("/(auth)/login")
    <Redirect href="/login" />
  )
}