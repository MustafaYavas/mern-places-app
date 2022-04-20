import UserItem from './UserItem';
import styles from './UsersList.module.css';
import Card from '../../shared/components/UIElements/Card';

const UsersList = (props) => {
    return (
        <>
            { props.items.length===0 && 
                <div className='center'>
                    <Card>No users found</Card>
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
                                    placeCount={user.places}
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