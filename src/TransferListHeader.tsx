import {Badge, Box, Chip, IconButton, Typography} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";

export type TransferListHeaderProps = {
  title: string,
  chipText: string,
  count: number,
  chipIcon: any,
  searchIcon: any,
  menuIcon: any,
  searchResetIcon: any
  active: boolean,
  toggleActive: any,
  toggleMenu: any
};

const TransferListHeader: React.FC<TransferListHeaderProps> = ({
                                                                        title,
                                                                        chipText,
                                                                        count,
                                                                        chipIcon,
                                                                        active,
                                                                        menuIcon,
                                                                        searchIcon,
                                                                        searchResetIcon,
                                                                        toggleActive,
                                                                        toggleMenu
                                                                      }) => {

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      p={1}>
      <Box flexGrow={1}>
        <Typography variant={'body1'} align={"left"}> {title} </Typography>
      </Box>
      <Box p={1}>
        <Chip
          icon={chipIcon}
          label={
            <Box
              display={"flex"}
              flexDirection={"row"}
              pr={1}>
              <Box pr={2}>
                <Typography variant={'caption'}>
                  {chipText}
                </Typography>
              </Box>
              <Box>
                <Badge
                  showZero={true}
                  badgeContent={count}
                  color="primary"/>
              </Box>
            </Box>
          }
        />
      </Box>
      <Box>
        <IconButton
          size={"small"}
          onClick={toggleActive}>
          {active ? searchResetIcon : searchIcon}
        </IconButton>
      </Box>
      <Box>
        <IconButton
          size={"small"}
          onClick={toggleMenu}>
          {menuIcon}
        </IconButton>
      </Box>
    </Box>
  )

}

TransferListHeader.propTypes = {
  title: PropTypes.any,
  chipText: PropTypes.any,
  count: PropTypes.any,
  chipIcon: PropTypes.any,
  searchIcon: PropTypes.any,
  menuIcon: PropTypes.any,
  searchResetIcon: PropTypes.any,
  active: PropTypes.any,
  toggleActive: PropTypes.func,
  toggleMenu: PropTypes.func
};
TransferListHeader.defaultProps = {
  title: "",
  chipText: "Selected items",
  count: 0,
  chipIcon: null,
  searchIcon: "search",
  menuIcon: "menu",
  searchResetIcon: "X",
  active: false,
  toggleActive: () => null,
  toggleMenu: () => null

};

export default TransferListHeader;
