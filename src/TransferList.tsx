import * as React from "react";
import {useEffect, useState} from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  Menu,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import ConditionRender from "./ConditionRender";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TransferListHeader} from "./TransferListHeader";
import {Item} from "./Item";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
    cardHeader: {
      padding: 0,
      backgroundColor: theme.palette.action.hover
    },
    cardContent: {
      padding: 0,
    },

    cardActions: {
      padding: 0,
      backgroundColor: theme.palette.action.hover
    },

    textField: {
      backgroundColor: theme.palette.background.default
    }
  }),
);

export interface IItem {
  text: string,
  value: any
};

enum EnumMode {
  all,
  onlySelected,
  onlyNotSelected
};
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

type Props = {
  onChange: any,
  sourceList: Array<IItem>,
  selectedList: Array<IItem>,
  title: string,
  pageSize: number,
  chipIcon: any,
  searchIcon: any,
  menuIcon: any,
  rightIcon: any,
  leftIcon: any,
  searchResetIcon: any
};
export default function TransferList(props: Props) {

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

  const toggleActiveSearch = () => setState({...state, activeSearch: !state.activeSearch});

  // @ts-ignore
  const onChangeText = e => setState({...state, search: e.target.value});
  const setMode = (newMode: EnumMode) => setState({...state, mode: newMode, page: 0, anchor: null});
  const nextPage = () => {
    if (state.page + 1 < getFilter(state.list, state.selectedList, state.mode, props.pageSize)) {
      setState({...state, page: state.page + 1});
    }
  }
  const prevPage = () => {
    if (state.page > 0) {
      setState({...state, page: state.page - 1});
    }
  }
  const onClick = (item: IItem) => {
    if (state.selectedList.indexOf(item.value) !== -1) {
      state.selectedList.splice(state.selectedList.indexOf(item.value), 1);
    } else {
      state.selectedList.push(item.value);
    }
    setState({...state});
  }
  const cleanAll = () => {

    state.page = 0;
    state.mode = EnumMode.onlyNotSelected;
    state.selectedList = [];
    setState({...state});
  }
  const selectAll = () => {
    state.selectedList = state.list.map(item => item.value);
    state.page = 0;
    state.mode = EnumMode.onlySelected;
    setState({...state});
  }
  // @ts-ignore
  const toggleMenu = e => setState({...state, anchor: e.target})

  useEffect(() => {
    if (typeof props.onChange === "function") {
      props.onChange(state.selectedList)
    }
  }, [props, state]);

  return (
    <Card variant={"outlined"}>
      <Menu
        style={{marginTop: 4}}
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
        onClose={() => setState({...state, anchor: null})}>
        <MenuItem selected={state.mode === EnumMode.all}
                  onClick={() => setMode(EnumMode.all)}>All</MenuItem>
        <MenuItem selected={state.mode === EnumMode.onlySelected}
                  onClick={() => setMode(EnumMode.onlySelected)}>Only selected</MenuItem>
        <MenuItem selected={state.mode === EnumMode.onlyNotSelected}
                  onClick={() => setMode(EnumMode.onlyNotSelected)}>Only not selected</MenuItem>
      </Menu>
      <CardHeader
        className={classes.cardHeader}
        disableTypography={true}
        title={
          <TransferListHeader
            chipIcon={props.chipIcon}
            menuIcon={props.menuIcon}
            searchIcon={props.searchIcon}
            searchResetIcon={props.searchResetIcon}
            count={state.selectedList.length}
            title={props.title}
            active={state.activeSearch}
            toggleActive={toggleActiveSearch}
            toggleMenu={toggleMenu}
          />
        }
        subheader={
          <ConditionRender
            condition={state.activeSearch}
            trueCondition={
              <TextField
                className={classes.textField}
                fullWidth
                size={"small"}
                placeholder={"Search"}
                value={state.search}
                onChange={onChangeText}
              />
            }
            falseCondition={<Divider/>}
          />
        }
      />

      <CardContent className={classes.cardContent} style={{minHeight: props.pageSize * 40}}>
        <List>
          {
            getPage(state.list, state.selectedList, state.mode, state.page, props.pageSize, state.search).map((item, index) => (
              <Item
                key={"item_index_" + index}
                text={item.text}
                onClick={() => onClick(item)}
                checked={state.selectedList.indexOf(item.value) !== -1}/>
            ))
          }
        </List>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Box width={1} borderTop={1} borderColor={"divider"}>
          <ButtonGroup variant={"text"} size={"small"} color={"default"}>
            <Button onClick={prevPage}>
              {props.leftIcon}
            </Button>
            <Button disabled>
              {state.page + 1}/ {getFilter(state.list, state.selectedList, state.mode, props.pageSize, state.search)}
            </Button>
            <Button onClick={nextPage}>
              {props.rightIcon}
            </Button>

            <Button onClick={cleanAll}>
              <Typography variant={"caption"}>Clean all</Typography>
            </Button>
            <Button onClick={selectAll}>
              <Typography variant={"caption"}>Select all</Typography>
            </Button>
          </ButtonGroup>
        </Box>
      </CardActions>

    </Card>
  );
}

