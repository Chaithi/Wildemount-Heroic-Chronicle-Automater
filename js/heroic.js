// constructor
let bornIn = 0, // {int} Region character was born in
    raisedIn = 0, // {int} Region character was raised in
    bornDifferentThanRaised = false, // {bool} If character was raised in a different region than they were born in
    background = 0, // {int} Character's background
    socialAllies = 0, // {int} Number of Allies from the character's background and region.
    socialRivals = 0, // {int} Number of Rivals from the character's background and region.
    traveler = false, // {bool} If character traveled a lot when growing up
    acolyteLegalFaithChoice = false, // {bool} If background is Acolyte and region is Dwendalian Empire. They have to choose between a rival or ally.
    settlement1 = "", // {string} Character's primary settlement
    settlement2 = "", // {string} Character's secondary settlement (only if traveler = true)
    settlement3 = "", // {string} Character's tertiary settlement (only if traveler = true)
    village = false, // {bool} If primary settlement is a smaller town. Helps determine family size.
    race = {}, // {object: string + int} Holds list of Race and percentage based on settlement1
    chosenRace = "", // {string} Character's race, based off the race list.
    numOfParents = 0, // {int} Number of character's parents. Ranges from 0-3
    numOfSiblings = 0, // {int} Number of character's siblings
    familyRelationships = [], // {array} Holds dice results from family relationships
    allyResults = [], // {array} Holds dice results from social ally rolls
    rivalResults = [], // {array} Holds dice results from social rival rolls
    fatefulMomentsNum = 0, // {int} Number of fateful moments, determined based on the character's ally/rival rolls
    fatefulMomentResults = [], // {array} Dice results from their fateful moments.
    favoriteFoodResult = 0, // {int} Die result for character's favorite food
    mysteriousSecretResult = 0, // {int} Die result for character's mysterious secret
    prophecyResult = 0; // {int} Die result for character's prophecy


// Set functions

/**
  * @desc Sets the bornIn value and displays on FE
  * @param int region - the region number to set to
  * @return nothing
*/
function setBorn(region) {
  bornIn = region;
  document.getElementById("bornIn").innerHTML = getHomeland(region) + ". Roll: " + bornIn;
}

/**
  * @desc Sets the raisedIn value and displays on FE
  * @param int region - the region number to set to
  * @return nothing
*/
function setRaised(region) {
  raisedIn = region;
  document.getElementById("raisedIn").innerHTML = getHomeland(region) + ". Roll: " + raisedIn;
  setSocialStatusRelationships();
}

/**
  * @desc Finds if user checked box. Sets the bool and updates the raisedIn value if different
  * @param none
  * @return nothing
*/
function setBornDifferentThanRaised() {
  var different = document.getElementById("raisedInDiff").checked,
      refreshImg = document.getElementById("raisedRefresh");
  bornDifferentThanRaised = different;
  if (different) {
    let region = randomHomeland();
    while (region == bornIn) {
      region = randomHomeland();
    }
    setRaised(region);
    refreshImg.style.visibility = 'visible';
  } else {
    setRaised(bornIn);
    refreshImg.style.visibility = 'hidden';
  }
}

/**
  * @desc Checks if user has checked the traveler box. Hides/shows the traveler section on FE
  * @param none
  * @return nothing
*/
function setTraveler() {
  var isTraveler = document.getElementById("traveler").checked,
      additionalSettlements = document.getElementById("additionalSettlements");
  traveler = isTraveler;

  if (isTraveler){
    additionalSettlements.style.visibility = 'visible';
  } else {
    additionalSettlements.style.visibility = 'hidden';
  }
}

/**
  * @desc Sets the born value to a random homeland region
  * @param none
  * @return nothing
*/
function setBornIn() {
  setBorn(randomHomeland());
}

/**
  * @desc Sets the raisedIn value based on if different than born to a random region
  * @param none
  * @return nothing
*/
function setRaisedIn() {
  if (bornDifferentThanRaised) {
    let result = randomHomeland();
    while (result == bornIn) {
      result = randomHomeland();
    }
    setRaised(result);
  } else {
    setRaised(bornIn);
  }
}

/**
  * @desc Sets the background to a d20 result. Updates FE. Triggers social status rolls.
  * @param none
  * @return nothing
*/
function setBackground() {
  background = rollDice(20);
  document.getElementById("background").innerHTML = getBackground(background) + ". Roll: " + background;
  setSocialStatusRelationships();
}

