const easyYopmail = require('easy-yopmail');


class yopmail{

    getNewEmailId() {
        return easyYopmail.getMail();
    }

    getLatestEmail(emailaddress) {
        return easyYopmail.getInbox(emailaddress)
            .then(inbox => {
                if (inbox.fetchedEmailCount > 0) {
                    // Get the most recent message ID
                    const latestEmailId = inbox.inbox[0].id; // The first message is the most recent
                    
                    // Read the most recent message using the message ID
                    return easyYopmail.readMessage(emailaddress, latestEmailId);
                } else {
                    console.log('No messages found in the inbox.');
                    return null; // Return null if no messages are found
                }
            })
            .then(message => {
                console.log("Message returned"); // This will log once the message is successfully retrieved
                return message; // Return the message
            })
            .catch(error => {
                console.error('Error:', error);
                return null; // Return null in case of an error
            });
    }


    getConfirmationURL(emailaddress) {
        return easyYopmail.getInbox(emailaddress)
            .then(inbox => {
                if (inbox.fetchedEmailCount > 0) {
                    // Get the most recent message ID
                    const latestEmailId = inbox.inbox[0].id; // The first message is the most recent
                    
                    // Read the most recent message using the message ID
                    return easyYopmail.readMessage(emailaddress, latestEmailId, 
                        { format: 'HTML', selector: 'a', attribute: 'href' }
                    );
                } else {
                    console.log('No messages found in the inbox.');
                    return null; // Return null if no messages are found
                }
            })
            .then(message => {
                console.log("Message returned"); // This will log once the message is successfully retrieved
                return message.content[0]; // Return the message
            })
            .catch(error => {
                console.error('Error:', error);
                return null; // Return null in case of an error
            });
    }

}

// new yopmail().getConfirmationURL('cazeuheifebre-8507@yopmail.com');

module.exports = new yopmail();