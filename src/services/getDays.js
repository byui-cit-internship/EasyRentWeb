export default () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrowTues_Fri = new Date();
    tomorrowTues_Fri.setDate(tomorrowTues_Fri.getDate() + 1);
    tomorrowTues_Fri.setHours(0, 0, 0, 0);

    return { today, tomorrowTues_Fri }
};
