import styles from './MainHeader.module.css';

const MainHeader = (props) => {
    return (
        <header className={styles['main-header']}>
            {props.children}
        </header>
    )
}

export default MainHeader;