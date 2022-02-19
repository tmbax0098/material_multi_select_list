import * as React from "react";
import {MenuItem} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: theme.typography.caption
}));

type Props = {
  selected: boolean,
  text: string,
  onClick: any
};

export function TransferMenuItem({text = "", onClick, selected = false}: Props) {
  const classes = useStyles();
  return (<MenuItem selected={selected} onClick={onClick} className={classes.root}>{text}</MenuItem>);
}
