import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Typography,
  Container,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Loading from "./Loading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
    text: {
      margin: theme.spacing(3),
    },
    large: {
      width: theme.spacing(17),
      height: theme.spacing(17),
    },
    paper: {
      height: theme.spacing(5),
    },
  })
);

const Artist: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [page, setPage] = useState(1);

  const ARTIST = gql`
    query artist($id: String!, $page: Int!) {
      artist(id: $id) {
        name
        birthday
        gender
        imageUrl
        nationality
        bio
        articles {
          author {
            name
          }
          slug
          title
          id
        }
        artworks(page: $page) {
          date
          displayLabel
        }
      }
    }
  `;

  interface Article {
    author: { name: string };
    slug: string;
    title: string;
    id: string;
  }

  interface Artwork {
    date: string;
    displayLabel: string;
    _id: string;
  }
  interface Artist {
    name: string;
    birthday: string;
    gender: string;
    imageUrl: string;
    nationality: string;
    bio: string;
    articles: Article[];
    artworks: Artwork[];
  }

  const { loading, error, data } = useQuery(ARTIST, {
    variables: { id, page },
  });

  console.log(error);

  if (id === "404") return <div>Artist not found...</div>;
  if (loading) return <Loading />;
  if (error) return <div>Something went wrong...</div>;

  const artist: Artist = data.artist;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.root}>
        <Avatar
          alt={artist.name}
          src={artist.imageUrl}
          className={classes.large}
        />
        <Container className={classes.text}>
          <Typography variant="h4">{artist.name}</Typography>
          <Typography variant="subtitle2">{artist.bio}</Typography>
          <Typography variant="subtitle1">{artist.nationality}</Typography>
          <Typography variant="overline">{artist.birthday}</Typography>
        </Container>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Move to seperate component */}
        {artist.artworks.length === 0 ? (
          <Typography variant="subtitle1" className={classes.text}>
            No artworks found for this artist
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Artworks</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artist.artworks.map((artwork: Artwork) => {
                  return (
                    <TableRow key={artwork._id}>
                      <TableCell>{artwork.displayLabel}</TableCell>
                      <TableCell>{artwork.date}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {/* Move to seperate component */}
        {artist.articles.length === 0 ? (
          <Typography variant="subtitle1" className={classes.text}>
            No articles found for this artist
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Articles</TableCell>
                  <TableCell>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {artist.articles.map((article: Article) => {
                  return (
                    <TableRow key={article.id}>
                      <TableCell>{article.title}</TableCell>
                      <TableCell>{article.author.name}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default Artist;
