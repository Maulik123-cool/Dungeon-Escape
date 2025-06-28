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
