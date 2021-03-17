import * as React from "react";
import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  List,
  Menu,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TransferListHeader from "./TransferListHeader";
import { Item } from "./Item";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: 0,
      margin: 0,
    },
    footer: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.divider
    },
    header: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.action.hover
    },
    boxSearch: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.action.hover,
      borderBottomColor: theme.palette.divider
    },
    buttonText: {
      textTransform: "none"
    }
  }),
);

export interface IItem {
  text: string,
  value: any
}

enum EnumMode {
  all,
  onlySelected,
  onlyNotSelected
}

const getFilter = (list: Array<IItem> = [], selectedList: Array<IItem> = [], mode: EnumMode = EnumMode.all, pageSize: number = 5, search: string = "") => {

  if (mode === EnumMode.onlyNotSelected) {
    return Math.ceil(list.filter(item => selectedList.indexOf(item.value) === -1).filter(item => item.text.search(search) !== -1).length / pageSize);
  } else if (mode === EnumMode.onlySelected) {
    return Math.ceil(list.filter(item => selectedList.indexOf(item.value) !== -1).filter(item => item.text.search(search) !== -1).length / pageSize);
  } else {
    return Math.ceil(list.filter(item => item.text.search(search) !== -1).length / pageSize);
  }
};
const getPage = (list: Array<IItem> = [], selectedList: Array<IItem> = [], mode: EnumMode = EnumMode.all, pageIndex: number = 0, pageSize: number = 5, search: string = "") => {

  let startIndex = pageIndex * pageSize;
  let endIndex = (pageIndex + 1) * pageSize;

  let arr: Array<IItem> = [];

  if (mode === EnumMode.onlyNotSelected) {
    arr.push(...list.filter(item => selectedList.indexOf(item.value) === -1))
  } else if (mode === EnumMode.onlySelected) {
    arr.push(...list.filter(item => selectedList.indexOf(item.value) !== -1))
  } else {
    arr.push(...list);
  }


  return arr.filter(item => item.text.search(search) !== -1).slice(startIndex, endIndex);
};

export type TransferListProps = {
  borderWidth: number,
  maximumSelectableItemText: string,
  buttonCleanAllText: string,
  buttonSelectAllText: string,
  searchBoxPlaceholder: string,
  menuShowAllText: string,
  menuShowSelectedText: string,
  menuShowUnselectedText: string,
  onChange: any,
  sourceList: Array<IItem>,
  selectedList: Array<IItem>,
  title: string,
  pageSize: number,
  searchIcon: any,
  menuIcon: any,
  rightIcon: any,
  leftIcon: any,
  maximumSelectableItem: number,
  readyOnly: boolean
};

export type TransferMenuItemProps = {
  selected: boolean,
  text: string,
  onClick: any
};

function TransferMenuItem(props: TransferMenuItemProps) {
  return (<MenuItem selected={props.selected} onClick={props.onClick}>
    <Typography variant={"caption"}>
      {props.text}
    </Typography>
  </MenuItem>);
}


