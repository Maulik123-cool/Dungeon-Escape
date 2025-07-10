let player = {
  name: "",
  health: 100,
  inventory: [],
  escaped: false,
  stage: "intro",
  currentRoom: 0,
  dungeon: []
};

const roomTypes = ["enemy", "trap", "puzzle", "treasure", "empty"];
const output = document.getElementById("output");
const input = document.getElementById("input");

function generateDungeon() {
  return Array.from({ length: 5 }, () => roomTypes[Math.floor(Math.random() * roomTypes.length)]);
}

function handleInput() {
  const val = input.value.trim().toLowerCase();
  input.value = "";

  if (player.stage === "intro") {
    player.name = val || "Nameless Hero";
    player.dungeon = generateDungeon();
    player.stage = "dungeon";
    output.textContent = `🛡️ Brave ${player.name}, you've entered a deadly dungeon... Type anything to enter Room 1.`;
    return;
  }

  if (player.stage === "puzzle") {
    if (val.includes("piano")) {
      output.textContent = "🎶 Correct! You pass safely.";
    } else {
      output.textContent = "❌ Wrong! The puzzle explodes! -20 HP";
      player.health -= 20;
    }
    player.stage = "dungeon";
    nextRoom();
    return;
  }

  if (player.stage === "dungeon") {
    if (player.health <= 0) {
      output.textContent = `☠️ You have perished, ${player.name}. Game over.`;
      return;
    }

    if (player.currentRoom >= 5) {
      output.textContent = `🎉 You escaped alive, ${player.name}!\n🏆 HP: ${player.health}\n🎒 Inventory: ${player.inventory.join(", ") || "empty"}`;
      return;
    }

    nextRoom();
  }
}

function nextRoom() {
  const room = player.dungeon[player.currentRoom];
  player.currentRoom++;

  switch (room) {
    case "enemy":
      if (player.inventory.includes("sword")) {
        output.textContent = "🗡️ You slay the enemy with your sword!";
      } else {
        const dmg = rand(10, 30);
        player.health -= dmg;
        output.textContent = `⚔️ Enemy attacks! You take ${dmg} damage.`;
      }
      break;
    case "trap":
      const trapDmg = rand(5, 20);
      player.health -= trapDmg;
      output.textContent = `🪤 You hit a trap! -${trapDmg} HP`;
      break;
    case "puzzle":
      output.textContent = "🧠 Puzzle time: What has keys but can't open locks?";
      player.stage = "puzzle";
      return;
    case "treasure":
      const reward = ["sword", "potion", "gem"][rand(0, 2)];
      player.inventory.push(reward);
      output.textContent = `💰 You found a ${reward}!`;
      break;
    case "empty":
      output.textContent = "🚪 The room is empty... you move on.";
      break;
  }

  output.textContent += `\n❤️ HP: ${player.health}`;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
