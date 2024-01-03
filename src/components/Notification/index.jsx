// Notifications.jsx
import { useState, useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Notifications = ({ setNotificationCount }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = async () => {
      try {
        // Assume the API endpoint returns notifications
        const response = await fetch('https://sode-erp.onrender.com/api/lead/list');
        const data = await response.json();

        if (data.success && data.result && Array.isArray(data.result)) {
          setNotifications(data.result);
          setNotificationCount(data.result.length); // Update notification count
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [setNotificationCount]);

  const deleteNotification = (uid) => {
    const updatedNotifications = notifications.filter(
      (n) => n.image && n.image[0]?.uid !== uid
    );
    setNotifications(updatedNotifications);
    setNotificationCount(updatedNotifications.length); // Update notification count
  };

  return (
    <div className="notifications whiteBox shadow">
      <div className="pad20">
        <p className="strong">Notifications ({notifications.length})</p>
        <Button type="text" shape="circle" className="del-notif">
          <DeleteOutlined />
        </Button>
      </div>
      <div className="line"></div>
      <div className="notif-list">
        {notifications.length > 0 ? (
          notifications.map((lead) => (
            <div key={lead.image && lead.image[0]?.uid} className="notification">
              <Button type="text" className="notif-btn">
                <span>Email: {lead.contact && lead.contact.email}</span>
                <br />
                <span>Phone: {lead.contact && lead.contact.phone}</span>
              </Button>
              <Button
                type="text"
                className="del-notif"
                shape="circle"
                onClick={() => deleteNotification(lead.image && lead.image[0]?.uid)}
              >
                <DeleteOutlined />
              </Button>
            </div>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
