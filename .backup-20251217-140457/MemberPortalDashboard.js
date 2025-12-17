/**
 * Member Portal Dashboard Component
 */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getMemberProfile, getMemberEvents } from '../../services/memberPortalService';
import { getAllEvents } from '../../services/eventService';
import './MemberPortalDashboard.css';

const MemberPortalDashboard = () => {
  const { member } = useSelector((state) => state.memberPortal);
  const [profile, setProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [profileData, registeredEvents, allEvents] = await Promise.all([
        getMemberProfile(member.id),
        getMemberEvents(member.id),
        getAllEvents(),
      ]);

      setProfile(profileData);
      setMyEvents(registeredEvents);
      setAvailableEvents(allEvents.filter(e => 
        !registeredEvents.some(re => re.id === e.id) && 
        new Date(e.date) >= new Date()
      ));
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="member-portal-dashboard">
      <div className="member-portal-header-section">
        <h1>Welcome back, {member?.name || 'Member'}!</h1>
        <p>Christ AG Church, Kazhakkuttom - Community Overview</p>
      </div>

      <div className="member-portal-grid">
        {/* Profile Summary */}
        <div className="member-portal-card">
          <h3>👤 My Profile</h3>
          <div className="profile-info">
            <div className="profile-item">
              <span className="label">Name:</span>
              <span className="value">{profile?.name}</span>
            </div>
            <div className="profile-item">
              <span className="label">Email:</span>
              <span className="value">{profile?.email}</span>
            </div>
            <div className="profile-item">
              <span className="label">Phone:</span>
              <span className="value">{profile?.phone}</span>
            </div>
            <div className="profile-item">
              <span className="label">Member Since:</span>
              <span className="value">{new Date(profile?.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="profile-item">
              <span className="label">Membership:</span>
              <span className="value badge">{profile?.membershipType}</span>
            </div>
          </div>
        </div>

        {/* My Events */}
        <div className="member-portal-card">
          <h3>📅 My Registered Events</h3>
          {myEvents.length === 0 ? (
            <p className="no-data">You haven't registered for any events yet.</p>
          ) : (
            <div className="events-list">
              {myEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className="event-date">
                    <span className="day">{new Date(event.date).getDate()}</span>
                    <span className="month">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>📍 {event.location}</p>
                    <p>🕐 {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Events */}
        <div className="member-portal-card full-width">
          <h3>🎯 Upcoming Events</h3>
          {availableEvents.length === 0 ? (
            <p className="no-data">No upcoming events available.</p>
          ) : (
            <div className="available-events-grid">
              {availableEvents.map((event) => (
                <div key={event.id} className="available-event-card">
                  <h4>{event.title}</h4>
                  <p className="description">{event.description}</p>
                  <div className="event-meta">
                    <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                    <span>🕐 {event.time}</span>
                    <span>📍 {event.location}</span>
                  </div>
                  <button className="btn btn-register">Register</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="member-portal-card">
          <h3>📊 Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{myEvents.length}</span>
              <span className="stat-label">Registered Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{availableEvents.length}</span>
              <span className="stat-label">Available Events</span>
            </div>
          </div>
        </div>

        {/* Church Info */}
        <div className="member-portal-card church-info">
          <h3>⛪ Church Information</h3>
          <div className="profile-info">
            <div className="profile-item">
              <span className="label">Senior Pastor:</span>
              <span className="value">Pr. Jobin Alisha</span>
            </div>
            <div className="profile-item">
              <span className="label">Location:</span>
              <span className="value">Kazhakkuttom, Trivandrum</span>
            </div>
            <div className="profile-item">
              <span className="label">Contact:</span>
              <span className="value">info@christag.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPortalDashboard;
