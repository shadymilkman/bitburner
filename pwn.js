/** @param {NS} ns */
export async function main(ns) {
  
  // VARIABLES
  // Scans from the current machine, and assign the return to allServers
  let allServers = ns.scan(ns.getHostname());

  // Defines the maximum number of loops that will execute
  let maxLoops = 1;

  // Defines the starting loop counter
  let loopCount = 0;

  // Builds an index of servers scanned from the home server
  const homeIndex = allServers.indexOf('home');
  if(homeIndex !== -1) {
    allServers.splice(homeIndex, 1);
  }

  // EXECUTION
  // Outer while loop to control number of times the loop will execute (prevents infinte looping)
  while (loopCount < maxLoops) {
    // Creates an empt
    let processedServers = new Set();
    let newServers = new Set(allServers);

    while (newServers.size > 0) {
      let server = newServers.values().next().value;
      newServers.delete(server);

      if (processedServers.has(server)) {
        continue;
      }

      processedServers.add(server);

      // Code execution block for server
      ns.brutessh(server);
      ns.ftpcrack(server);
      ns.relaysmtp(server);
      ns.httpworm(server);
      ns.sqlinject(server);
      ns.nuke(server);
      // await ns.singularity.installBackdoor(server, 22);
      ns.tprint(server);
      ns.tprint(`Required hacking level: ${ns.getServerRequiredHackingLevel(server)}`);
      ns.tprint(`Max money available: ${ns.getServerMaxMoney(server)}`);
      ns.tprint('============================================================');
      // End of server processing

      let scannedServers = ns.scan(server);

      for (let scannedServer of scannedServers) {
        if (scannedServer !== 'home' && !allServers.includes(scannedServer)) {
          newServers.add(scannedServer);
        }
      }
    }

    // Iterate loop count
    loopCount++;

    // Sleep for 5ms
    await ns.sleep(5);
  }

}