/**
  * @desc Sets Social Allies/Rivals based on the character's region and background.
  * @param none
  * @return nothing
*/
function setSocialStatusRelationships() {
  socialAllies = 0;
  socialRivals = 0;
  acolyteLegalFaithChoice = false;
  fatefulMomentsNum = 0;
  switch (raisedIn) {
    case 1:
      switch (background) {
        case 1:
        case 3:
        case 6:
        case 7:
        case 8:
        case 11:
        case 14:
        case 17:
        case 19:
          socialAllies += 1;
          break;
        case 4:
        case 5:
        case 9:
        case 13:
          socialRivals += 1;
          break;
        case 15:
        case 16:
          socialAllies +=1;
          socialRivals +=1;
          break;
        default:
          break;
      }
      break;
    case 2:
    case 3:
      switch (background) {
        case 1:
          acolyteLegalFaithChoice = true;
          socialAllies += 1;
          break;
        case 5:
        case 6:
        case 9:
        case 18:
        case 20:
          socialAllies += 1;
          break;
        case 2:
        case 3:
        case 4:
        case 7:
        case 8:
        case 10:
        case 13:
        case 19:
          socialRivals += 1;
          break;
        case 11:
        case 14:
        case 17:
          socialAllies +=1;
          socialRivals +=1;
          break;
        default:
          break;
      }
      break;
    case 4:
      switch (background) {
        case 3:
        case 4:
        case 10:
        case 12:
        case 14:
        case 16:
          socialAllies += 1;
          break;
        case 1:
        case 5:
        case 6:
        case 7:
        case 11:
        case 15:
        case 17:
        case 19:
          socialRivals += 1;
          break;
        default:
          break;
      }
      break;
    case 5:
      switch (background) {
        case 1:
        case 2:
        case 6:
        case 7:
        case 9:
        case 10:
        case 13:
        case 15:
          socialAllies += 1;
          break;
        case 3:
        case 4:
        case 14:
        case 18:
        case 19:
        case 20:
          socialRivals += 1;
          break;
        case 11:
        case 17:
          socialAllies += 1;
          socialRivals += 1;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  setAllies(socialAllies);
  setRivals(socialRivals);
  checkAcolyte();
}

/**
  * @desc Sets the character's settlements. Determines them randomly.
  * This also sets the race list and village value
  * @param none
  * @return nothing
*/
function setSettlements() {
  settlement1 = randomSettlement();
  let saveRace = race,
      saveVillage = village,
      display1 = document.getElementById("settlement1"),
      display2 = document.getElementById("settlement2"),
      display3 = document.getElementById("settlement3");
  settlement2 = randomSettlement();
  settlement3 = randomSettlement();
  while (settlement2 == settlement1) {
    settlement2 = randomSettlement();
  }
  while (settlement3 == settlement1 || settlement3 == settlement2) {
    settlement3 = randomSettlement();
  }
  race = saveRace;
  village = saveVillage;
  display1.innerHTML = settlement1;
  display2.innerHTML = settlement2;
  display3.innerHTML = settlement3;
  setRace(race, rollDice(100));
}

/**
  * @desc Determines a homeland region
  * @param none
  * @return int between 1-5
*/
function setRace(races, result) {
  var comparator = 0;
  for (chosen in races) {
    comparator += races[chosen];
    if (result <= comparator) {
      chosenRace = chosen;
      document.getElementById("race").innerHTML = chosenRace + ". Roll: " + result;
      return;
    }
  }
}

/**
  * @desc Determines identity and relationship die result
  * @param int num - number of Social Allies
  * @return nothing
*/
function setAllies(num) {
  allyResults = [];
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      allyResults.push({
        "identity": getIdentity(rollDice(100)),
        "roll": rollDice(100)
      });
    }
  }
}

/**
  * @desc Determines identity and relationship die result
  * @param int num - number of Social rivals
  * @return nothing
*/
function setRivals(num) {
  rivalResults = [];
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      rivalResults.push({
        "identity": getIdentity(rollDice(100)),
        "roll": rollDice(100)
      });
    }
  }
}

/**
  * @desc Determines number of Powerful Family Relationships.
  * Compares a d3 roll to size of family. Sets the d3 roll to family size if more.
  * Updates the FE. Pushes die results into an array.
  * @param int parents - number of parents
  * @param int siblings - number of siblings
  * @return nothing
*/
function setFamilyRelationships(parents, siblings) {
  var result = rollDice(3),
      totalFamilyMembers = parents + siblings;
  document.getElementById('familyDiceResults').innerHTML = "";
  if (result > totalFamilyMembers) {
    result = totalFamilyMembers;
  }
  if (result > 0) {
    familyRelationships.length = 0;
    for (var i = 0; i < result; i++) {
      var roll = rollDice(100);
      familyRelationships.push(roll);
      document.getElementById('familyDiceResults').innerHTML += roll + " ";
    }
  document.getElementById("numOfFamilyRelationships").innerHTML = result;
  } else {
    document.getElementById("numOfFamilyRelationships").innerHTML = "0";
  }
}

/**
  * @desc Determines die results (d20) for Fateful moments
  * @param int num - number of Fateful Moments
  * @return nothing
*/
function setFatefulMoments(num) {
  fatefulMomentResults = [];
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      fatefulMomentResults.push(rollDice(20));
    }
  }
}

