import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    return (
        <main className="App">
            <Outlet/>
        </main>
    )
}

export default Layout