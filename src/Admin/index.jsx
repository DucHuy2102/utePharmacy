import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import { Main, Wraper } from './components/style';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import store from './store';
import { Provider } from 'react-redux';
const Admin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage.getItem('admin')) {
            navigate('/admin/login');
        }
    }, [navigate]);
    const [toogleNav, setToogleNav] = useState(true);

    // eslint-disable-next-line no-unused-vars

    const [idOnClick, setIdOnClick] = useState(0);
    const width = window.innerWidth;
    return (
        <Provider store={store}>
            <Wraper>
                <Navigation toogleNav={width > 700 ? !toogleNav : true} setIdOnClick={setIdOnClick} />

                <Main width={toogleNav ? '256px' : '77px'}>
                    <Header setToogleNav={setToogleNav} />
                    <div style={{ marginTop: '60px' }}>
                        <Outlet />
                    </div>
                </Main>
            </Wraper>
        </Provider>
    );
};

export default Admin;
