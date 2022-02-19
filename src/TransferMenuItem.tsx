import * as React from "react";
import {MenuItem} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: theme.typography.caption

}));

export type TransferMenuItemProps = {
  selected: boolean,
  text: string,
  onClick: any
};

export function TransferMenuItem(props: TransferMenuItemProps) {
  const classes = useStyles();
  return (<MenuItem selected={props.selected} onClick={props.onClick} className={classes.root}>{props.text}</MenuItem>);
}
