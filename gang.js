/** @param {NS} ns */
export async function main(ns) {

  // Defines an array of numbers spelled out; used to name gang members when recruited
  const myGangsterNames = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve'
  ]

  // Defines the task we want the gang to engage in
  // let myGangTask = 'Strongarm Civilians';
  let myGangTask = 'Territory Warfare';

  // Defines the name that will be set for the next gang member we recruit
  let myGangsterNextName = myGangsterNames[ns.gang.getMemberNames().length];
  
  // Validates if we have enough respect to recruit a new gang member
  if (ns.gang.canRecruitMember()) {
      // if true recruits a member to the gang and names them based on an array of how many members are in the gang
      ns.gang.recruitMember(myGangsterNextName);
      // if gangster name matches
      if (myGangsterNextName === 'seven') {
          // sets gangster's task to Vigilante Justice
          ns.gang.setMemberTask('seven', 'Vigilante Justice');
      }
      else {
          // else sets gangster's task to the myGangTask variable
          ns.gang.setMemberTask(myGangsterNextName, myGangTask)
          // prints recruitment and task status
          ns.tprint(`${myGangsterNextName} has been reqruited, and tasked with: ${myGangTask}`)
      }
  }
  
  // Loops through each gangster
  for (let gangster of ns.gang.getMemberNames()) {
      // if gangster's name matches
      if (gangster === 'seven') {
          // sets gangster's task to Vigilante Justice
          ns.gang.setMemberTask('seven', 'Vigilante Justice');
      }
      // else if gang is actively engaged in territory warfare, and gangster name matches
      else if ((ns.gang.getGangInformation()['territoryWarfareEngaged'] === true) && (gangster === 'eleven' || gangster === 'twelve')) {
          // sets gangster's task to Territory Warfare
          ns.gang.setMemberTask(gangster, 'Territory Warfare');
      }
      else {
          // else, sets their task based on the myGangTask variable
          ns.gang.setMemberTask(gangster, myGangTask);
      }
      // validates the above by printing to stdout the gangsters current task
      ns.tprint(`${gangster} is engaged in ${ns.gang.getMemberInformation(gangster)['task']}`);
  }

  // Loops through the available equipment for purchase and evaluates the cost to purchase for each gangster
  for (let gangEquip of ns.gang.getEquipmentNames()) {
      // if we have enough cash
      if ((ns.gang.getEquipmentCost(gangEquip) * ns.gang.getMemberNames().length) < (ns.getServerMoneyAvailable('home') * 0.75)) {
          // loop through each gangster
          for (let gangster of ns.gang.getMemberNames()) { 
              // and purchase that equipment for them
              ns.gang.purchaseEquipment(gangster, gangEquip);
          }
      }

      // Sleep for 100ms
      await ns.sleep(100);
  }
}