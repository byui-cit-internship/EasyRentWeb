export const getApiRoot = () => {
    const hashTag = window.location.hash;
    console.log('Hash tag '+ hashTag);

    let apiRoot = hashTag === '#local' 
                ? 'http://localhost:4567' 
                : 'https://easyrent-api-dev.cit362.com';

    if (window.location.hostname.includes('easyrent-dev')){
        apiRoot = 'https://easyrent-api-dev.cit362.com';
    } else if (window.location.hostname.includes('easyrent-test')){
        apiRoot = 'https://easyrent-api-test.cit362.com';
    } else if (window.location.hostname.includes('easyrent.citwdd.net')){
        apiRoot = 'https://easyrent-api-prod.cit362.com';
    }
    return apiRoot;
}
