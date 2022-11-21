import React from 'react';
import { deleteMessage, getMessages, postMessage } from '/src/services';
import styles from '../styles/Home.module.css';

const getTimeStamp = () => Date.now() / 1000;

const loggedUserId = 1;
const conversationId = 1;

export default function Home() {
  const [messages, setMessages] = React.useState([]);

  const handleDeleteMessage = (messageId) => {
    deleteMessage(messageId).then((res) => fetchMessages(conversationId));
  };

  const handleCreateMessage = () => {
    const body = {
      body: 'test',
      conversationId,
      authorId: loggedUserId,
      timestamp: getTimeStamp(),
      id: null,
    };
    postMessage(conversationId, body).then((res) =>
      fetchMessages(conversationId)
    );
  };

  const fetchMessages = (conversationId) => {
    getMessages(conversationId).then((res) => setMessages(res));
  };

  React.useEffect(() => {
    fetchMessages(conversationId);
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleCreateMessage}>
        Create
      </button>
      {messages.map((message) => (
        <div className={styles.card} key={message.id}>
          {message.body}
          <button
            className={styles.button}
            onClick={() => handleDeleteMessage(message.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
