import React from 'react';
import { deleteMessage, getMessages } from '/src/services';
import styles from '../styles/Home.module.css';

const conversationId = 1;

export default function Home() {
  const [messages, setMessages] = React.useState([]);

  const handleDelete = (messageId) => {
    deleteMessage(messageId).then((res) => fetchMessages(conversationId));
  };

  const fetchMessages = (conversationId) => {
    getMessages(conversationId).then((res) => setMessages(res));
  };

  React.useEffect(() => {
    fetchMessages(conversationId);
  }, []);

  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <div className={styles.card} key={message.id}>
          {message.body}
          <button
            className={styles.button}
            onClick={() => handleDelete(message.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
