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
        <TransferList
            title="Multi select list"
            borderWidth={2}
            buttonCleanAllText={"unselect all"}
            buttonSelectAllText={"select all"}
            leftIcon={<ChevronLeft />}
            rightIcon={<ChevronRight/>}
            searchIcon={<SearchIcon />}
            menuIcon={<MenuOutlined />}
            pageSize={5}
            sourceList={list}
            selectedList={selectedList}
            onChange={setSelectedList}
        />
    );

# Properties

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
