import { Routes, Route, Navigate }  from 'react-router-dom';
import { useState, useCallback } from 'react';

import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);
    
    const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    let routes;

    if(isLoggedIn) {
        routes = (
            <>
                <Route path='/' element={<Users />} /> 
                <Route path='/:userId/places' element={<UserPlaces />} />
                <Route path='/places/new' element={<NewPlace />} />
                <Route path='/places/:placeId' element={<UpdatePlace />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </>
        );
    } else {
        routes = (
            <>
                <Route path='/' element={<Users />} /> 
                <Route path='/:userId/places' element={<UserPlaces />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </>
        );
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userId,
            login,
            logout
        }}>
            <MainNavigation />
            <main>
                <Routes>
                    {routes}
                </Routes>
            </main>
        </AuthContext.Provider>
    )
}

export default App;