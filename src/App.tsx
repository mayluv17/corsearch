import styles from './styles/index.module.css';
import UserCard from './components/userCard/UserCard'
import { useQuery } from '@tanstack/react-query';
import FilterForm from './components/flterForm/FilterForm';
import { useMemo, useState } from 'react';
import { getUsersApi } from './api/user';
import { queryKeys } from './constants';
import { filterUsers, getSortedUsers } from './utilities';
import { ISortDescriptor, column, direction } from './interface';

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<ISortDescriptor>({
    column: "name",
    direction: "asc",
  });

  const handFilterChange = (searchQry: string, keyToSort: column, order: direction ) => {
    setFilterValue(searchQry)
    setSortDescriptor(prev => ({...prev, column: keyToSort, direction: order}))
  }

  const getUsersQuery = {
    queryKey: [queryKeys.users],
    queryFn: () => getUsersApi()
  }

  const { isPending, error, data = []} = useQuery(getUsersQuery)

  const hasSearchFilter = Boolean(filterValue);

   const filteredUsers = useMemo(() => {
    return filterUsers(data, hasSearchFilter, filterValue);
  }, [data, hasSearchFilter, filterValue]);

  const sortedUsers = useMemo(() => {
    return getSortedUsers(filteredUsers, sortDescriptor);
  }, [filteredUsers, sortDescriptor]);

  return (
    <section>
    <div className={styles.app}> 
      <FilterForm onFormChange={handFilterChange} />
      <div className={styles.container}>
      {isPending && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {!isPending && !error && sortedUsers.length === 0 && <p>No users found</p>}
          {!isPending && !error && sortedUsers.map(user => (
            <UserCard key={user.id} userData={user} />
          ))}
      </div>
    </div>
    </section>
  );
}

export default App;