/**
  * @desc Takes in whether character lives in a village and determines
  * number of parents and siblings
  * Triggers checking for Powerful Family Relationships
  * @param bool village - Whether character's settlement is a village
  * @return nothing
*/
function setFamilySize(village) {
  let parentResult = rollDice(100),
      siblingResult = rollDice(100),
      displayParents = document.getElementById("parents"),
      displaySiblings = document.getElementById("siblings");
  if (village) {
    if (parentResult <= 10) {
      numOfParents = 3;
    } else if (parentResult <= 50) {
      numOfParents = 2;
    } else if (parentResult <= 89) {
      numOfParents = 1;
    } else {
      numOfParents = 0;
    }
    if (siblingResult <= 10) {
      numOfSiblings = rollDice(4) + rollDice(4) + 2;
    } else if (siblingResult <= 50) {
      numOfSiblings = rollDice(4) + rollDice(4);
    } else if (siblingResult <= 89) {
      numOfSiblings = rollDice(4);
    } else {
      numOfSiblings = 0;
    }
  } else {
    if (parentResult <= 5) {
      numOfParents = 3;
    } else if (parentResult <= 60) {
      numOfParents = 2;
    } else if (parentResult <= 80) {
      numOfParents = 1;
    } else {
      numOfParents = 0;
    }
    if (siblingResult <= 5) {
      numOfSiblings = rollDice(4) + rollDice(4) + 2;
    } else if (siblingResult <= 60) {
      numOfSiblings = rollDice(4) + rollDice(4);
    } else if (siblingResult <= 80) {
      numOfSiblings = rollDice(4);
    } else {
      numOfSiblings = 0;
    }
  }
  if (numOfParents == 3) {
    displayParents.innerHTML = "3+";
  } else {
    displayParents.innerHTML = numOfParents;
  }

  displaySiblings.innerHTML = numOfSiblings;
  setFamilyRelationships(numOfParents, numOfSiblings);
}

/**
  * @desc Determines random Favorite Foods, mysterious secret, and prophecies
  * Also updates FE
  * @param none
  * @return nothing
*/
function setOthers() {
  let div = document.getElementById("others");
  favoriteFoodResult = rollDice(8);
  mysteriousSecretResult = rollDice(20);
  prophecyResult = rollDice(20);

  div.innerHTML += "<h3>Fateful Moments</h3>";
  if (fatefulMomentsNum > 0) {
    div.innerHTML += "<p>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#FatefulMoments' target='_blank'><i>Fateful Moments</i> table</a></p>";
    var moments = fatefulMomentResults.values();
    for (moment of moments) {
      div.innerHTML += "<li>" + moment + "</li>";
    }
  } else {
    div.innerHTML += "<p><i>No fateful moments</i></p>";
  }

  div.innerHTML += "<h3>Favorite Food, Mysterious Secret, and Prophecy Results</h3>";
  div.innerHTML += "<p><i>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#FavoriteFood' target='_blank'>Favorite Foods tables</a> for your primary settlement</i></p>";
  div.innerHTML += "<p><b>Favorite Food</b>: " + favoriteFoodResult + "</p>";
  div.innerHTML += "<p><i>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#MysteriousSecret' target='_blank'>Mysterious Secret table</a></i></p>";
  div.innerHTML += "<p><b>Mysterious Secret</b>: " + mysteriousSecretResult + "</p>";
  div.innerHTML += "<p><i>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#Prophecy' target='_blank'>Prophecy table</a></i></p>";
  div.innerHTML += "<p><b>Prophecy</b>: " + prophecyResult + "</p>";
}

// NEW methods. If user wants to reroll sections, these trigger
/**
  * @desc Reroll Born In region
  * @param none
  * @return nothing
*/
function newBornIn() {
  let newBorn = randomHomeland();
  while (newBorn == bornIn) {
    newBorn = randomHomeland();
  }
  setBorn(newBorn);

  // Check if current Raised In is the same as the new Born In
  if (raisedIn == newBorn || !bornDifferentThanRaised) {
    // re-roll!
    setBornDifferentThanRaised();
  }
  summary();
}

/**
  * @desc Reroll Raised In region
  * @param none
  * @return nothing
*/
function newRaisedIn() {
  let newRaised = randomHomeland();
  while (newRaised == bornIn || newRaised == raisedIn) {
    newRaised = randomHomeland();
  }
  setRaised(newRaised);
  newSettlements();
  summary();
}

/**
  * @desc Reroll Background
  * @param none
  * @return nothing
*/
function newBackground() {
  var newBackground = rollDice(20);
  while (newBackground == background) {
    newBackground = rollDice(20);
  }
  setBackground(newBackground);
  summary();
}

/**
  * @desc Reroll Settlements
  * I'm too damn lazy to refactor this to allow rerolling individual settlements
  * @param none
  * @return nothing
*/
function newSettlements() {
  let oldSettlement = settlement1;
  setSettlements();
  while (oldSettlement == settlement1) {
    setSettlements();
  }
  summary();
}

