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

    useEffect(() => {
        const insertDB = async () => {
            try {

                const theName = user.name
                const theEmail = user.email
                const theEmail_Verified = user.email_verified

                await Reddle.post("/users", {
                    email: theEmail,
                    email_verified: theEmail_Verified,
                    name: theName,
                });
                
                const result2 = await Reddle.get(`/users/otherprofile?name=${theName}`);
                setProf(result2.data.data.user);

                window.sessionStorage.setItem("userID", result2.data.data.user[0].id)  
                window.sessionStorage.setItem("userName", result2.data.data.user[0].name)  
                
                console.log(window.sessionStorage.getItem("userName")) 
                console.log(window.sessionStorage.getItem("userID"))
            } catch (err) {
                console.log("asdgasge");
            }
        };

        insertDB();
    },[])

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
