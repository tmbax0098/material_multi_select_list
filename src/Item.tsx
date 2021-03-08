import * as React from 'react';
import {Checkbox, ListItem , Typography} from "@material-ui/core";
type Props = {
    onClick: any,
    checked: boolean,
    text: string
};
export function Item(props: Props) {
    return (
        <ListItem dense onClick={props.onClick} button>
            <Checkbox
                style={{padding: 3}}
                size={"small"}
                edge="start"
                checked={props.checked}
                tabIndex={-1}
                disableRipple
            />
            <Typography variant={"caption"}>{props.text}</Typography>
        </ListItem>
    )
};
