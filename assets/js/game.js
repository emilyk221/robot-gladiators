// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fights all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// define playerName from user input
let playerName = window.prompt("What is your robot's name?");
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

const enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

// this creates a function named "fight"
let fight = function(enemyName) {
  // repeat and execute as long as the enemy-robot is alive
  while(enemyHealth > 0 && playerHealth > 0) {
    // ask player if they would like to fight or run
    let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    // If player chooses to skip confirm and stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      let confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    
    // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
    enemyHealth = enemyHealth - playerAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // Check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
    playerHealth = playerHealth - enemyAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log (
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // Check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

// function to start a new game
let startGame = function() {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for(i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert ("Welcome to Robot Gladiators! Round " + (i + 1) );
  
      // pick new enemy to fight based on the index of the enemyNames array
      let pickedEnemyName = enemyNames[i];
  
      // reset enemyHealth before starting new fight
      enemyHealth = 50;
  
      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;
  
      // pass the pickedEnemyName variable's value in to the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);

      // if the player is stil alive and we're not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
        // ask if the player wants to use the store before next round
        let storeConfirm = window.confirm(" The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  
  // play again
  // startGame();

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
let endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  let playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

let shop = function() {
  // ask player what they'd like to do
  let shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      
      break;

    case "UPGRADE": // new case
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      } else {
        window.alert("You don't have enough money!");
      }
      
      break;

    case "LEAVE": // new case
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;

  }
};

// start the game when the page loads
startGame();
