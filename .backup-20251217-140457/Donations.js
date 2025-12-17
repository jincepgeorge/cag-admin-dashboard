import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDonations } from '../../redux/slices/donationSlice';
import { getAllDonations } from '../../services/donationService';
import './Donations.css';

const Donations = () => {
  const dispatch = useDispatch();
  const { filteredDonations, totalAmount, monthlyTotal } = useSelector((state) => state.donations);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    const data = await getAllDonations();
    dispatch(setDonations(data));
  };

  return (
    <div className="donations-page">
      <h1>Donation Tracking</h1>
      <div className="donation-stats">
        <div className="stat-box">
          <h3>Total Donations</h3>
          <p className="stat-value">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="stat-box">
          <h3>This Month</h3>
          <p className="stat-value">${monthlyTotal.toLocaleString()}</p>
        </div>
      </div>
      <div className="donations-table-container">
        <table className="donations-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.donorName}</td>
                <td className="amount">${donation.amount}</td>
                <td><span className={`badge ${donation.type}`}>{donation.type}</span></td>
                <td>{new Date(donation.date).toLocaleDateString()}</td>
                <td>{donation.paymentMethod.replace('_', ' ')}</td>
                <td>{donation.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;
