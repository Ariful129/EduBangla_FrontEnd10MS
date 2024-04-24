import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const UseAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default UseAuth;





// const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     logOut,
//     signInWithGoogle
// }