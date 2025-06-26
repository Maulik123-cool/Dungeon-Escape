# Dungeon-Escape
Dungeon Escape is a funny little adventure game where you play as a hero stuck in a mysterious dungeon with 5 random rooms. 

![image](https://github.com/user-attachments/assets/64101d99-d13d-4720-b3fa-3a86d20d8a26)

![image](https://github.com/user-attachments/assets/2352457d-5e97-488d-a52c-b1702ec9a10b)

![image](https://github.com/user-attachments/assets/d8c16916-4cf2-4efe-838b-64042413b1bd)


🎮 How to Play

Download or copy the file dungeon_escape.html

Open it with any web browser (Chrome, Firefox, Edge, etc.)

Enter your hero name and start the game

Navigate through 5 random rooms — each may contain an enemy, trap, puzzle, treasure, or nothing at all

Survive to the end to escape!

🔥 Features

Simple one-page game in HTML + JavaScript

5 randomly generated dungeon rooms

Health system, inventory, and decision-based outcomes

Mini puzzle with text input

Win or lose based on your choices

🧠 Technologies Used

HTML5

CSS3 (inline styling)

JavaScript (vanilla)

📦 Files Included

dungeon_escape.html – The full game code (run this in browser)

✅ Requirements

A modern web browser

No internet or installation needed

🙃 Why You'll Love It

Because it’s chaotic, funny, fast, and weirdly addictive. Perfect for quick breaks, laughs, or pretending you're coding when you're actually slaying pixel monsters.

import random
import time

# Player setup
player = {
    "name": "",
    "health": 100,
    "inventory": [],
    "escaped": False
}

# Room types
room_types = ["enemy", "trap", "puzzle", "treasure", "empty"]

def intro():
    print("🕳️  Welcome to DUNGEON ESCAPE!")
    player["name"] = input("Enter your hero name: ")
    print(f"🛡️  Brave {player['name']}, you have entered a dungeon of doom...\n")
    time.sleep(1)

def generate_dungeon():
    return [random.choice(room_types) for _ in range(5)]

def encounter_enemy():
    print("⚔️  An enemy attacks you!")
    if "sword" in player["inventory"]:
        print("🗡️  You slay the enemy with your sword!")
    else:
        dmg = random.randint(10, 30)
        player["health"] -= dmg
        print(f"💥 You got hurt! -{dmg} HP")

def encounter_trap():
    print("🪤 You triggered a trap!")
    dmg = random.randint(5, 20)
    player["health"] -= dmg
    print(f"💢 Ouch! -{dmg} HP")

def encounter_puzzle():
    print("🧠 A puzzle blocks your path...")
    answer = input("What has keys but can't open locks? ").strip().lower()
    if "piano" in answer:
        print("🎶 Correct! You pass safely.")
    else:
        print("❌ Wrong! The puzzle explodes!")
        player["health"] -= 20

def encounter_treasure():
    reward = random.choice(["sword", "potion", "gem"])
    print(f"💰 You found a {reward}!")
    player["inventory"].append(reward)

def encounter_empty():
    print("...This room is eerily empty. You move on.")

def play_game():
    intro()
    dungeon = generate_dungeon()
    for i, room in enumerate(dungeon):
        if player["health"] <= 0:
            print("☠️  You have perished in the dungeon.")
            return
        print(f"\n🚪 Room {i+1}:")
        time.sleep(1)
        if room == "enemy":
            encounter_enemy()
        elif room == "trap":
            encounter_trap()
        elif room == "puzzle":
            encounter_puzzle()
        elif room == "treasure":
            encounter_treasure()
        else:
            encounter_empty()
        time.sleep(1)
    if player["health"] > 0:
        player["escaped"] = True
        print(f"\n🎉 You escaped the dungeon alive, {player['name']}!")
        print(f"🏆 Final HP: {player['health']}")
        print(f"🎒 Inventory: {player['inventory']}")
    else:
        print("☠️  You died right at the end. So close!")

if __name__ == "__main__":
    play_game()


