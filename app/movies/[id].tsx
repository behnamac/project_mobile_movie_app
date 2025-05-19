import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieDetailsProps {
  label?: string;
  value?: string | number | null;
}
const MovieInfo = ({ label, value }: MovieDetailsProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px] bg-light-200 rounded-b-3xl"
            resizeMode="cover"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("_")[0]}
            </Text>
            <Text className="text-light-200 text-sm">|</Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-light-200 text-sm font-bold">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm font-bold">
              ({movie?.vote_count} votes)
            </Text>{" "}
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres && Array.isArray(movie.genres)
                ? movie.genres
                    .map((genre: { name: string }) => genre.name)
                    .join(" - ")
                : "N/A"
            }
          />
          <MovieInfo
            label="Budget"
            value={
              typeof movie?.budget === "number"
                ? `$${(movie.budget / 1_000_000).toFixed(1)}M`
                : "N/A"
            }
          />
          <MovieInfo
            label="Revenue"
            value={
              typeof movie?.revenue === "number"
                ? `$${Math.round(movie.revenue / 1_000_000)}M`
                : "N/A"
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