/**
  * @desc Reroll Race
  * @param none
  * @return nothing
*/
function newRace() {
  let current = chosenRace;
  while (current == chosenRace) {
    setRace(race, rollDice(100));
  }
  summary();
}

/**
  * @desc Reroll Family Size
  * @param none
  * @return nothing
*/
function newFamilySize() {
  let currentParents = numOfParents,
      currentSiblings = numOfSiblings;
  while (currentParents == numOfParents && currentSiblings == numOfSiblings) {
    setFamilySize(village);
  }
  summary();
}

// GET methods
/**
  * @desc Fetches text for a particular region int
  * @param int homeland - the raisedIn or bornIn region number
  * @return string - Text for the chosen region
*/
function getHomeland(homeland) {
  switch(homeland) {
    case 1:
      return "<a href='https://www.dndbeyond.com/sources/egtw/wildemount-gazetteer-menagerie-coast' target='_blank'>Menagerie Coast (choose Clovis Concord or Revelry Pirates)</a>";
      break;
    case 2:
      return "<a href='https://www.dndbeyond.com/sources/egtw/wildemount-gazetteer-marrow-valley' target='_blank'>Marrow Valley</a>";
      break;
    case 3:
      return "<a href='https://www.dndbeyond.com/sources/egtw/wildemount-gazetteer-zemni-fields' target='_blank'>Zemni Fields</a>";
      break;
    case 4:
      return "<a href='https://www.dndbeyond.com/sources/egtw/wildemount-gazetteer-greying-wildlands' target='_blank'>Greying Wildlands</a>";
      break;
    case 5:
      return "<a href='https://www.dndbeyond.com/sources/egtw/wildemount-gazetteer-wastes-of-xhorhas' target='_blank'>Xhorhas (choose Kryn Dynasty or Zarzith Kitril)</a>";
      break;
    default:
      return "Something went wrong.";
  }
}

/**
  * @desc Fetches text for the character's background
  * @param none
  * @return string - Text for the chosen background
*/
function getBackground() {
  switch(background) {
    case 1:
      return "<a href='https://www.dndbeyond.com/backgrounds/acolyte' target='_blank'>Acolyte</a>";
      break;
    case 2:
      return "<a href='https://www.dndbeyond.com/backgrounds/acolyte-luxonborn' target='_blank'>Acolyte (Luxonborn)</a>";
      break;
    case 3:
      return "<a href='https://www.dndbeyond.com/backgrounds/charlatan' target='_blank'>Charlatan</a>";
      break;
    case 4:
      return "<a href='https://www.dndbeyond.com/backgrounds/criminal-spy' target='_blank'>Criminal</a>";
      break;
    case 5:
      return "<a href='https://www.dndbeyond.com/backgrounds/criminal-myriad-operative' target='_blank'>Criminal (Myriad Operative)</a>";
      break;
    case 6:
      return "<a href='https://www.dndbeyond.com/backgrounds/entertainer' target='_blank'>Entertainer</a>";
      break;
    case 7:
      return "<a href='https://www.dndbeyond.com/backgrounds/folk-hero' target='_blank'>Folk Hero</a>";
      break;
    case 8:
      return "<a href='https://www.dndbeyond.com/backgrounds/grinner' target='_blank'>Grinner</a>";
      break;
    case 9:
      return "<a href='https://www.dndbeyond.com/backgrounds/guild-artisan-guild-merchant' target='_blank'>Guild Artisan</a>";
      break;
    case 10:
      return "<a href='https://www.dndbeyond.com/backgrounds/hermit' target='_blank'>Hermit</a>";
      break;
    case 11:
      return "<a href='https://www.dndbeyond.com/backgrounds/noble' target='_blank'>Noble</a>";
      break;
    case 12:
      return "<a href='https://www.dndbeyond.com/backgrounds/outlander' target='_blank'>Outlander</a>";
      break;
    case 13:
      return "<a href='https://www.dndbeyond.com/backgrounds/sage' target='_blank'>Sage</a>";
      break;
    case 14:
      return "<a href='https://www.dndbeyond.com/backgrounds/sage-cobalt-scholar' target='_blank'>Sage (Cobalt Scholar)</a>";
      break;
    case 15:
      return "<a href='https://www.dndbeyond.com/backgrounds/sailor' target='_blank'>Sailor</a>";
      break;
    case 16:
      return "<a href='https://www.dndbeyond.com/backgrounds/sailor-revelry-pirate' target='_blank'>Sailor (Revelry Pirate)</a>";
      break;
    case 17:
      return "<a href='https://www.dndbeyond.com/backgrounds/soldier' target='_blank'>Soldier</a>";
      break;
    case 18:
      return "<a href='https://www.dndbeyond.com/backgrounds/spy-augen-trust' target='_blank'>Spy (Augen Trust)</a>";
      break;
    case 19:
      return "<a href='https://www.dndbeyond.com/backgrounds/urchin' target='_blank'>Urchin</a>";
      break;
    case 20:
      return "<a href='https://www.dndbeyond.com/backgrounds/volstrucker-agent' target='_blank'>Volstrucker Agent</a>";
      break;
  }
}

