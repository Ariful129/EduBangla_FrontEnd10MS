import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://skill-share-server-se.vercel.app'
})

const USeAxioseSecure = () => {
    
    return axiosSecure;
};

export default USeAxioseSecure;