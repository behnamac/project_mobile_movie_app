import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrandingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrandingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full " />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-10 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>{moviesError?.message || trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/serach")}
              placeholder="Search for a movie"
            />
            {trendingMovies && (
              <>
                <Text className="mt-10 text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <Text className="text-white text-sm mb-4 mt-3-">
                      {item.title}
                    </Text>
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  showsHorizontalScrollIndicator={false}
                  className="mt-2"
                />
              </>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Lastest Movie
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
