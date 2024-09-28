export const getUsersApi = () => {
   return fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
    res.json(),
  )
}  