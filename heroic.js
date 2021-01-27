// Roll a d(max)
function rollDice(max) {
  return Math.floor(Math.random() * max) + 1;
}

// Backstory Section
// Homeland
let bornIn = 0,
    raisedIn = 0,
    bornDifferentThanRaised = false,
    background = 0,
    socialAllies = 0,
    socialRivals = 0,
    acolyteLegalFaithChoice = false,
    settlement1 = "",
    settlement2 = "",
    settlement3 = "",
    chosenSettlement = "",
    village = false,
    race = {},
    chosenRace = "",
    numOfParents = 0,
    numOfSiblings = 0,
    familyRelationships = [],
    allyResults = [],
    rivalResults = [],
    fatefulMomentsNum = 0,
    fatefulMomentResults = [],
    favoriteFoodResult = 0,
    mysteriousSecretResult = 0,
    prophecyResult = 0;

function setBorn(region) {
  bornIn = region;
}

function setRaised(region) {
  raisedIn = region;
}

function setBornDifferentThanRaised(born) {
  bornDifferentThanRaised = born;
}

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

function setBornIn() {
  setBorn(randomHomeland());
}

function setRaisedIn() {
  let result = randomHomeland();
  while (result == bornIn) {
    result = randomHomeland();
  }
  setRaised(result);
}

function getHomeland(homeland) {
  switch(homeland) {
    case 1:
      return "Menagerie Coast (choose Clovis Concord or Revelry Pirates)";
      break;
    case 2:
      return "Marrow Valley";
      break;
    case 3:
      return "Zemni Fields";
      break;
    case 4:
      return "Greying Wildlands";
      break;
    case 5:
      return "Xhorhas (choose Kryn Dynasty or Zarzith Kitril)";
      break;
    default:
      return "";
  }
}
// End homeland

// Backgrounds
function setBackground() {
  background = rollDice(20);
}

function getBackground() {
  switch(background) {
    case 1:
      return "Acolyte";
      break;
    case 2:
      return "Acolyte (Luxonborn)";
      break;
    case 3:
      return "Charlatan";
      break;
    case 4:
      return "Criminal";
      break;
    case 5:
      return "Criminal (Myriad Operative)";
      break;
    case 6:
      return "Entertainer";
      break;
    case 7:
      return "Folk Hero";
      break;
    case 8:
      return "Grinner";
      break;
    case 9:
      return "Guild Artisan";
      break;
    case 10:
      return "Hermit";
      break;
    case 11:
      return "Noble";
      break;
    case 12:
      return "Outlander";
      break;
    case 13:
      return "Sage";
      break;
    case 14:
      return "Sage (Cobalt Scholar)";
      break;
    case 15:
      return "Sailor";
      break;
    case 16:
      return "Sailor (Revelry Pirate)";
      break;
    case 17:
      return "Soldier";
      break;
    case 18:
      return "Spy (Augen Trust)";
      break;
    case 19:
      return "Urchin";
      break;
    case 20:
      return "Volstrucker Agent";
      break;
  }
}
// End Background

// Social Status Relationships
function setSocialStatusRelationships() {
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
          socialRivals += 1;
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
}
// End Social Status Relationships

// Settlement
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

function setSettlements() {
  settlement1 = randomSettlement();
  let saveRace = race,
      saveVillage = village;
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
}

function setRace(races, result) {
  var comparator = 0;
  for (chosen in races) {
    comparator += races[chosen];
    if (result <= comparator) {
      chosenRace = chosen;
      return;
    }
  }
} // End Home Settlement

// Family size
function setFamilySize(village) {
  let parentResult = rollDice(100),
      siblingResult = rollDice(100);
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
} // End Family Size

// Family Relationships
function setFamilyRelationships(parents, siblings) {
  let result = rollDice(3),
      totalFamilyMembers = parents + siblings;
  if (result > totalFamilyMembers) {
    result = totalFamilyMembers;
  }
  if (result > 0) {
    for (var i = 0; i < result; i++) {
      familyRelationships.push(rollDice(100));
    }
  }
} // End Family Relationships

