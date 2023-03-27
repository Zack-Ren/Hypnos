import { FunctionComponent, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../Components/DoctorProviderComponent/Context";

export const Register: FunctionComponent = () => {

    // Hooks
    const {doctor, isLoggedIn} = useContext(DoctorContext);
    const navigate = useNavigate();
    console.log('Register,', doctor, isLoggedIn);

    // Rendering Components
    if (isLoggedIn) {
        navigate('/homeV2');
    }

    return (
        <div className="register-container">
            Hello World
        </div>
    )
}