

const generateTurn = (userStats, oponentStats) => {
    const dmg1 = (100.0 + Math.random() * 20) * userStats.attack / oponentStats.armor
    const dmg2 = (100.0 + Math.random() * 20) * oponentStats.attack / userStats.armor
    let overtake = ((100.0 + Math.random() * 20) * userStats.speed / oponentStats.steering - 
        (100.0 + Math.random() * 20) * oponentStats.speed / userStats.steering)
    if (overtake > 20) overtake = 1
    else if (overtake < -20) overtake = -1
    else overtake = 0
    return {
        dmg1, dmg2, overtake
    }
}

const generateFight = (userStats, oponentStats, turnsNumber) => {
    const turns = []
    for(let i = 0; i < turnsNumber; i++){
        turns.push(generateTurn(userStats, oponentStats));
    }
    return turns
}

export {generateFight}