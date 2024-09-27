import styles from './styles/index.module.css';
import UserCard from './components/userCard/UserCard'
import { useQuery } from '@tanstack/react-query';

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


  return (
    <div className="App">
          <div className={styles.container}>
      {isPending && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {!isPending && !error && data.length === 0 && <p>No users found</p>}
          {!isPending && !error && data.map((user:userDataType) => (
            <UserCard key={user.id} userData={user} />
          ))}
      </div>
    </div>
  );
}

export default App;
