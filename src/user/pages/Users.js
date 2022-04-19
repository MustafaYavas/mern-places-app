
import UsersList from '../components/UsersList';

const Users = () => {

    const USERS = [
        {id:'u1', image: 'https://picsum.photos/id/237/200/300', name: 'name1', placeCount: 5},
        {id:'u2', image: 'https://picsum.photos/id/227/200/300', name: 'name2', placeCount: 10},
        {id:'u3', image: 'https://picsum.photos/id/217/200/300', name: 'name3', placeCount: 15}
    ]

    return (
        <UsersList items={USERS}/>
    )
}

export default Users;