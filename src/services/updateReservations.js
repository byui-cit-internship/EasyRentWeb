import getURL from './getURL';

export default (data) => (
    fetch(getURL(), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
);