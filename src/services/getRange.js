import getDays from './getDays';

export default ({ show, toggle }) => {
    const { today, tomorrow } = getDays();

    if (toggle === 'recorded') return {};

    if (show === 'today') {
        const dueDateGreaterThan = today.valueOf();
        const dueDateLessThan = tomorrow.valueOf();
        return {
            dueDateGreaterThan,
            dueDateLessThan
        };
    } else if (show === 'past') {
        const dueDateLessThan = today.valueOf();
        return { dueDateLessThan };
    } else {
        const dueDateGreaterThan = tomorrow.valueOf();
        return { dueDateGreaterThan }
    }
};