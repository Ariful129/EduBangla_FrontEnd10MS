

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Error = () => {
  const searchData = new URLSearchParams(window.location.search);
  const message = searchData.get('message');
  
  const navigate = useNavigate();

  // Use a function to show the SweetAlert
  const showMessage = () => {
    Swal.fire({
      title: 'Warning!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool',
    }).then(() => {
      // This code will be executed after the user clicks "Cool"
      navigate('/');
    });
  };

  return (
    <div>
      {message && showMessage()}
    </div>
  );
};

export default Error;