// Allies and Rivals
function setAllies(num) {
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      allyResults.push({
        "identity": getIdentity(rollDice(100)),
        "roll": rollDice(100)
      });
    }
  }
}

function setRivals(num) {
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      rivalResults.push({
        "identity": getIdentity(rollDice(100)),
        "roll": rollDice(100)
      });
    }
  }
}

function getIdentity(result) {
  if (result <= 5) {
    return "Commoner";
  } else if (result <= 10) {
    return "Acolyte";
  } else if (result <= 15) {
    return "Bandit";
  } else if (result <= 20) {
    return "Bandit captain";
  } else if (result <= 25) {
    return "Berserker";
  } else if (result <= 30) {
    return "Cultist";
  } else if (result <= 35) {
    fatefulMomentsNum++;
    return "Cult fanatic";
  } else if (result <= 40) {
    return "Druid";
  } else if (result <= 45) {
    fatefulMomentsNum++;
    return "Gladiator";
  } else if (result <= 50) {
    return "Guard";
  } else if (result <= 55) {
    return "Knight";
  } else if (result <= 60) {
    return "Priest";
  } else if (result <= 65) {
    return "Scout";
  } else if (result <= 70) {
    return "Spy";
  } else if (result <= 75) {
    return "Tribal Warrior";
  } else if (result <= 80) {
    return "Veteran";
  } else if (result <= 84) {
    fatefulMomentsNum++;
    return "Mage";
  } else if (result <= 88) {
    fatefulMomentsNum++;
    return "Noble";
  } else if (result <= 92) {
    fatefulMomentsNum++;
    return "Assassin";
  } else if (result <= 94) {
    fatefulMomentsNum++;
    return "Blood Hunter";
  } else if (result <= 96) {
    fatefulMomentsNum++;
    return "Good or neutral werebear or weretiger (DM's choice)";
  } else if (result <= 98) {
    fatefulMomentsNum++;
    return "Evil wereboar, wererat, or werewolf (DM's choice)";
  } else if (result <= 99) {
    fatefulMomentsNum++;
    return "Archmage";
  } else {
    fatefulMomentsNum++;
    return "Adult gold dragon or Adult red dragon (DM's choice)";
  }
} // End Allies and Rivals

// Fateful Moments
function setFatefulMoments(num) {
  if (num > 0) {
    for (var i = 0; i < num; i++) {
      fatefulMomentResults.push(rollDice(20));
    }
  }
} // End Fateful Moments

// Favorite Foods, mysterious secret, and prophecies
function setOthers() {
  favoriteFoodResult = rollDice(8);
  mysteriousSecretResult = rollDice(20);
  prophecyResult = rollDice(20);
} // End Favorite Foods, mysterious secret, and prophecies

// Here we go! Let's generate a random character
function fullyRandomCharacter() {
  setBornIn();
  setRaisedIn();
  setBackground();
  setSocialStatusRelationships();
  setSettlements();
  setRace(race, rollDice(100));
  setFamilySize(village);
  setFamilyRelationships(numOfParents, numOfSiblings);
  setAllies(socialAllies);
  setRivals(socialRivals);
  setFatefulMoments(fatefulMomentsNum);
  setOthers();
  displayResults();
}

