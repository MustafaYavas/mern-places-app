import { useNavigate } from 'react-router-dom';

import UserItem from './UserItem';
import styles from './UsersList.module.css';
import Card from '../../shared/components/UIElements/Card';

const UsersList = (props) => {
    const navigate = useNavigate();

    const createUserHandler = () => {
        navigate('/auth')
    }

    return (
        <>
            { props.items.length===0 && 
                <div className={styles['no-list-container']}>
                    <Card>No users found</Card>
                    <button onClick={createUserHandler}>Create User</button>
                </div> 
            }

            {
                props.items.length>0 && 
                <ul className={styles['users-list']}>
                    {
                        props.items.map((user) => {
                            return (
                                <UserItem 
                                    key={user.id} 
                                    id={user.id} 
                                    image={user.image} 
                                    name={user.name} 
                                    placeCount={user.places.length}
                                />
                            )
                        })
                    }
                </ul>
                
            }
        </>

    )
}

export default UsersList;