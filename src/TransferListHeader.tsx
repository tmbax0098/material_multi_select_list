import {IconButton,Box ,Typography,Chip, Badge} from "@material-ui/core";
import * as React from "react";

type Props = {
    title: string,
    count: number,
    chipIcon: any,
    searchIcon: any,
    menuIcon: any,
    searchResetIcon: any
    active: boolean,
    toggleActive: any,
    toggleMenu: any
};
export function TransferListHeader(props: Props) {
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            p={1}>
            <Box flexGrow={1} justifyContent={"flex-start"}>
                <Typography variant={'body1'}> {props.title} </Typography>
            </Box>
            <Box p={1}>
                <Chip
                    icon={props.chipIcon}
                    label={
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            pr={1}>
                            <Box pr={2}>
                                <Typography variant={'caption'}>
                                    Selected items
                                </Typography>
                            </Box>
                            <Box>
                                <Badge
                                    showZero={true}
                                    badgeContent={props.count}
                                    color="primary"/>
                            </Box>
                        </Box>
                    }
                />
            </Box>
            <Box>
                <IconButton
                    size={"small"}
                    onClick={props.toggleActive}>
                    {props.active ? props.searchResetIcon : props.searchIcon}
                </IconButton>
            </Box>
            <Box>
                <IconButton
                    size={"small"}
                    onClick={props.toggleMenu}>
                    {props.menuIcon}
                </IconButton>
            </Box>
        </Box>
    )
};
