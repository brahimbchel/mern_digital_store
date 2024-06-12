import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './redux/auth/authSlice';


const Profile = () => {
    const currentToken = useSelector(selectCurrentToken)

    let GlobalUserInfo

    if(currentToken) {
        const decodedToken = jwtDecode(currentToken)
    
        const { UserInfo } = decodedToken

        GlobalUserInfo = UserInfo
    } else {
        return <div>Please sign in.</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {GlobalUserInfo.username}</p>
            <p>ID: {GlobalUserInfo.id}</p>
            <p>Admin: {GlobalUserInfo.isAdmin ? 'Yes' : 'No'}</p>
        </div>
    )
}

export default Profile