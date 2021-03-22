import getURL from './getURL';
import getRange from './getRange';

export default async ({ recorded , show, toggle }) => {
    const res = await fetch(getURL(getRange({ show, toggle })));
    let items = await res.json();

    // Sort
    items = items.sort((a, b) => b.dueDate - a.dueDate)

    // If recorded toggle is true, keeps orders with at least 1 returned
    if (recorded) {
        items = items.filter(({ reservationItems }) => 
            reservationItems.some(({ returned }) => returned)
        );
    }

    return items;
}