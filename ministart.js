/** @param {NS} ns */
export async function main(ns) {

  // Defines my hacking level
  let myHackLvl = ns.getHackingLevel();

  // Defines how much money we have
  let myMoney = ns.getServerMoneyAvailable('home');

  // Defines the total amount of RAM on the 'home' server
  let myMaxRam = ns.getServerMaxRam('home');

  // Defines the amount of RAM we are willing to commit to the hacking scripts calculation
  // If we have less than 256 GiBs of total RAM
  let myAvailableRam;
  if (myMaxRam < 256) {
      // assigns the maximum amount of RAM to the variable 'myAvailableRam'
      myAvailableRam = myMaxRam; 
  }
  else {
      // assigns max RAM minus 128 GiBs to the variable 'myAvailableRam' 
      myAvailableRam = (myMaxRam - 128);
  }

  // Defines the target that we will attack (exportable variable)
  let myTarget = await ns.prompt('Whom shall we hack?', {type:'text'});

  // Sets the myTarget variable as a local storage item called 'target'
  localStorage.setItem('target', myTarget);

  // Defines variables used to calculate how many threads of our hacking script we can run 
  // based on the ammount of RAM we have commited to running hacking scripts
  // let myScriptRamCost = Math.floor(Number(myMaxRam) / 2.4);
  let myScriptRamCost = Math.floor(Number(myAvailableRam) / 2.4);
  
  let myUsableThreads = myScriptRamCost > 0 ? myScriptRamCost : 1;

  // Validates if we have less than the required hacking level to attach our target
  // if (myHackLvl < ns.getServerRequiredHackingLevel(myTarget)) {
  //     ns.tprint(myHackLvl);
  //     // if true attend the defined course at the specified university
  //     ns.singularity.universityCourse('Rothman University', 'Studying Computer Science', false);
  // }
  
  // If we meet the minimum required hacking level, validates if we own the target
  if (!ns.hasRootAccess(myTarget)) {
      // If false nuke the target server
      ns.nuke(myTarget);
      // and prints confirmation of ownership to console
      ns.tprint(`${myTarget} owned? ${ns.hasRootAccess(myTarget)}`);
  }

  // If we do not have the TOR router, and we have more than $200K
  if (!ns.hasTorRouter() && myMoney > 200000) {
      // purchase TOR router
      ns.singularity.purchaseTor();
      // prints purchse to stdout
      ns.tprint(`Darkweb access? ${ns.hasTorRouter()}`)
  }

  // // If we have enough money to buy all the Darkweb Programs, purchase them
  // for (let darkwebProgram in ns.singularity.getDarkwebPrograms()){
  //     let programCosts = [];
  //     for (let programCostLoopCount = 0; programCostLoopCount < ns.singularity.getDarkwebPrograms().length; programCostLoopCount++) {
  //         programCost = ns.singularity.getDarkwebProgramCost(darkwebProgram);
  //         programCosts.push(programCost);
  //     }
  //     if (myProgramCosts < myMoney * 0.5) {
  //         ns.singularity.purchaseProgram(darkwebProgram);
  //         ns.tprint(`Purchased ${darkwebProgram}`);
  //     }
  // }

  // If defined script is currently running on the 'home' server
  if (!ns.isRunning('empty-hack.js', 'home')) {
      // Stops this script, sleeps 10 seconds, starts defined script with the desired number of
      // threads based on the ammount of RAM we commited to running hacking scripts
      ns.spawn('empty-hack.js', myUsableThreads);
  }
}