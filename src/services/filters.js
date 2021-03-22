export const filterByReturned = (results, toggle) => {
    return results.filter(customer => {
        return customer.reservationItems.some(item => !item[toggle])
    });
}

export const filterBySearch = (filter) => {
    const regExp = new RegExp(filter, 'i');
    return ({ customerId, customerName, reservationItems }) => (
        Boolean(customerName.match(regExp)) ||
        Boolean(customerId.match(regExp)) ||
        reservationItems.some(({ itemId }) => itemId == regExp)
    );
};

export const filterRepeated = (item, index, arr) => !arr.slice(0, index).includes(item);