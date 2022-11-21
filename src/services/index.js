const baseUrl = 'http://localhost:3005/';

export const getMessages = async (conversationId) => {
  const messages = await fetch(baseUrl + `messages/${conversationId}`)
    .then((res) => res.json())
    .catch((err) =>
      console.error(
        `Error fetching message from conversation ${conversationId}`,
        err
      )
    );

  return messages;
};

export const deleteMessage = async (messageId) => {
  await fetch(baseUrl + `message/${messageId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  }).catch((err) => console.error(`Error deleting message ${messageId}`, err));
};