/**
  * @desc Fetches text for a rival or ally's identity
  * @param int result - d100 result
  * @return string - Text for the selected identity
*/
function getIdentity(result) {
  if (result <= 5) {
    return "<a href='https://www.dndbeyond.com/monsters/commoner' target='_blank'>Commoner</a>";
  } else if (result <= 10) {
    return "<a href='https://www.dndbeyond.com/monsters/acolyte' target='_blank'>Acolyte</a>";
  } else if (result <= 15) {
    return "<a href='https://www.dndbeyond.com/monsters/bandit' target='_blank'>Bandit</a>";
  } else if (result <= 20) {
    return "<a href='https://www.dndbeyond.com/monsters/bandit-captain' target='_blank'>Bandit captain</a>";
  } else if (result <= 25) {
    return "<a href='https://www.dndbeyond.com/monsters/berserker' target='_blank'>Berserker</a>";
  } else if (result <= 30) {
    return "<a href='https://www.dndbeyond.com/monsters/cultist' target='_blank'>Cultist</a>";
  } else if (result <= 35) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/cult-fanatic' target='_blank'>Cult fanatic</a>";
  } else if (result <= 40) {
    return "<a href='https://www.dndbeyond.com/monsters/druid' target='_blank'>Druid</a>";
  } else if (result <= 45) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/gladiator' target='_blank'>Gladiator</a>";
  } else if (result <= 50) {
    return "<a href='https://www.dndbeyond.com/monsters/guard' target='_blank'>Guard</a>";
  } else if (result <= 55) {
    return "<a href='https://www.dndbeyond.com/monsters/knight' target='_blank'>Knight</a>";
  } else if (result <= 60) {
    return "<a href='https://www.dndbeyond.com/monsters/priest' target='_blank'>Priest</a>";
  } else if (result <= 65) {
    return "<a href='https://www.dndbeyond.com/monsters/scout' target='_blank'>Scout</a>";
  } else if (result <= 70) {
    return "<a href='https://www.dndbeyond.com/monsters/spy' target='_blank'>Spy</a>";
  } else if (result <= 75) {
    return "<a href='https://www.dndbeyond.com/monsters/tribal-warrior' target='_blank'>Tribal Warrior</a>";
  } else if (result <= 80) {
    return "<a href='https://www.dndbeyond.com/monsters/veteran' target='_blank'>Veteran</a>";
  } else if (result <= 84) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/mage' target='_blank'>Mage</a>";
  } else if (result <= 88) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/noble' target='_blank'>Noble</a>";
  } else if (result <= 92) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/assassin' target='_blank'>Assassin</a>";
  } else if (result <= 94) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/blood-hunter' target='_blank'>Blood Hunter</a>";
  } else if (result <= 96) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/werebear' target='_blank'>Good or neutral werebear</a> or <a href='https://www.dndbeyond.com/monsters/weretiger' target='_blank'>weretiger</a> (DM's choice)";
  } else if (result <= 98) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/wereboar' target='_blank'>Evil wereboar</a>, <a href='https://www.dndbeyond.com/monsters/wererat' target='_blank'>wererat</a>, or <a href='https://www.dndbeyond.com/monsters/werewolf' target='_blank'>werewolf</a> (DM's choice)";
  } else if (result <= 99) {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/archmage' target='_blank'>Archmage</a>";
  } else {
    fatefulMomentsNum++;
    return "<a href='https://www.dndbeyond.com/monsters/adult-gold-dragon' target='_blank'>Adult gold dragon</a> or <a href='https://www.dndbeyond.com/monsters/adult-red-dragon' target='_blank'>Adult red dragon</a> (DM's choice)";
  }
}

// RANDOM functions. This randomly select from a table.

/**
  * @desc Determines a homeland region
  * @param none
  * @return int between 1-5
*/
function randomHomeland() {
  let result = rollDice(100);
  if (result > 0 && result <= 21) {
    return 1;
  } else if (result > 21 && result <= 40) {
    return 2;
  } else if (result > 40 && result <= 72) {
    return 3;
  } else if (result > 72 && result <= 77) {
    return 4;
  } else {
    return 5;
  }
}

