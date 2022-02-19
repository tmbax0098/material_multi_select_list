import * as React from 'react';
import {Checkbox} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    ...theme.typography.body1,
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  button: {
    height: 40,
    width: '100%',
    outline: "none",
    border: "none",
    background: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {padding: 3}
}));

export type ItemProps = {
  onClick: any,
  checked: boolean,
  text: string
};

export function Item({onClick = () => null, text = "", checked = false}: ItemProps) {

  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.button}>
      <Checkbox
        className={classes.checkbox}
        size={"small"}
        edge="start"
        checked={checked}
        tabIndex={-1}
        disableRipple
      />
      <p className={classes.text}>{text}</p>
    </button>
  )
}
