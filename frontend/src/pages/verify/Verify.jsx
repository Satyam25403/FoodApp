import { useContext, useEffect } from 'react';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {

  const navigate = useNavigate(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const success= searchParams.get('success');             //retrieve the 'success' parameter from the URL
  const orderId = searchParams.get('orderId');           //retrieve the 'orderId' parameter from the URL

  console.log(success,orderId);

  const {url} = useContext(StoreContext)

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {success,orderId});

      if (!response.data.success || !response.data.orderId) {
        //navigate users to my orders page if either of success or orderId is missing
        alert("Payment verification failed. Redirecting to home page.");
        navigate("/");
      }else{
        //if payment is verified successfully, navigate to my orders page
        navigate("/myorders");
      }

      //we dont need to parse the json...axios does it automatically
      console.log('Payment verified:', response.data);
    }
    catch (error) {
      console.error('Error verifying payment:', error);
    }
  }

  //run the verifyPayment function when the component mounts
  useEffect(() => {
    verifyPayment(); //
  }, []);

  return (

    // until payment gets verified...display a spinner
    <div className="verify">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify