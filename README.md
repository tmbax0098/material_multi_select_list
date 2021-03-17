# NAME

> material_multi_select_list

# ABOUT

> This package allows you to select multiple items from a list.
>
> The source list must be in the form of text and value.

# EXAMPLE

---

    const list = [{text: "item 1", value: 1}, {text: "item 2", value: 2}, {text: "item 3", value: 3}];

    const [selectedList, setSelectedList] = useState([1 , 3]);

    return (
        <Box p={5}>
            <TransferList
                borderWidth={1}
                maximumSelectableItemText={"Maximum selectable item : "},
                buttonCleanAllText={"Clean all"}
                buttonSelectAllText={"Select all"}
                searchBoxPlaceholder={"Search"}
                menuShowAllText={"Show all"}
                menuShowSelectedText={"Show selected"}
                menuShowUnselectedText={"Show unselected"}
                onChange={setSelectedList}
                sourceList={list}
                selectedList={selectedList}
                title={"Multi Select List"}
                pageSize={5}
                leftIcon={"<"}
                rightIcon={">"}
                searchIcon={"Search"}
                menuIcon={"Menu"}
                maximumSelectableItem={2}
                readOnly={false}
                searchResetIcon={"Reset"}/>
        </Box>
    );

# Default value of properties

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
      searchResetIcon: "X",
      maximumSelectableItem: -1,
      readyOnly: false
    };

# Properties Example

> You can add the following component as a value to icons property
>
> `searchIcon = { <FontAwesomeIcon icon={faSearch}/> }`

# About [onChange]

> To use it, you must add its value as follows
>
> `onChange={newSelectedItemValueList =>{}}`
