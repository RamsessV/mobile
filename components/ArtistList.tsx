import React from "react";
import { Artist } from "@/types/artist";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ArtistBox from "./ArtistBox";

export default function ArtistList({artists}: {artists: Artist[]}) {
  const router = useRouter();

  const handlePress = (artist: Artist) => {
    router.push({
      pathname: "./ArtistDetailView",
      params: { id: artist.id, name: artist.name, image: artist.image }
    });
  }
  return (
    <View>
      <FlatList
      data={artists}
      keyExtractor={(item, index) => `artist-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
        onPress={() => handlePress(item)}
        testID={`artist-box-${item.name}`}
          >
          <ArtistBox artist={item}  />
        </TouchableOpacity>
      )}
      >
      </FlatList>
    </View>
  );
}