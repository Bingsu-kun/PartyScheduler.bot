async function publishMessage(client, token, id, text) {
  try {
    const result = await client.chat.postMessage({
      token: token,
      channel: id,
      text: text
    });

    return result;
  }
  catch (error) {
    console.error(error);
  }
}

export default publishMessage;