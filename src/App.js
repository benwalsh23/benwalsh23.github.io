import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    axios.get('https://gist.githubusercontent.com/mrchenliang/15e1989583fd6e6e04e1c49287934c91/raw/ed03cfea1e2edb0303543d2908cd7429ed75580d/email.json')
      .then(response => {
        const updatedEmails = response.data.map(email => ({ ...email, read: email.read === 'true' }));
        setEmails(updatedEmails);
      })
      .catch(error => console.error('Error fetching email data:', error));
  }, []);

  const handleEmailClick = (email) => {
    const updatedEmails = emails.map(e => (e.id === email.id ? { ...e, read: true } : e));
    setEmails(updatedEmails);
    setSelectedEmail(email);
  };

  return (
    <div className="app-container">
      <div className="email-sidebar">
        {emails.map((email) => (
          <div
            key={email.id}
            className={`email-item ${email.read ? 'read' : 'unread'} ${email === selectedEmail ? 'active' : ''}`}
            onClick={() => handleEmailClick(email)}
          >
            <div className="email-details">
              <div className="email-from">{email.from}</div>
              <div className="email-subject">{email.subject}</div>
              <div className="email-address">{email.address}</div>
              <div className="email-timestamp">{email.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="email-body">
        {selectedEmail ? (
          <div>
            <div className="email-content">
              <div>From: {selectedEmail.from}</div>
              <div>Subject: {selectedEmail.subject}</div>
              <div>Address: {selectedEmail.address}</div>
              <div>Timestamp: {selectedEmail.time}</div>
              <div>Message: {selectedEmail.message}</div>
            </div>
          </div>
        ) : (
          <div className="placeholder-text">Select an email to view its content</div>
        )}
      </div>
    </div>
  );
}

export default App;