export default function TransferList(props: TransferListProps) {

  const classes = useStyles();

  const [state, setState] = useState({
    page: 0,
    list: props.sourceList,
    search: "",
    activeSearch: false,
    selectedList: props.selectedList,
    mode: EnumMode.all,
    anchor: null
  });

  const toggleActiveSearch = () => setState({ ...state, activeSearch: !state.activeSearch });

  // @ts-ignore
  const onChangeText = e => setState({ ...state, search: e.target.value });
  const setMode = (newMode: EnumMode) => setState({ ...state, mode: newMode, page: 0, anchor: null });
  const nextPage = () => {
    if (state.page + 1 < getFilter(state.list, state.selectedList, state.mode, props.pageSize)) {
      setState({ ...state, page: state.page + 1 });
    }
  }
  const prevPage = () => {
    if (state.page > 0) {
      setState({ ...state, page: state.page - 1 });
    }
  }
  const onClick = (item: IItem) => {
    if (props.readyOnly) return;
    if (state.selectedList.indexOf(item.value) !== -1) {
      state.selectedList.splice(state.selectedList.indexOf(item.value), 1);
    } else {
      if (props.maximumSelectableItem < 0 || (props.maximumSelectableItem > -1 && state.selectedList.length < props.maximumSelectableItem)) {
        state.selectedList.push(item.value);
      }
    }
    setState({ ...state });
  }
  const cleanAll = () => {
    if (props.readyOnly) return;
    state.page = 0;
    state.mode = EnumMode.onlyNotSelected;
    state.selectedList = [];
    setState({ ...state });
  }
  const selectAll = () => {
    if (props.readyOnly) return;
    state.selectedList = state.list.map(item => item.value);
    state.page = 0;
    state.mode = EnumMode.onlySelected;
    setState({ ...state });
  }
  // @ts-ignore
  const toggleMenu = e => setState({ ...state, anchor: e.target })

  useEffect(() => {
    if (typeof props.onChange === "function" && !props.readyOnly && JSON.stringify(state.selectedList) !== JSON.stringify(props.selectedList)) {
      props.onChange(state.selectedList)
    }
  }, [props, state]);

  return (
    <Box border={props.borderWidth} borderColor="divider">
      <Menu
        style={{ marginTop: 4 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={state.anchor}
        open={Boolean(state.anchor)}
        onClose={() => setState({ ...state, anchor: null })}>

        <TransferMenuItem
          text={props.menuShowAllText}
          selected={state.mode === EnumMode.all}
          onClick={() => setMode(EnumMode.all)} />
        <TransferMenuItem
          text={props.menuShowSelectedText}
          selected={state.mode === EnumMode.onlySelected}
          onClick={() => setMode(EnumMode.onlySelected)} />
        <TransferMenuItem
          text={props.menuShowUnselectedText}
          selected={state.mode === EnumMode.onlyNotSelected}
          onClick={() => setMode(EnumMode.onlyNotSelected)} />

      </Menu>

      <Box className={classes.header}>
        <TransferListHeader
          menuIcon={props.menuIcon}
          searchIcon={props.searchIcon}
          count={state.selectedList.length}
          title={props.title}
          active={state.activeSearch}
          toggleActive={toggleActiveSearch}
          toggleMenu={toggleMenu}
        />
      </Box>
      <Box
        borderBottom={state.activeSearch ? 0 : props.borderWidth}
        className={classes.boxSearch}>
        <Collapse in={state.activeSearch}>
          <TextField
            fullWidth
            size={"small"}
            variant="filled"
            placeholder={props.searchBoxPlaceholder}
            value={state.search}
            onChange={onChangeText}
          />
        </Collapse>
      </Box>

      <Box className={classes.body} style={{ minHeight: props.pageSize * 40 }}>
        <List>
          {
            getPage(state.list, state.selectedList, state.mode, state.page, props.pageSize, state.search).map((item, index) => (
              <Item
                key={"item_index_" + index}
                text={item.text}
                onClick={() => onClick(item)}
                checked={state.selectedList.indexOf(item.value) !== -1} />
            ))
          }
        </List>
      </Box>

      <Box className={classes.footer} borderTop={props.borderWidth}>
        <ButtonGroup variant={"text"} size={"small"} color={"default"}>
          <Button onClick={prevPage}>
            {props.leftIcon}
          </Button>
          <Button disabled>
            <Typography
              className={classes.buttonText}
              variant={"caption"}>
              {state.page + 1}/ {getFilter(state.list, state.selectedList, state.mode, props.pageSize, state.search)}
            </Typography>
          </Button>
          <Button onClick={nextPage}>
            {props.rightIcon}
          </Button>

          <Button onClick={cleanAll}>
            <Typography
              className={classes.buttonText}
              variant={"caption"}>
              {props.buttonCleanAllText}
            </Typography>
          </Button>

          <Button
            disabled={props.maximumSelectableItem > 0}
            onClick={selectAll}>
            <Typography className={classes.buttonText} variant={"caption"}>
              {props.maximumSelectableItem < 0 ? props.buttonSelectAllText : props.maximumSelectableItemText + props.maximumSelectableItem}
            </Typography>
          </Button>

        </ButtonGroup>
      </Box>
    </Box>
  );
}

TransferList.propTypes = {
  borderWidth: PropTypes.number,
  maximumSelectableItemText: PropTypes.string,
  buttonCleanAllText: PropTypes.string,
  buttonSelectAllText: PropTypes.string,
  searchBoxPlaceholder: PropTypes.string,
  menuShowAllText: PropTypes.string,
  menuShowSelectedText: PropTypes.string,
  menuShowUnselectedText: PropTypes.string,
  onChange: PropTypes.func,
  sourceList: PropTypes.array,
  selectedList: PropTypes.array,
  title: PropTypes.string,
  pageSize: PropTypes.number,
  searchIcon: PropTypes.any,
  menuIcon: PropTypes.any,
  rightIcon: PropTypes.any,
  leftIcon: PropTypes.any,
  maximumSelectableItem: PropTypes.number,
  readyOnly: PropTypes.bool
};
TransferList.defaultProps = {
  borderWidth: 0,
  maximumSelectableItemText: "Maximum selectable item : ",
  buttonCleanAllText: "Clean all",
  buttonSelectAllText: "Select all",
  searchBoxPlaceholder: "Search",
  menuShowAllText: "Show all",
  menuShowSelectedText: "Show selected",
  menuShowUnselectedText: "Show unselected",
  onChange: () => [],
  sourceList: [],
  selectedList: [],
  title: "Title",
  pageSize: 5,
  searchIcon: "S",
  menuIcon: "M",
  rightIcon: ">",
  leftIcon: "<",
  maximumSelectableItem: -1,
  readyOnly: false
}
