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
                if (message && message.content) {
                    // Use `find()` to stop as soon as we find a matching URL
                    const confirmationURL = message.content.find(element => 
                        String(element).startsWith('https://topuptalent.com')
                    );
                    
                    if (confirmationURL) {
                        return confirmationURL; // Return the found URL
                    } else {
                        console.log('No confirmation URL found in the message.');
                        return null;
                    }
                } else {
                    console.log('No message content found.');
                    return null;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                return null; // Return null in case of an error
            });
    }
    

    // thislogic(){
    //     this.getConfirmationURL('nqzkrdxfyz@yopmail.com').then(content => {
    //         console.log(content);
    //         content.forEach(element => {
    //             if(String(element).startsWith('https://topuptalent.com')){
    //                 console.log(element);
    //             }
    //         });
    //     })
    // }

}


// new yopmail().thislogic();

module.exports = new yopmail();