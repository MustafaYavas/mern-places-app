import { Routes, Route }  from 'react-router-dom';

import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import NotFound from './shared/components/404/NotFound';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';


const App = () => {
    const { token, login, logout, userId } = useAuth();
    
    let routes;

    if(token) {
        routes = (
            <>
                <Route path='/' element={<Users />} /> 
                <Route path='/:userId/places' element={<UserPlaces />} />
                <Route path='/places/new' element={<NewPlace />} />
                <Route path='/places/:placeId' element={<UpdatePlace />} />
                <Route path='*' element={<NotFound />} />
            </>
        );
    } else {
        routes = (
            <>
                <Route path='/' element={<Users />} /> 
                <Route path='/:userId/places' element={<UserPlaces />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='*' element={<NotFound />} />
            </>
        );
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token,
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