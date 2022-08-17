import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Reddle from '../apis/Reddle';
import { useAuth0 } from '@auth0/auth0-react';
import useProfile from '../context/useProfile';

const Home = () => {
    const { setProf } = useProfile();
    const { user } = useAuth0();

    let navigate = useNavigate();

    const toMainForum = () => {
        navigate('../mainforum');
    }

    const toProfile = () => {

        navigate('/profile')
    }

    useEffect(() => {

        
    }, []);
    return (
        <div>
            Home
            <div>
                <button className="btn btn-primary" onClick={() => toProfile()}>
                    Profile
                </button>
                <button className="btn btn-primary" onClick={() => toMainForum()}>
                    Main Forum
                </button>
            </div>
        </div>
    );
};

export default Home;
