import * as React from 'react';
import {Checkbox, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    ...theme.typography.caption,
    padding: 0,
    margin: 0,
    textAlign: "start",
    // flexGrow: 1,
  },
  // button: {
  //   height: 40,
  //   outline: "none",
  //   border: "none",
  //   background: "transparent",
  //   display: "flex",
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   textAlign: "start",
  // },
  checkbox: {padding: 3 , margin : 0}
}));

export type ItemProps = {
  onClick: any,
  checked: boolean,
  text: string,
  showCheck: boolean
};

export function Item({onClick = () => null, text = "", checked = false, showCheck = false}: ItemProps) {

  const classes = useStyles();

  return (
    <ListItem  role="listitem" button onClick={onClick}>
      {showCheck && <ListItemIcon>
        <Checkbox
          className={classes.checkbox}
          size={"small"}
          edge="start"
          color={"primary"}
          checked={checked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>}
      <ListItemText primary={text} primaryTypographyProps={{className:classes.text}} />
    </ListItem>

    // <button type="button" onClick={onClick} className={classes.button}>
    //   {showCheck &&
    //     <Checkbox
    //       className={classes.checkbox}
    //       size={"small"}
    //       edge="start"
    //       color={"primary"}
    //       checked={checked}
    //       tabIndex={-1}
    //       disableRipple
    //     />}
    //   <p className={classes.text}>{text}</p>
    // </button>
  )
}
