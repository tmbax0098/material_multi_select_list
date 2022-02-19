import {Chip} from "@material-ui/core";
import * as React from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(0, 1)
  },
  title: {
    padding: 0,
    margin: 0,
    ...theme.typography.body1,
    flexGrow: 1,
  },
  active: {
    color: theme.palette.primary.main
  },
  button: {
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export type TransferListHeaderProps = {
  title: string,
  count: number,
  searchIcon: any,
  menuIcon: any,
  active: boolean,
  toggleActive: any,
  toggleMenu: any
};

const TransferListHeader: React.FC<TransferListHeaderProps> = ({
                                                                 title = "",
                                                                 count = 0,
                                                                 active = false,
                                                                 menuIcon = "menu",
                                                                 searchIcon = "search",
                                                                 toggleActive = () => null,
                                                                 toggleMenu = () => null
                                                               }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h6 className={classes.title}>{title}</h6>
      <Chip color="primary" label={count}/>
      <button className={clsx(classes.button, {[classes.active]: active})} onClick={toggleActive}>
        {searchIcon}
      </button>
      <button className={classes.button} onClick={toggleMenu}>
        {menuIcon}
      </button>
    </div>
  )

}

export default TransferListHeader;
