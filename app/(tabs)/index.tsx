import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-center text-dark-200">
        Welcome!
      </Text>
      <Link href="/onBoarding">on onBoarding</Link>
      <Link href={{ pathname: "/movies/[id]", params: { id: "Avengers" } }}>
        Avengers Movie
      </Link>
    </View>
  );
}
