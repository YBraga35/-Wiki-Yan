// _Meta/Scripts/dice.js
function roll(diceString) {
    // Lógica para interpretar a string (ex: "2d6+3") e retornar um resultado.
    const match = diceString.match(/(\d+)d(\d+)([\+\-]\d+)?/);
    if (!match) return "Formato de dado inválido";

    const numDice = parseInt(match[1]);
    const numSides = parseInt(match[2]);
    const modifier = match?[3] parseInt(match[3]) : 0;

    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += Math.floor(Math.random() * numSides) + 1;
    }
    return total + modifier;
}

module.exports = roll;