import { ISortDescriptor, IUser, column } from "../interface";



// Sorting function
export const getSortedUsers = (filteredItems: IUser[], sortDescriptor: ISortDescriptor) => {
  return [...filteredItems].sort((a, b) => {
    const first = a[sortDescriptor.column];
    const second = b[sortDescriptor.column];
    const cmp = first < second ? -1 : first > second ? 1 : 0;

    return sortDescriptor.direction === "desc" ? -cmp : cmp;
  });
};

// Filtering function
export const filterUsers = (users: IUser[], hasSearchFilter: boolean, filterValue: string) => {
  let filteredData = [...users];

  if (hasSearchFilter) {
    filteredData = filteredData.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  }

  return filteredData;
};

export const ShowSortDir = (keyToSort: column, sortDescriptor: ISortDescriptor)=>{
    if(keyToSort !== sortDescriptor.column) return <></>
    return <>{sortDescriptor.direction === "asc" ? <span>&uarr;</span> : <span>&darr;</span>}</>
  }