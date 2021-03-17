import { Box, Chip, IconButton, Typography } from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";

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
  title,
  count,
  active,
  menuIcon,
  searchIcon,
  toggleActive,
  toggleMenu
}) => {

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      pl={1}
      pr={1}>
      <Box flexGrow={1}>
        <Typography variant={'body1'} align={"left"}> {title} </Typography>
      </Box>
      <Box>
        <Chip color="primary" label={count} />
      </Box>
      <Box>
        <IconButton
          disableFocusRipple
          disableRipple
          disableTouchRipple
          color={active ? "primary" : "inherit"}
          size={"medium"}
          onClick={toggleActive}>
          {searchIcon}
        </IconButton>
      </Box>
      <Box>
        <IconButton
          disableFocusRipple
          disableRipple
          disableTouchRipple
          color="inherit"
          size={"medium"}
          onClick={toggleMenu}>
          {menuIcon}
        </IconButton>
      </Box>
    </Box>
  )

}

TransferListHeader.propTypes = {
  title: PropTypes.any,
  count: PropTypes.any,
  searchIcon: PropTypes.any,
  menuIcon: PropTypes.any,
  active: PropTypes.any,
  toggleActive: PropTypes.func,
  toggleMenu: PropTypes.func
};
TransferListHeader.defaultProps = {
  title: "",
  count: 0,
  searchIcon: "search",
  menuIcon: "menu",
  active: false,
  toggleActive: () => null,
  toggleMenu: () => null

};

export default TransferListHeader;
