import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import client from "../api";
import DesktopProfileView from './DesktopProfileView';
import MobileProfileView from './MobileProfileView';

const Profile = () => {
    const { logOut } = useUserAuth();
    const params = useParams();
    const lawyerId = params.id;

    const navigate = useNavigate();

    const [lawyerData, setLawyerData] = useState(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await client.get(`/lawyers/${lawyerId}`);
            setLawyerData(response.data)

        } catch (error) {
            console.error('Error fetching lawyer data:', error);
          }
        };
    
        fetchData();

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
      }, []);

    const handleEditButton = () => {
        navigate(`/edit/${lawyerId}`)
    }

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    if (windowWidth >= 600) {
        // Layout for larger screens
        return (
            <DesktopProfileView lawyerData={lawyerData} handleEditButton={handleEditButton} handleLogout={handleLogout}/>
        );
    } else {
        // Layout for smaller screens
        return (
            <MobileProfileView lawyerData={lawyerData} handleEditButton={handleEditButton} handleLogout={handleLogout}/>
        );
    }
    
}

export default Profile