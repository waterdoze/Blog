import React from "react";
import { useEffect, useContext } from "react";
import Reddle from "../apis/Reddle";

const ALL_POSTS_URL = "/posts";

const MainPage = () => {

    useEffect(async () => {
        try {
            const response = await Reddle.get(ALL_POSTS_URL)
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    },[])

    return (
        <section>
            <div className="list-group">
                <table className="table table-hover table-dark">
                    <thead>
                        <tr className="bg-secondary">
                            <th scope="col">cool</th>
                            <th scope="col">story</th>
                            <th scope="col">bro</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </section>
    );
}

export default MainPage;