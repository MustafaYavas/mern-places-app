import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import styles from './NavLinks.module.css';
import { AuthContext } from '../../context/auth-context';

const NavLinks = () => {
    const authCtx = useContext(AuthContext);

    return (
        <ul className={styles['nav-links']}>
            <li>
                <NavLink to='/' className={({ isActive }) => isActive ? `${styles.active}` : ''} end>
                    All Users
                </NavLink>
            </li>

            {
                authCtx.isLoggedIn &&
                <li>
                    <NavLink to={`/${authCtx.userId}/places`} className={({ isActive }) => isActive ? `${styles.active}` : ''}>
                        My Places
                    </NavLink>
                </li>
            }
            

            {
                authCtx.isLoggedIn &&
                <li>
                    <NavLink to='/places/new' className={({ isActive }) => isActive ? `${styles.active}` : ''}>
                        Add Place
                    </NavLink>
                </li>
            }
            

            {
                !authCtx.isLoggedIn &&
                <li>
                    <NavLink to='/auth' className={({ isActive }) => isActive ? `${styles.active}` : ''}>
                        Login
                    </NavLink>
                </li>
            }

            {
                authCtx.isLoggedIn && 
                <button onClick={authCtx.logout}>Logout</button>
            }
            
        </ul>
    )
}

export default NavLinks;