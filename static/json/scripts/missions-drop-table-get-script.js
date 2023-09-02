// for https://www.warframe.com/ru/droptables
/* eslint-disable */
(() => {
    const result = [];
    let lastItem = {};
    let rotation;
    Array.from(document.querySelectorAll("table")[0].children[0].children).forEach(element => {
        if (element.classList.contains('blank-row')) {
            result.push(lastItem);
            lastItem = {};
            rotation = undefined;
        } else if (element.children[0].getAttribute('colspan') == 2) {
            if (!lastItem.mission) {
                const mission = element.children[0].textContent;
                const formatedMission = mission.substring(0, mission.indexOf(' ('))
                lastItem.mission = formatedMission;
            } else{
                rotation = element.children[0].textContent.replace('Rotation ', '');
            }
        } else {
            if (!lastItem.rewards)
                lastItem.rewards = [];
            const name = element.children[0].textContent;
            const chance = parseFloat(element.children[1].textContent.match(/(\d+\.\d+)/)[0]);
            
            lastItem.rewards.push({ chance, name, ...(rotation !== undefined && { rotation }) });
        }
    });
    return JSON.stringify(result);
})();