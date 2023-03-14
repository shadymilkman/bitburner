/** @param {NS} ns */
export async function main(ns) {

    // Defines the target that we will attack (exportable variable)
    let myTarget = await ns.prompt('Whom shall we hack?', {type:'text'});

    // Define how much RAM the server will have (in GiBs)
    // let ram = await ns.prompt('How much RAM to purchase?', {type:'text'});
    let ram = ns.getServerMaxRam('home');

    // Defines the target script to upload
    const myScript = 'empty-hack.js';

    // Defines how many threads we can run based on the amount of RAM we requested for this node
    const hakMath = Math.floor(Number(ram) / 2.4);

    const hakThreads = hakMath > 0 ? hakMath : 1;

    // Iterator we'll use for our loop
    let i = 0;

    // Continuously try to purchase servers until we've reached the maximum amount of servers
    while (i < ns.getPurchasedServerLimit()) {

        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)) {

            // purchase with the specified amount of RAM, and name the server based on the iterater
            const hostname = ns.purchaseServer('haxor' + i, ram);

            // uploads hacking script to the purchased server
            ns.scp(myScript, hostname);

            // executes the hacking script on the purchased server with the max number of threads
            ns.exec(myScript, hostname, hakThreads);

            // increment the loop iterator
            ++i;
        }

        // sleep for 1 second
        await ns.sleep(1000);

    }

}