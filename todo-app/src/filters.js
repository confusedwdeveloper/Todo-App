//setting up filter object
let filters = {
    searchText: '',
    hideCompleted: false
}

// setting up a function to expose filter object to other file
const getFilters = () => filters

//a funtion to change filters object
const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }
    if (typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted
    }
}

export { getFilters, setFilters }