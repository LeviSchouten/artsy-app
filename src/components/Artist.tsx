import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const Artist: React.FC = () => {
  const { id } = useParams();

  const ARTIST = gql`
    query artist($id: String!) {
      artist(id: $id) {
        gender
        name
        alternate_names
        nationality
      }
    }
  `;

  interface Artist {
    name: string;
    gender: string;
    alternate_names?: string[];
    nationality: string;
  }

  const { loading, error, data } = useQuery(ARTIST, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  const artist: Artist = data.artist;

  return (
    <div className="artist">
      <h3>{artist.name}</h3>
      <p>{artist.gender}</p>
      <p>{artist.nationality}</p>
      <p>{artist.alternate_names}</p>
    </div>
  );
};

export default Artist;
