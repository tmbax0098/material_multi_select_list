# NAME
> material_multi_select_list

# ABOUT

> This package allow user to check many item from a (text , value) list

# EXAMPLE
_________________________________________


> const list = [
{text: "item 1", value: 1},
{text: "item 2", value: 2},
{text: "item 3", value: 3},
{text: "item 4", value: 4},
{text: "item 5", value: 5},
{text: "item 6", value: 6},
{text: "item 7", value: 7},
{text: "item 8", value: 8},
{text: "item 9", value: 9},
];




    const [selectedList, setSelectedList] = useState([]);

    return (
        <Box p={5}>
            <TransferList
                onChange={setSelectedList}
                sourceList={list}
                selectedList={selectedList}
                title={"Multi Select List"}
                pageSize={5}
                chipIcon={null}
                leftIcon={"<"}
                rightIcon={">"}
                searchIcon={"Search"}
                menuIcon={"Menu"}
                searchResetIcon={"Reset"}/>
        </Box>
    );

