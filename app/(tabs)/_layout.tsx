import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabsIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground source={images.highlight} className="flex  bg-purple-300 flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
        <Image source={icon} className="size-5" tintColor="#151312" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabsIcon title="Home" icon={icons.home} focused={focused} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabsIcon title="Saved" icon={icons.save} focused={focused} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="serach"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabsIcon title="Search" icon={icons.search} focused={focused} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabsIcon title="Profile" icon={icons.person} focused={focused} />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
