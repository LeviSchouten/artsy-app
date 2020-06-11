import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Artists: React.FC = () => {
  const [page, setPage] = useState(1);

  const ARTISTS = gql`
    {
      artists(page: ${page}) {
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(ARTISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="artists">
      {data.artists.map((artist: { name: string }, i: number) => (
        <div key={i}>
          <p>{artist.name}</p>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)}>prev</button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  );
};

export default Artists;
