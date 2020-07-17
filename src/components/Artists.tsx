import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Box,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Loading from "./Loading";

const ARTISTS = gql`
  query artists($page: Int!) {
    artists(page: $page) {
      name
      bio
      birthday
      nationality
      _id
    }
  }
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Artists: React.FC = () => {
  const history = useHistory();

  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { loading, error, data } = useQuery(ARTISTS, {
    variables: { page },
  });

  const handleRowClick = (id: string) => {
    history.push("/artist/" + id);
  };

  interface Artist {
    [index: string]: string;
    name: string;
    _id: string;
    bio: string;
    birthday: string;
    nationality: string;
  }

  if (loading) return <Loading />;
  if (error) return <p>Something went wrong...</p>;

  const artists: Artist[] = data.artists;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artists</TableCell>
            <TableCell>Bio</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((artist: Artist) => {
            return (
              <TableRow
                key={artist._id}
                hover
                onClick={() => handleRowClick(artist._id)}
              >
                <TableCell>{artist.name || "n/a"}</TableCell>
                <TableCell>{artist.bio || "n/a"}</TableCell>
                <TableCell>{artist.birthday || "n/a"}</TableCell>
                <TableCell>{artist.nationality || "n/a"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="flex-end" m={1}>
        <IconButton disabled={page === 1} onClick={() => setPage(page - 1)}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={() => setPage(page + 1)}>
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </TableContainer>
  );
};

export default Artists;
