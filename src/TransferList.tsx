import * as React from "react";
import {useEffect, useState} from "react";
import {Collapse, Menu, TextField} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import TransferListHeader from "./TransferListHeader";
import {Item} from "./Item";
import {TransferMenuItem} from "./TransferMenuItem";
import clsx from "clsx";

type StylesProps = {
  borderWidth: number,
  pageSize: number
};

const useStyles = makeStyles<Theme, StylesProps>((theme: Theme) => ({
  root: {
    borderWidth: props => props.borderWidth,
    borderStyle: "solid",
    borderColor: theme.palette.divider
  },
  body: {
    minHeight: props => props.pageSize * 40,
    padding: 0,
    margin: 0,
  },
  footer: {
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.palette.action.hover,
    borderTopColor: theme.palette.divider,
    borderTopWidth: props => props.borderWidth,
    borderTopStyle: "solid",
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
  searchBorder: {
    borderWidth: props => props.borderWidth,
    borderStyle: "solid",
    borderColor: theme.palette.divider
  },
  button: {
    ...theme.typography.caption,
    color: theme.palette.text.primary,
    textTransform: "none",
    outline: "none",
    border: "none",
    backgroundColor: "transparent"
  },
  menu: {marginTop: 4},
}));

export interface IItem {
  text: string,
  value: any
}

enum EnumMode {
  all,
  onlySelected,
  onlyNotSelected
}

const getFilter = (list: Array<IItem> = [], selectedList: Array<number> = [], mode: EnumMode = EnumMode.all, pageSize: number = 5, search: string = "") => {

  if (mode === EnumMode.onlyNotSelected) {
    return Math.ceil(list.filter(item => selectedList.indexOf(item.value) === -1).filter(item => item.text.search(search) !== -1).length / pageSize);
  } else if (mode === EnumMode.onlySelected) {
    return Math.ceil(list.filter(item => selectedList.indexOf(item.value) !== -1).filter(item => item.text.search(search) !== -1).length / pageSize);
  } else {
    return Math.ceil(list.filter(item => item.text.search(search) !== -1).length / pageSize);
  }
};
const getPage = (list: Array<IItem> = [], selectedList: Array<number> = [], mode: EnumMode = EnumMode.all, pageIndex: number = 0, pageSize: number = 5, search: string = "") => {

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
  borderWidth?: number,
  maximumSelectableItemText?: string,
  buttonCleanAllText?: string,
  buttonSelectAllText?: string,
  searchBoxPlaceholder?: string,
  menuShowAllText?: string,
  menuShowSelectedText?: string,
  menuShowUnselectedText?: string,
  onChange?: any,
  sourceList: Array<IItem>,
  selectedList: Array<number>,
  title?: string,
  pageSize?: number,
  searchIcon?: any,
  menuIcon?: any,
  rightIcon?: any,
  leftIcon?: any,
  maximumSelectableItem?: number,
  readyOnly?: boolean
};

export default function TransferList({
                                       borderWidth = 0,
                                       maximumSelectableItemText = "Maximum selectable item : ",
                                       buttonCleanAllText = "Clean all",
                                       buttonSelectAllText = "Select all",
                                       searchBoxPlaceholder = "Search",
                                       menuShowAllText = "Show all",
                                       menuShowSelectedText = "Show selected",
                                       menuShowUnselectedText = "Show unselected",
                                       onChange = () => [],
                                       sourceList = [],
                                       selectedList = [],
                                       title = "Title",
                                       pageSize = 5,
                                       searchIcon = "S",
                                       menuIcon = "M",
                                       rightIcon = ">",
                                       leftIcon = "<",
                                       maximumSelectableItem = -1,
                                       readyOnly = false
                                     }: TransferListProps) {

  const classes = useStyles({borderWidth: borderWidth, pageSize: pageSize});

  const [state, setState] = useState({
    page: 0,
    list: sourceList,
    search: "",
    activeSearch: false,
    selectedList: selectedList,
    mode: EnumMode.all,
    anchor: null
  });

  const toggleActiveSearch = () => setState({...state, activeSearch: !state.activeSearch});

  // @ts-ignore
  const onChangeText = e => setState({...state, search: e.target.value, page: 0});
  const setMode = (newMode: EnumMode) => setState({...state, mode: newMode, page: 0, anchor: null});
  const nextPage = () => {
    if (state.page + 1 < getFilter(state.list, state.selectedList, state.mode, pageSize)) {
      setState({...state, page: state.page + 1});
    }
  }
  const prevPage = () => {
    if (state.page > 0) {
      setState({...state, page: state.page - 1});
    }
  }
  const onClick = (item: IItem) => {
    if (readyOnly) return;
    if (state.selectedList.indexOf(item.value) !== -1) {
      state.selectedList.splice(state.selectedList.indexOf(item.value), 1);
    } else {
      if (maximumSelectableItem < 0 || (maximumSelectableItem > -1 && state.selectedList.length < maximumSelectableItem)) {
        state.selectedList.push(item.value);
      }
    }
    setState({...state});
  }
  const cleanAll = () => {
    if (readyOnly) return;
    state.page = 0;
    state.mode = EnumMode.onlyNotSelected;
    state.selectedList = [];
    setState({...state});
  }
  const selectAll = () => {
    if (readyOnly) return;
    state.selectedList = state.list.map(item => item.value);
    state.page = 0;
    state.mode = EnumMode.onlySelected;
    setState({...state});
  }
  const closeMenu = () => setState({...state, anchor: null});
  // @ts-ignore
  const toggleMenu = e => setState({...state, anchor: e.target})

  useEffect(() => {
    if (typeof onChange === "function" && !readyOnly && JSON.stringify(state.selectedList) !== JSON.stringify(selectedList)) {
      onChange(state.selectedList)
    }
  }, [selectedList, state, readyOnly, onChange]);

  return (
    <div className={classes.root}>
      <Menu
        className={classes.menu}
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
        onClose={closeMenu}>
        <TransferMenuItem
          text={menuShowAllText}
          selected={state.mode === EnumMode.all}
          onClick={() => setMode(EnumMode.all)}/>
        <TransferMenuItem
          text={menuShowSelectedText}
          selected={state.mode === EnumMode.onlySelected}
          onClick={() => setMode(EnumMode.onlySelected)}/>
        <TransferMenuItem
          text={menuShowUnselectedText}
          selected={state.mode === EnumMode.onlyNotSelected}
          onClick={() => setMode(EnumMode.onlyNotSelected)}/>
      </Menu>

      <div className={classes.header}>
        <TransferListHeader
          menuIcon={menuIcon}
          searchIcon={searchIcon}
          count={state.selectedList.length}
          title={title}
          active={state.activeSearch}
          toggleActive={toggleActiveSearch}
          toggleMenu={toggleMenu}
        />
      </div>
      <div className={clsx(classes.boxSearch, {[classes.searchBorder]: state.activeSearch})}>
        <Collapse in={state.activeSearch}>
          <TextField
            fullWidth
            size={"small"}
            variant="filled"
            placeholder={searchBoxPlaceholder}
            value={state.search}
            onChange={onChangeText}
          />
        </Collapse>
      </div>

      <div className={classes.body}>
        {
          getPage(state.list, state.selectedList, state.mode, state.page, pageSize, state.search).map((item, index) => (
            <Item
              key={"ii-" + index}
              text={item.text}
              onClick={() => onClick(item)}
              showCheck={state.mode === EnumMode.all}
              checked={state.selectedList.indexOf(item.value) !== -1}/>
          ))
        }
      </div>

      <div className={classes.footer}>
        <button onClick={prevPage} className={classes.button}>
          {leftIcon}
        </button>
        <span className={classes.button}>
          {state.page + 1}/ {getFilter(state.list, state.selectedList, state.mode, pageSize, state.search)}
        </span>
        <button onClick={nextPage} className={classes.button}>
          {rightIcon}
        </button>
        <button onClick={cleanAll} className={classes.button}>
          {buttonCleanAllText}
        </button>
        <button disabled={maximumSelectableItem > 0} onClick={selectAll} className={classes.button}>
          {maximumSelectableItem < 0 ? buttonSelectAllText : maximumSelectableItemText + maximumSelectableItem}
        </button>
      </div>
    </div>
  );
}