function displayResults() {
  let div = document.getElementById("display");
  div.innerHTML = "";
  div.innerHTML += "<h1>Homeland</h1>";
  div.innerHTML += "<p><b>Born In:</b> " + getHomeland(bornIn) + "</p>";
  div.innerHTML += "<p><b>Raised In</b> (Optional, if you want to have grown up in a different region): " + getHomeland(raisedIn) + "</p>";
  div.innerHTML += "<h2>Home Settlements</h2><b>Primary Settlement</b>: " + settlement1 + "<br>";
  div.innerHTML += "If your character is a traveler (nomad, soldier, etc), you may also have connections located in: " + settlement2 + " and " + settlement3 + ".<br>";
  div.innerHTML += "<p><b>Race</b> (Based on primary settlement): " + chosenRace + "</p>";
  div.innerHTML += "<h1>Background</h1>";
  div.innerHTML += "<p><b>Background:</b> " + getBackground() + "</p>";
  div.innerHTML += "<h1>Social Status</h1>";
  div.innerHTML += "<h3>Family</h3>";
  div.innerHTML += "<p><b>Parents Alive</b>: " + numOfParents + "</p>";
  div.innerHTML += "<p><b>Siblings Alive</b>: " + numOfSiblings + "</p>";

  if (familyRelationships.length > 0) {
    var relations = familyRelationships.values();
    div.innerHTML += "<p><b>Powerful Family Relationships Results</b> (Refer to <i><a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#PowerfulFamilyRelationships' target='_blank'>Family Relationships table</a></i>):</p>";
    for (relationship of relations) {
      div.innerHTML += "<li>" + relationship + "</li>";
    }
  }
  div.innerHTML += "<h1>Allies and Rivals</h1>";

  if (acolyteLegalFaithChoice) {
    div.innerHTML += "<p>As your background is Acolyte and you grew up in the Dwendalian Empire, you can choose to worship";
    div.innerHTML += " a legal faith or an illegal faith.";
    div.innerHTML += "<p><i>Legal Faith</i>: Ally: " + allyResults[0]["identity"] + ". Die Result (Consult <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'><i>Ally Relationships</i></a> Table): " + allyResults[0]["roll"] + "</p>";
    div.innerHTML += "<p><i>Illegal Faith</i>: Rival: " + rivalResults[0]["identity"] + ". Die Result (Consult <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'><i>Rival Relationships</i></a> Table): " + rivalResults[0]["roll"] + "</p>";
    allyResults.shift();
    rivalResults.shift();
  }
  if (allyResults.length > 0) {
    div.innerHTML += "<h2>Allies</h2>";
    div.innerHTML += "<p><i>Consult the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'>Ally Relationships Table</a></i><p>";
    var ally = allyResults.values();
    for (result of ally) {
      div.innerHTML += "<li>" + result["identity"] + ". Roll Result: " + result["roll"] + "</li>";
    }
  } else {
    div.innerHTML += "<p><i>No Allies</i></p>";
  }
  if (rivalResults.length > 0) {
    div.innerHTML += "<h2>Rivals</h2>";
    div.innerHTML += "<p><i>Consult the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#AcquiredAlliesandRivals' target='_blank'>Rival Relationships Table</a></i><p>";
    var rival = rivalResults.values();
    for (result of rival) {
      div.innerHTML += "<li>" + result["identity"] + ". Roll Result: " + result["roll"] + "</li>";
    }
  } else {
    div.innerHTML += "<p><i>No Rivals</i></p>";
  }

  div.innerHTML += "<h1>Fateful Moments</h1>";
  if (fatefulMomentsNum > 0) {
    div.innerHTML += "<p>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#FatefulMoments' target='_blank'><i>Fateful Moments</i> table</a></p>";
    var moments = fatefulMomentResults.values();
    for (moment of moments) {
      div.innerHTML += "<li>" + moment + "</li>";
    }
  } else {
    div.innerHTML += "<p><i>No fateful moments</i></p>";
  }

  div.innerHTML += "<h1>Favorite Food, Mysterious Secret, and Prophecy Results</h1>";
  div.innerHTML += "<p><i>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#FavoriteFood' target='_blank'>Favorite Foods tables</a> for your primary settlement</i></p>";
  div.innerHTML += "<p><b>Favorite Food</b>: " + favoriteFoodResult + "</p>";
  div.innerHTML += "<p><i>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#MysteriousSecret' target='_blank'>Mysterious Secret table</a></i></p>";
  div.innerHTML += "<p><b>Mysterious Secret</b>: " + mysteriousSecretResult + "</p>";
  div.innerHTML += "<p><i>Refer to the <a href='https://www.dndbeyond.com/sources/egtw/character-options-subclasses#Prophecy' target='_blank'>Prophecy table</a></i></p>";
  div.innerHTML += "<p><b>Prophecy</b>: " + prophecyResult + "</p>";
}
