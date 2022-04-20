import { NavLink } from 'react-router-dom';

import styles from './NavLinks.module.css';

const NavLinks = (props) => {
    return (
        <ul className={styles['nav-links']}>
            <li>
                <NavLink to='/' className={({ isActive }) => isActive ? `${styles.active}` : ''} end>
                    All Users
                </NavLink>
            </li>

            <li>
                <NavLink to='/u1/places' className={({ isActive }) => isActive ? `${styles.active}` : ''}>
                    My Places
                </NavLink>
            </li>

            <li>
                <NavLink to='/places/new' className={({ isActive }) => isActive ? `${styles.active}` : ''}>
                    Add Place
                </NavLink>
            </li>

            <li>
                <NavLink to='/auth' className={({ isActive }) => isActive ? `${styles.active}` : ''}>
                    Login
                </NavLink>
            </li>
        </ul>
    )
}

export default NavLinks;