/**
  * @desc Determines a settlement (d100)
  * Based on determined settlement sets the bool village and array race.
  * @param none
  * @return string - Settlement text.
*/
function randomSettlement() {
  let result = rollDice(100);
  switch (raisedIn) {
    case 1: // Menagerie Coast
      if (result <= 1) {
        village = true;
        race = {"Human": 74, "Tabaxi": 9, "Dwarf": 6, "Other (besides Human, Tabaxi, or Dwarf)": 11};
        return "Brokenbank";
      } else if (result <= 2) {
        village = true;
        race = {"Human": 61, "Elf": 12, "Dwarf": 9, "Other (besides Human, Elf, or Dwarf)": 18};
        return "Darktow";
      } else if (result <= 9) {
        race = {"Human": 73, "Elf": 10, "Gnome": 5, "Other (besides Human, Elf, or Gnome)": 12};
        return "Feolinn";
      } else if (result <= 19) {
        race = {"Elf": 63, "Human": 16, "Gnome": 11, "Other (besides Elf, Human, or Gnome)": 10};
        return "Gwardan";
      } else if (result <= 36) {
        race = {"Human": 68, "Halfling": 13, "Dwarf": 8, "Other (besides Human, Halfling, or Dwarf)": 10}
        return "Nicodranas";
      } else if (result <= 40) {
        race = {"Human": 64, "Halfling": 16, "Half-Orc": 11, "Other (besides Human, Halfling, or Half-Orc)": 9};
        return "Othe";
      } else if (result <= 41) {
        race = {"Human": 68, "Halfling": 13, "Dwarf": 11, "Other (besides Human, Halfling, or Dwarf)": 8};
        village = true;
        return "Palma Flora";
      } else if (result <= 84) {
        race = {"Human": 51, "Halfling": 16, "Elf": 15, "Other (besides Human, Halfling, or Elf)": 18};
        return "Port Damali";
      } else if (result <= 93) {
        race = {"Human": 80, "Halfling": 7, "Other (besides Human or Halfling)": 13};
        return "Port Zoon";
      } else {
        race = {"Human": 74, "Elf": 10, "Halfling": 8, "Other (besides Human, Elf, or Halfling)": 8}
        return "Tussoa";
      }
      break;
    case 2: // Marrow Valley
      if (result <= 2) {
        village = true;
        race = {"Human": 61, "Halfling": 22, "Gnome": 11, "Other (besides Human, Halfling, and Gnome)": 6};
        return "Alfield";
      } else if (result <= 5) {
        village = true;
        race = {"Dark Elf": 74, "Other (besides Dark Elf)": 26};
        return "Ashguard Garrison";
      } else if (result <= 7) {
        race = {"Human": 63, "Halfling": 17, "Gnome": 12, "Other (besides Human, Halfling, and Gnome)": 8};
        village = true;
        return "Berleben";
      } else if (result <= 12) {
        race = {"Half-Orc": 32, "Orc": 21, "Human": 25, "Other (besides Half-Orc, Orc, or Human)": 22};
        return "Bladegarden";
      } else if (result <= 18) {
        race = {"Human": 60, "Dwarf": 26, "Halfling": 10, "Other (besides Human, Halfling, and Dwarf)": 4};
        return "Deastock";
      } else if (result <= 22) {
        race = {"Human": 21, "Halfling": 58, "Dragonborn": 6, "Other (besides Human, Halfling, and Dragonborn)": 15};
        return "Felderwin";
      } else if (result <= 32) {
        race = {"Dwarf": 81, "Human": 8, "Halfling": 6, "Other (besides Human, Halfling, and Dwarf)": 5};
        return "Grimgolir";
      } else if (result <= 40) {
        race = {"Human": 8, "Dwarf": 10, "Gnome": 76, "Other (besides Human, Dwarf, and Gnome)": 6};
        return "Hupperdook";
      } else if (result <= 44) {
        race = {"Human": 58, "Halfling": 23, "Dwarf": 13, "Other (besides Human, Halfling, and Dwarf)": 6};
        return "Kamordah";
      } else if (result <= 45) {
        village = true;
        race = {"Human": 11, "Halfling": 4, "Dragonborn": 82, "Other (besides Human, Halfling, and Dragonborn)": 3};
        return "Talonstadt";
      } else if (result <= 50) {
        race = {"Human": 66, "Halfling": 13, "Half-Elf": 8, "Other (besides Human, Halfling, and Half-Elf)": 13};
        return "Trostenwald";
      } else if (result <= 52) {
        village = true;
        race = {"Aarakocra": 96, "Other (besides Aarakocra)": 4};
        return "Vol'antim";
      } else {
        race = {"Human": 70, "Halfling": 11, "Dwarf": 9, "Other (besides Human, Halfling, and Dwarf)": 10};
        return "Zadash";
      }
      break;
    case 3: // Zemni Fields
      if (result <= 1) {
        village = true;
        race = {"Human": 71, "Dwarf": 12, "Elf": 11, "Other (besides Human, Dwarf, and Elf)": 6};
        return "Blumenthal";
      } else if (result <= 7) {
        race = {"Human": 7, "Elf": 83, "Other (besides Human and Elf)": 10};
        return "Bysaes Tyl";
      } else if (result <= 11) {
        race = {"Human": 70, "Dwarf": 14, "Elf": 9, "Other (besides Human, Dwarf, and Elf)": 7};
        return "Druvenlode";
      } else if (result <= 13) {
        race = {"Human": 71, "Elf": 12, "Dwarf": 10, "Other (besides Human, Elf, and Dwarf)": 7};
        village = true;
        return "Icehaven";
      } else if (result <= 18) {
        race = {"Human": 70, "Dwarf": 17, "Elf": 8, "Other (besides Human, Dwarf, and Elf)": 5};
        return "Nogvurot";
      } else if (result <= 20) {
        race = {"Human": 73, "Elf": 12, "Dwarf": 8, "Other (besides Human, Elf, and Dwarf)": 7};
        return "Odessloe";
      } else if (result <= 26) {
        race = {"Dwarf": 81, "Human": 8, "Halfling": 6, "Other (besides Dwarf, Human, or Halfling)": 5};
        return "Pride's Call";
      } else if (result <= 96) {
        race = {"Human": 81, "Dwarf": 8, "Halfling": 6, "Other (besides Human, Halfling, and Dwarf)": 5};
        return "Rexxentrum";
      } else if (result <= 98) {
        village = true;
        race = {"Human": 71, "Halfling": 12, "Dwarf": 12, "Other (besides Human, Halfling, and Dwarf)": 5};
        return "Rockguard Garrison";
      } else if (result <= 99) {
        village = true;
        race = {"Gnome": 98, "Other (besides Gnome)": 2};
        return "Velvin Thicket";
      } else {
        village = true;
        race = {"Human": 54, "Dwarf": 28, "Elf": 14, "Other (besides Human, Dwarf, and Elf)": 4};
        return "Yrrosa";
      }
      break;
    case 4: // Greying Wildlands
      if (result <= 3) {
        village = true;
        race = {"Orc": 70, "Half-Orc": 17, "Other (besides Orc and Half-Orc)": 13};
        return "Boroftkrah";
      } else if (result <= 6) {
        race = {"Dwarf": 61, "Elf": 32, "Gnome": 3, "Other (besides Dwarf, Elf, and Gnome)": 4};
        village = true;
        return "Palebank Village";
      } else if (result <= 30) {
        race = {"Human": 56, "Elf": 15, "Dwarf": 14, "Other (besides Human, Elf, and Dwarf)": 15};
        return "Shadycreek Run";
      } else {
        race = {"Human": 56, "Elf": 36, "Gnome": 4, "Other (besides Human, Elf, and Gnome)": 4};
        return "Uthodurn";
      }
      break;
    case 5: // Eastern Wynandir
      if (result <= 20) {
        race = {"Goblinoid": 41, "Gnoll": 32, "Dark Elf": 10, "Other (besides Goblinoid, Gnoll, and Dark Elf)": 17};
        return "Asarius";
      } else if (result <= 21) {
        race = {"Dark Elf": 81, "Goblinoid": 8, "Other (besides Dark Elf and Goblinoid)": 11};
        village = true;
        return "Bazzoxan";
      } else if (result <= 22) {
        race = {"Dragonborn": 53, "Halfling": 41, "Other (besides Dragonborn and Halfling)": 6};
        village = true;
        return "Charis";
      } else if (result <= 30) {
        village = true;
        race = {"Goblinkin": 41, "Orc": 19, "Humanoid": 15, "Other (besides Goblinkin, Orc, and Humanoid)": 25};
        return "Igrathad";
      } else if (result <= 36) {
        race = {"Goblinkin": 56, "Orc": 31, "Other (besides Orc and Goblinkin)": 13};
        return "Jigow";
      } else if (result <= 37) {
        village = true;
        race = {"Human": 70, "Dragonborn": 20, "Other (besides Human and Dragonborn)": 10};
        return "New Haxon";
      } else if (result <= 89) {
        race = {"Dark Elf": 66, "Goblin": 9, "Duergar": 7, "Other (besides Dark Elf, Goblin, and Duergar)": 18};
        return "Rosohna (Ghor Dranas)";
      } else if (result <= 93) {
        race = {"Human": 30, "Dark Elf": 15, "Goblin": 15, "Tiefling": 15, "Hollow One": 5, "Other (besides Human, Dark Elf, Goblin, Tiefling, and Hollow One)": 20};
        return "Rotthold";
      } else if (result <= 96) {
        race = {"Goblinoid": 62, "Gnoll": 21, "Orc": 10, "Other (besides Goblinoid, Gnoll, and Orc)": 7};
        village = true;
        return "Urzin";
      } else {
        race = {"Dragonborn": 93, "Other (besides Dragonborn)": 7};
        return "Xarzith Kitril";
      }
      break;
    default:
      break;
  }
}

