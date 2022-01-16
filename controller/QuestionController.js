export default async ({ command, ack, say }) => {
  await ack();

  await say(command.text)
};