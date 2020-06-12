import React, { useState, ChangeEvent } from "react";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

const Search: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const SEARCH = gql`
    query artists($slugs: [String]) {
      artists(slugs: $slugs) {
        _id
      }
    }
  `;

  const client = useApolloClient();

  const handleSubmit = (event: any) => {
    if (event.key !== "Enter") return;
    const slugs = search.toLowerCase().split(" ").join("-");
    client
      .query({
        query: SEARCH,
        variables: { slugs },
      })
      .then(({ data }) => {
        history.push("/artists/" + data.artists[0]._id);
        setSearch("");
      })
      .catch(() => {
        history.push("/artists/404");
        setSearch("");
      });
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        value={search}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={handleChange}
        onKeyPress={handleSubmit}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default Search;
