import styles from './styles/index.module.css';
import UserCard from './components/userCard/UserCard'
import { useQuery } from '@tanstack/react-query';
import FilterForm from './components/flterForm/FilterForm';

type userDataType = {
  id: number;
name: string;
username: string;
email: string;
address: {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};
phone: string;
website: string;
company: {
  name: string;
  catchPhrase: string;
  bs: string;
}}

function App() {

  const { isPending, error, data =[]} = useQuery({
    queryKey: ['userdata'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json(),
      ),
  })

  const handFilterChange = (searchQry: string, keyToSort:string, order:string ) => {
    
  }

  return (
    <section>
    <div className={styles.app}> 
      <FilterForm onFormChange={handFilterChange} />
          <div className={styles.container}>
      {isPending && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {!isPending && !error && data.length === 0 && <p>No users found</p>}
          {!isPending && !error && data.map((user:userDataType) => (
            <UserCard key={user.id} userData={user} />
          ))}
      </div>
    </div>
    </section>
  );
}

export default App;
