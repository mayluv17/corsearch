import styles from './styles/index.module.css';
import UserCard from './components/userCard/UserCard'
import { useQuery } from '@tanstack/react-query';
import FilterForm from './components/flterForm/FilterForm';
import { useMemo, useState } from 'react';

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "asc",
  });

  const handFilterChange = (searchQry: string, keyToSort:string, order:string ) => {
    setFilterValue(searchQry)
    setSortDescriptor(prev => ({...prev, column:keyToSort, direction: order,}))
  }

  const { isPending, error, data =[]} = useQuery({
    queryKey: ['userdata'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json(),
      ),
  })

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
  let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }

    return filteredData;
  }, [data, filterValue, hasSearchFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "desc" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  return (
    <section>
    <div className={styles.app}> 
      <FilterForm onFormChange={handFilterChange} />
          <div className={styles.container}>
      {isPending && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {!isPending && !error && sortedItems.length === 0 && <p>No users found</p>}
          {!isPending && !error && sortedItems.map(user => (
            <UserCard key={user.id} userData={user} />
          ))}
      </div>
    </div>
    </section>
  );
}

export default App;
