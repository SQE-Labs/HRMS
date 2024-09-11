const easyYopmail = require('easy-yopmail');

export function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateRandomYopmail(length){
    let randomString = generateRandomString(length);
    return randomString+'@yopmail.com';
}

export function getRandomMailFromYopmail(){
    return easyYopmail.getMail();
}