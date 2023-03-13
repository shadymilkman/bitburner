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

    // If 'homeIndex' do not equal -1
    if (homeIndex !== -1) {

        // Splice 'allServers' in 'homeIndex' and return the second element in the array
        allServers.splice(homeIndex, 1);

    }

    // EXECUTION
    // Outer while loop to control number of times the loop will execute (prevents infinte looping)
    while (loopCount < maxLoops) {

        // Creates an empty set
        let processedServers = new Set();

        // Creates a set populated with the 'allServers' data
        let newServers = new Set(allServers);

        // While the count of the 'newServers' array is greater than 0
        while (newServers.size > 0) {

            // Build variable for the next server in the loop
            let server = newServers.values().next().value;

            // Remove server from 'newServers'
            newServers.delete(server);

            // If 'server' is contained in 'processedServers'
            if (processedServers.has(server)) {

                continue;

            }

            // Add 'server' to 'processedServers' array
            processedServers.add(server);

            // Installs SSH exploit on target server
            ns.brutessh(server);

            // Install FTP exploit on target server
            ns.ftpcrack(server);

            // Install SMTP exploit on target server
            ns.relaysmtp(server);

            // Install HTTP exploit on target server
            ns.httpworm(server);

            // Install SQL exploit on target server
            ns.sqlinject(server);

            // Take controll of the target server
            ns.nuke(server);

            // Install backdoor on the target server
            // TODO: figure out how to target 'server' / currently targets 'home' on ever loop
            // await ns.singularity.installBackdoor(server, 22);

            // Print the target server's hostname to stdout
            ns.tprint(server);

            // Print the hacking level required for the player to hack the target server
            ns.tprint(`Required hacking level: ${ns.getServerRequiredHackingLevel(server)}`);

            // Print the maximum amount of money the target server can earn
            ns.tprint(`Max money available: ${ns.getServerMaxMoney(server)}`);

            // Print separator to stdout
            ns.tprint('============================================================');

            // Define scanned servers
            let scannedServers = ns.scan(server);

            // For each 'scannedServer' in 'scannedServers'
            for (let scannedServer of scannedServers) {

                // If 'scannedServer' does not contain 'home' or 'haxor*', and is not included in 'allServers'
                if ((scannedServer !== 'home' || `${/^haxor.*$/.test(haxor)}`) && !allServers.includes(scannedServer)) {

                    // Add the 'scannedServer' value to 'newServers'
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