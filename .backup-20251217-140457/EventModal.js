import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../../redux/slices/eventSlice';
import { createEvent, updateEvent as updateEventService } from '../../services/eventService';

const EventModal = ({ event, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'worship',
  });

  useEffect(() => {
    if (event) setFormData(event);
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (event) {
        const updated = await updateEventService(event.id, formData);
        dispatch(updateEvent(updated));
      } else {
        const created = await createEvent(formData);
        dispatch(addEvent(created));
      }
      onSuccess();
      onClose();
    } catch (error) {
      alert('Failed to save event');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{event ? 'Edit Event' : 'Add New Event'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Event Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Type *</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="worship">Worship</option>
                <option value="youth">Youth</option>
                <option value="special">Special</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{event ? 'Update' : 'Add Event'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
