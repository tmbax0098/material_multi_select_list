import * as React from "react";
import { MenuItem, Typography } from "@material-ui/core";


export type TransferMenuItemProps = {
  selected: boolean,
  text: string,
  onClick: any
};

export function TransferMenuItem(props: TransferMenuItemProps) {
  return (<MenuItem selected={props.selected} onClick={props.onClick}>
    <Typography variant={"caption"}>
      {props.text}
    </Typography>
  </MenuItem>);
}
