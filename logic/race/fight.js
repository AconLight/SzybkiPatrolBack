

const generateTurn = (userStats, oponentStats) => {
    const dmg1 = (100.0 + Math.random() * 20) * userStats.attack / oponentStats.armor
    const dmg2 = (100.0 + Math.random() * 20) * oponentStats.attack / userStats.armor

    let overtake = ((100.0 + Math.random() * 20) * userStats.speed / oponentStats.steering - 
        (100.0 + Math.random() * 20) * oponentStats.speed / userStats.steering)
    if (overtake > 20) overtake = 1
    else if (overtake < -20) overtake = -1
    else overtake = 0

    const events1 = userStats.events.filter(e => e.chance >= Math.random()*100)
    const events2 = oponentStats.events.filter(e => e.chance >= Math.random()*100)

    return {
        dmg1, dmg2, overtake, events1, events2
    }
}

const generateFight = (userStats, oponentStats, turnsNumber) => {
    let userHp = userStats.hp
    let oponentHp = oponentStats.hp
    const statNames = ['attack', 'armor', 'steering', 'speed']
    const turns = []
    const userMods = []
    const oponentMods = []

    for (let i = 0; i < turnsNumber + 10; i++) {
        userMods.push({});
        oponentMods.push({});
        statNames.forEach(statName => {
            userMods[i][statName] = 0
            oponentMods[i][statName] = 0
        })
     }

    for(let i = 0; i < turnsNumber; i++){
        const modUserStats = {}
        const modOponentStats = {}
        statNames.forEach(statName => {
            modUserStats[statName] = userStats[statName] + userMods[i][statName]
            modOponentStats[statName] = oponentStats[statName] + oponentMods[i][statName]
        })
        modUserStats.events = userStats.events
        modOponentStats.events = oponentStats.events

        const turnResult = generateTurn(modUserStats, modOponentStats);

        turnResult.events1.forEach(e => {
            for(let j = 1; j <= e.player1Mods.laps; j++) {
                statNames.forEach(statName => {
                    userMods[i+j][statName] += e.player1Mods[statName] || 0
                })
            }
            for(let j = 1; j <= e.player2Mods.laps; j++) {
                statNames.forEach(statName => {
                    oponentMods[i+j][statName] += e.player2Mods[statName] || 0
                })
            }
        })

        turnResult.events2.forEach(e => {
            for(let j = 1; j <= e.player1Mods.laps; j++) {
                statNames.forEach(statName => {
                    oponentMods[i+j][statName] += e.player1Mods[statName] || 0
                })
            }
            for(let j = 1; j <= e.player2Mods.laps; j++) {
                statNames.forEach(statName => {
                    userMods[i+j][statName] += e.player2Mods[statName] || 0
                })
            }
        })

        userHp -= turnResult.dmg2
        oponentHp -= turnResult.dmg1
        
        turns.push(turnResult);

        if (userHp <= 0 || oponentHp <= 0) {
            return {turns, userHp: Math.max(0, userHp), oponentHp: Math.max(0, oponentHp)}
        }
    }
    return {turns, userHp, oponentHp}
}

export {generateFight}