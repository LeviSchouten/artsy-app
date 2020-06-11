import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const Articles: React.FC = () => {
  const [page, setPage] = useState(1);

  const ARTICLES = gql`
    {
      articles {
        title
        author {
          name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(ARTICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  interface Article {
    title: string;
    author: { name: string };
  }

  return (
    <div className="articles">
      {data.articles.map((article: Article, i: number) => (
        <div key={i}>
          <h3>{article.title}</h3>
          <p>{article.author.name}</p>
        </div>
      ))}
      <button onClick={() => setPage(page - 1)}>prev</button>
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  );
};

export default Articles;