/**
  * @desc Acolytes in Dwendalian Empire require making a choice of faith (legal vs illegal)
  * This choice also means you gain either an ally or a rival. As such, this will change the
  * number of allies/rivals a character has.
  * Updates FE
  * @param none
  * @return nothing
*/
function checkAcolyte() {
  if (acolyteLegalFaithChoice) {
    let display = document.getElementById('acolyte');
    display.innerHTML = "<p>Due to being an Acolyte within the Dwendalian Empire, choose to follow a Legal or an Illegal Faith.</p>";
    display.innerHTML += "<p><i>Legal Faith</i>: Ally: " + allyResults[0]["identity"] + ". Die Result (Consult <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'><i>Ally Relationships</i></a> Table): " + allyResults[0]["roll"] + "</p>";
    display.innerHTML += "<p><i>Illegal Faith</i>: Rival: " + allyResults[0]["identity"] + ". Die Result (Consult <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'><i>Rival Relationships</i></a> Table): " + allyResults[0]["roll"] + "</p>";
    allyResults.shift();
  }
  let allyDiv = document.getElementById('allies'),
      rivalDiv = document.getElementById('rivals');
  allyDiv.innerHTML = "";
  if (allyResults.length > 0) {
    allyDiv.innerHTML += "<p><i>Consult the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'>Ally Relationships Table</a></i><p>";
    var ally = allyResults.values();
    for (result of ally) {
      allyDiv.innerHTML += "<li>" + result["identity"] + ". Roll Result: " + result["roll"] + "</li>";
    }
  } else {
    allyDiv.innerHTML += "<p><i>No Allies</i></p>";
  }
  rivalDiv.innerHTML = "";
  if (rivalResults.length > 0) {
    rivalDiv.innerHTML += "<p><i>Consult the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'>Rival Relationships Table</a></i><p>";
    var rival = rivalResults.values();
    for (result of rival) {
      rivalDiv.innerHTML += "<li>" + result["identity"] + ". Roll Result: " + result["roll"] + "</li>";
    }
  } else {
    rivalDiv.innerHTML += "<p><i>No Rivals</i></p>";
  }
}

