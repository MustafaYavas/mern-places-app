
import UsersList from '../components/UsersList';

const Users = () => {

    const USERS = [
        {id:'u1', image: 'https://picsum.photos/id/455/200/300', name: 'Mustafa Yavas', placeCount: 5}
    ]

    return (
        <UsersList items={USERS}/>
    )
}

export default Users;