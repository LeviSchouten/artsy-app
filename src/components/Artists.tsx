import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const Artists: React.FC = () => {
  const [page, setPage] = useState(1);

  const ARTISTS = gql`
    query artists($page: Int!) {
      artists(page: $page) {
        name
        _id
      }
    }
  `;

  const { loading, error, data } = useQuery(ARTISTS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  interface Artist {
    name: string;
    _id: string;
  }

  return (
    <div className="artists">
      {data.artists.map((artist: Artist) => (
        <div key={artist._id}>
          <Link to={`/artists/${artist._id}`}>{artist.name}</Link>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)}>prev</button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  );
};

export default Artists;
