exports.handler = (context, event, callback) => {
  // Use context to get authenticated twilio client
  //    will use values from our .env file
  const client = context.getTwilioClient();
  console.log("Sending text...");

  // For the authenicated client, we will create a new message
  client.messages.create({
    to: context.PHONE_NUMBER,
    from: context.TWILIO_NUMBER,
    body: `New idea 💡: ${event.TranscriptionText}`
  }).then(message => {
    console.log(`Sent message ${message.sid}`)
    // if the message was successful, we'll write something out
    callback(null, `Sent message ${message.sid}`);
  }).catch((error) => {
    // if there is a problem, we'll call callback with an error
    console.log(`You have an error: ${error}`);
    callback(error)
  });
};