/**
  * @desc Generates a random character.
  * @param none
  * @return nothing
*/
function fullyRandomCharacter() {
  setBornIn();
  setRaisedIn();
  setBackground();
  setSettlements();
  setFamilySize(village);
  setFatefulMoments(fatefulMomentsNum);
  setOthers();
  summary();
}

/**
  * @desc Updates the FE Summary section with current character info.
  * @param none
  * @return nothing
*/
function summary() {
  let div = document.getElementById("summary");
  div.innerHTML = "";
  div.innerHTML += "Born In: " + getHomeland(bornIn) + ". <br>Raised in: " + getHomeland(raisedIn);
  div.innerHTML += "<br>Primary Settlement: " + settlement1;
  if (traveler)
    div.innerHTML += ". Additional Settlements: " + settlement2 + " and/or " + settlement3;
  div.innerHTML += "<br>Race: " + chosenRace;
  div.innerHTML += "<br>Background: " + getBackground();
  div.innerHTML += "<br>Family: ";
  if (numOfParents == 3)
    div.innerHTML += "3+";
  else {
    div.innerHTML += numOfParents;
  }
  div.innerHTML += " parents & " + numOfSiblings + " siblings alive.";
  if (familyRelationships.length > 0) {
    var relations = familyRelationships.values();
    div.innerHTML += "<br>Powerful Family Relationships Results: ";
    for (relationship of relations) {
      div.innerHTML += relationship + " ";
    }
  }
  if (acolyteLegalFaithChoice) {
    let acoDiv = document.getElementById("acolyte").innerHTML;
    div.innerHTML += "<br>" + acoDiv;
  } else {
    if (allyResults.length > 0) {
      div.innerHTML += "<br>Ally results: ";
      var ally = allyResults.values();
      for (result of ally) {
        div.innerHTML += result["identity"] + ". Roll Result: " + result["roll"] + ". ";
      }
    } else {
      div.innerHTML += "<br>No Allies";
    }
    if (rivalResults.length > 0) {
      div.innerHTML += "<br>Rival results: ";
      var rival = rivalResults.values();
      for (result of rival) {
        div.innerHTML += result["identity"] + ". Roll Result: " + result["roll"] + ". ";
      }
    } else {
      div.innerHTML += "<br>No rivals.";
    }
  }
  if (fatefulMomentsNum > 0) {
    setFatefulMoments(fatefulMomentsNum);
    div.innerHTML += "<br>Fateful Moments: ";
    var moments = fatefulMomentResults.values();
    for (moment of moments) {
      div.innerHTML += moment + " ";
    }
  } else {
    div.innerHTML += "<p><i>No fateful moments</i></p>";
  }
   div.innerHTML += "<br>Favorite Food: " + favoriteFoodResult + ". Mysterious Secret: " + mysteriousSecretResult + ". Prophecy: " + prophecyResult;
}

/**
  * @desc Rolls a number between 1 and max
  * @param int max - Highest number
  * @return int - random number between 1 and max
*/
function rollDice(max) {
  return Math.floor(Math.random() * max) + 1;
}
