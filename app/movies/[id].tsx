import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieDetailsProps {
  label?: string;
  value?: string | number | null;
}
const MovieInfo = ({ label, value }: MovieDetailsProps) => (
  <View className="mt-5 flex-col items-start justify-center">
    <Text className="text-sm font-normal text-light-200">{label}</Text>
    <Text className="text-sm font-bold text-light-100">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string),
  );
  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="h-[550px] w-full rounded-b-3xl bg-light-200"
            resizeMode="cover"
          />
        </View>
        <View className="mt-5 flex-col items-start justify-center px-5">
          <Text className="text-xl font-bold text-white">{movie?.title}</Text>
          <View className="mt-2 flex-row items-center gap-x-1">
            <Text className="text-sm text-light-200">
              {movie?.release_date?.split("_")[0]}
            </Text>
            <Text className="text-sm text-light-200">|</Text>
            <Text className="text-sm text-light-200">{movie?.runtime}m </Text>
          </View>
          <View className="mt-2 flex-row items-center gap-x-1 rounded-md bg-dark-100 px-2 py-1">
            <Image source={icons.star} className="size-4" />
            <Text className="text-sm font-bold text-light-200">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-sm font-bold text-light-200">
              ({movie?.vote_count} votes)
            </Text>
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
          <View className="mt-5 w-1/2 flex-row items-center justify-between">
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
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies &&
              Array.isArray(movie.production_companies)
                ? movie.production_companies
                    .map((company: { name: string }) => company.name)
                    .join(" - ")
                : "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 z-50 mx-5 flex flex-row items-center justify-center rounded-lg bg-purple-400 px-4 py-3.5"
        onPress={router.back}
        style={{ position: "absolute", left: 20, right: 20, bottom: 20 }}
      >
        <Image
          source={icons.arrow}
          className="mr-1 mt-0.5 size-5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-base font-semibold text-white">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
