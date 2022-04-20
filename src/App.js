import { Routes, Route, Navigate }  from 'react-router-dom';

import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
    return (
        <>
            <MainNavigation />
            <main>
                <Routes>
                    <Route path='/' element={<Users />} /> 

                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </>
    )
}

export default App;