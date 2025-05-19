import { View, Text,Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Saved = () => {
  return (
    <View className="flex-1 bg-primary px-10">
          <View className="flex flex-1 flex-col items-center justify-center gap-5">
            <Image source={icons.save} className="size-10" tintColor="#FFF" />
            <Text className="text-base text-gray-500">Saved</Text>
          </View>
        </View>
  )
}

export default Saved