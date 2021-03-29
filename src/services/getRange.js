import getDays from './getDays';

export default ({ show, toggle }) => {
    const { today, tomorrowTues_Fri } = getDays();

    if (toggle === 'recorded') return {};

    if (show === 'today') {
        const dueDateGreaterThan = today.valueOf();
        const dueDateLessThan = tomorrowTues_Fri.valueOf() ;
        return {
            dueDateGreaterThan,
            dueDateLessThan
        };
    } else if (show === 'past') {
        const dueDateLessThan = today.valueOf();
        return { dueDateLessThan };
    } else {
        const dueDateGreaterThan = tomorrowTues_Fri.valueOf();
        return { dueDateGreaterThan }
    }
};