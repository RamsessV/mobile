import React, {useState, useEffect} from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { getMusicData } from "./api-client";
import ArtistList from "../components/ArtistList";  
import { Artist } from "@/types/artist";

const MainContainer = styled(View)`
    flex: 1;
    background-color: #fff;
`;

export default function Home() {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        getMusicData()
        .then(setArtists)
        .catch(error => console.error("Error fetching music data:", error));
    }, []);

    return (
        <MainContainer>
            {artists && <ArtistList artists={artists} />}
        </MainContainer>
    );

}