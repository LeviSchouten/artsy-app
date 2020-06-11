import React, { useMemo, forwardRef, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import { Omit } from "@material-ui/types";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles({
  root: {
    width: 360,
  },
});
interface ListItemLinkProps {
  icon: ReactElement;
  primary: string;
  to: string;
}

const ListItemLink = (props: ListItemLinkProps) => {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List aria-label="main">
        <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
        <ListItemLink to="/artists" primary="Artists" icon={<GroupIcon />} />
        <ListItemLink
          to="/articles"
          primary="Articles"
          icon={<DescriptionIcon />}
        />
      </List>
    </div>
  );
};

export default Navbar;
