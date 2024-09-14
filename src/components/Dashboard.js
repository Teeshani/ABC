import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { ToastContainer, toast } from 'react-toastify'; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import AdminHeader from './adminheader';
import Footer from './adminfooter';


const Dashboard = () => {
  const [counts, setCounts] = useState({ queries: 0, reservations: 0, onlineOrders: 0 });
  const [queries, setQueries] = useState([]);
  const [onlineOrders, setOnlineOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // { queryId: feedback }
  const [statuses, setStatuses] = useState({});
  const [reservations, setReservations] = useState([]);
  const [reservationStatuses, setReservationStatuses] = useState({});


  
  useEffect(() => {
    // Fetch counts
    axios.get('http://localhost:5000/api/dashboard/counts')
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching counts:', error);
      });

    // Fetch queries
    axios.get('http://localhost:5000/api/dashboard/messages')
      .then(response => {
        setQueries(response.data);
        // Initialize feedback state for each query
        const initialFeedbacks = response.data.reduce((acc, query) => {
          acc[query._id] = query.feedback;
          return acc;
        }, {});
        setFeedbacks(initialFeedbacks);
      })
      .catch(error => {
        console.error('Error fetching queries:', error);
      });

    // Fetch reservations
    axios.get('http://localhost:5000/api/dashboard/reservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        console.error('Error fetching reservations:', error);
      });

    // Fetch online orders
    axios.get('http://localhost:5000/api/dashboard/online-orders')
      .then(response => {
        setOnlineOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching online orders:', error);
      });
  }, []);

  const handleFeedbackChange = (id) => (e) => {
    setFeedbacks((prevFeedbacks) => ({
      ...prevFeedbacks,
      [id]: e.target.value
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
  
    const feedback = feedbacks[id];
  
    if (!id || !feedback) {
      console.error('ID and feedback are required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/update-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, feedback }),
      });
  
      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
        const errorText = await response.text(); // Get the response as text
        console.error('Error:', errorText);
        return;
      }
  
      // Attempt to parse the JSON response
      const data = await response.json();
      console.log('Feedback updated:', data);
  
      // Optionally: Refresh or update the queries list after updating
      setQueries((prevQueries) =>
        prevQueries.map((query) =>
          query._id === id ? { ...query, feedback: feedbacks[id] } : query
        )
      );

         // Show success toast notification
         toast.success('Feedback updated successfully!');
      
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStatusChange = (id) => (e) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: e.target.value
    }));
  };

  const handleStatusSubmit = async (e, id) => {
    e.preventDefault();

    const status = statuses[id];

    if (!id || !status) {
      console.error('Order ID and status are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/dashboard/update-order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        toast.error('Failed to update order status.');
        return;
      }

      const data = await response.json();
      console.log('Order status updated:', data);

      // Update the status in the orders list
      setOnlineOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: statuses[id] } : order
        )
      );

      toast.success('Order status updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update order status.');
    }
  };

  const handleReservationStatusChange = (id) => (e) => {
    setReservationStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: e.target.value,
    }));
  };

  const handleReservationStatusSubmit = async (e, id) => {
    e.preventDefault();
    const newStatus = reservationStatuses[id];

    try {
      const response = await axios.post(
        'http://localhost:5000/api/dashboard/update-reservation-status',
        { id, status: newStatus }
      );

      if (response.status === 200) {
        toast.success('Reservation status updated successfully!');
        // Update the reservation status in the local state
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === id
              ? { ...reservation, status: newStatus }
              : reservation
          )
        );
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
      toast.error('Failed to update reservation status.');
    }
  };



  return (
    <div className="dashboard">
<AdminHeader/>
         <ToastContainer /> {/* Add ToastContainer to render toast notifications */}
      <section id="query-list-container">
        <h2>Query List</h2>
        <table id="Querytable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query._id}>
                <td>{query.name}</td>
                <td>{query.email}</td>
                <td>{query.message}</td>
                <td>{new Date(query.date).toLocaleString()}</td>
                <td>{feedbacks[query._id]}</td>
                <td>
                  <form onSubmit={(e) => handleSubmit(e, query._id)}>
                    <select
                      name="new_feedback"
                      value={feedbacks[query._id] || ''}
                      onChange={handleFeedbackChange(query._id)}
                      required
                    >
                      <option value="">Select Feedback</option>
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Unresolved">Unresolved</option>
                    </select>
                    <button type="submit">Update Feedback</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

     {/* Reservations Table */}
     <section id="reservation-list-container">
        <h2>Reservation List</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Reser ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.userId}</td>
                <td>{reservation.reservationId}</td>
                <td>{reservation.name}</td>
                <td>{reservation.email}</td>
                <td>{reservation.phone}</td>
                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                <td>{reservation.time}</td>
                <td>{reservation.seats}</td>
                <td>{reservation.status || 'Pending'}</td>
                <td>
                  <form
                    onSubmit={(e) => handleReservationStatusSubmit(e, reservation._id)}
                  >
                    <select
                      name="status"
                      value={reservationStatuses[reservation._id]}
                      onChange={handleReservationStatusChange(reservation._id)}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <button type="submit">Update Status</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="online-order-list-container">
        <h2>Online Order List</h2>
        <table id="OnlineOrdertable">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Order ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Payment Method</th>
              <th>Order Details</th>
              <th>Total Price</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {onlineOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.userId}</td>
                <td>{order.orderId}</td>
                <td>{order.billingDetails.firstName}</td>
                <td>{order.billingDetails.lastName}</td>
                <td>{order.billingDetails.address}</td>
                <td>{order.billingDetails.contact}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {order.cartItems.map((item, index) => (
                    <div key={index}>
                      {item.product_name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>{order.newTotal}</td>
                 <td>{new Date(order.orderDate).toLocaleString()}</td>
                 <td>
                {order.status || 'Pending'}
              </td>
                 <td>
                   {/* Render the status with a dropdown to change it */}
                   <form onSubmit={(e) => handleStatusSubmit(e, order._id)}>
                     <select
                       name="status"
                       value={statuses[order._id]}
                       onChange={handleStatusChange(order._id)}
                       required
                     >
                       <option value="Pending">Pending</option>
                       <option value="Processing">Processing</option>
                       <option value="Shipped">Shipped</option>
                       <option value="Delivered">Delivered</option>
                       <option value="Cancelled">Cancelled</option>
                     </select>
                     <button type="submit">Update Status</button>
                   </form>
                 </td>
                
               </tr>
             ))}
           </tbody>
         </table>
       </section>
       <Footer/>
    </div>
  );
};

export default Dashboard;
