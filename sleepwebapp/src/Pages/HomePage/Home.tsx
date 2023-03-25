import { FunctionComponent, useContext } from "react"
import { DoctorContext } from "../../Components/DoctorProviderComponent/Context"
import { NavBar } from "../../Components/NavBarComponent/NavBar";
import './Home.css';

export const Home: FunctionComponent = () => {
    const {doctor, isLoggedIn} = useContext(DoctorContext);
    
    return (
        <div className="home-container">
            <NavBar />
        </div>
    )
}