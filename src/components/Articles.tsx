import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@material-ui/core";
import Loading from "./Loading";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Articles: React.FC = () => {
  const classes = useStyles();

  const ARTICLES = gql`
    {
      articles {
        id
        title
        href
        author {
          name
        }
        published_at
      }
    }
  `;

  const handleRowClick = (href: string) => {
    window.location.assign("https://www.artsy.net" + href);
  };

  const { loading, error, data } = useQuery(ARTICLES);

  if (loading) return <Loading />;
  if (error) return <p>Something went wrong...</p>;

  interface Article {
    id: string;
    title: string;
    author: { name: string };
    href: string;
    published_at: string;
  }

  const articles: Article[] = data.articles;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Articles</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article: Article) => {
            return (
              <TableRow
                key={article.id}
                hover
                onClick={() => handleRowClick(article.href)}
              >
                <TableCell>{article.title || "n/a"}</TableCell>
                <TableCell>{article.author.name || "n/a"}</TableCell>
                <TableCell>{article.published_at || "n/a"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Articles;
