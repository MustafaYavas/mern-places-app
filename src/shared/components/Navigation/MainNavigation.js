import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './MainNavigation.module.css';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const toggleDrawerHandler = () => {
        setDrawerIsOpen(!drawerIsOpen)
    }

    return (
        <>
            { drawerIsOpen && <Backdrop onClick={toggleDrawerHandler}/> }
            
            <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler} >
                <nav className={styles['main-navigation__drawer-nav']}>
                    <NavLinks />
                </nav>
            </SideDrawer>
            
            <MainHeader>
                <button className={styles['main-navigation__menu-btn']} onClick={toggleDrawerHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className={styles['main-navigation__title']}>
                    <Link to='/'>
                        YourPlaces
                    </Link>
                </h1>
                <nav className={styles['main-navigation__header-nav']}>
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    )
}

export default MainNavigation;