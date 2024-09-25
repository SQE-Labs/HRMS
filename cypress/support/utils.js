

const easyYopmail = require('easy-yopmail');

export function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function generateRandomNumber(length) {
    const characters = '0123456789';
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

export function generateRandomCaeliusEmail(length){
    let randomString = generateRandomString(length);
    return randomString+'@caeliusconsulting.com';
}

export function getRandomMailFromYopmail(){
    return easyYopmail.getMail();
}

// export function selectDrpValueByText(locator ,text){
//     locator.select(text).should('contain', text);
// }


export function selectDrpValueByText(locator, text, isSearchable = false, searchInputLocator = '') {
    if (isSearchable) {
        // Click the dropdown to open (using multiple locators for different types)
        locator.click();
        // If a search input locator is provided, type in the search box
        if (searchInputLocator) {
            searchInputLocator.wait(1000).type(text);
            cy.get("#react-select-2-listbox span ,#react-select-3-listbox span").contains(text).click();
        } 
        
        // else {
        //     // Use OR condition in selector to handle multiple input field types
        //     cy.get('.select2-search__field, .bootstrap-search-input').type(text).type('{enter}');
        // }

    } else {
        // Standard dropdown (non-searchable)
        locator.select(text).should('contain', text);
    }
}
