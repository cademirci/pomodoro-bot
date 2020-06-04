const Discord = require('discord.js');
const bot = new Discord.Client();

// const developerKey = YOUR_KEY;

const prefix = '-pom';
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

bot.on('ready', () => {
    console.log(`bot is online as ${bot.user.tag}`);
})

bot.on('message', async message => {
    var args = message.content.substring(prefix.length).split(' ');
    var command1 = args[1];

    if (message.content.substring(0, prefix.length) == prefix) {
        if (command1 == 'start') {
            var intervalCount = 0, interval = 0;
            message.reply('One brain is started.');
            setPart(interval);

            // countdown clock for displaying
            var remainingTime = 25, remainingCount = 1, status = 'working';
            var countdown = await message.channel.send(`started! ${remainingTime} minutes`);
            let clock = setInterval(() => {
                remainingTime--;
                if (remainingTime == 1)
                    remainingCount++;
                countdown.edit(`${remainingTime} minutes remain. :: ${status} ::`);
                if (remainingCount == 10) {
                    clearInterval(clock);
                }
                if (remainingTime == 0 && remainingCount % 2 == 0) {
                    status = 'timeout';
                    remainingTime += 5;
                }

                // looks like dirty code but this works instead of
                // else { status = 'working' if ... } instead.
                else if (remainingTime == 0 && remainingCount == 9) {
                    remainingTime += 20;
                    status = 'working';
                }
                else if (remainingTime == 0) {
                    remainingTime += 25;
                    status = 'working';
                }
            }, 1 * minute);

            // pomodoro timer
            function setPart(interval) {
                intervalCount++;
                interval = 25;
                if (intervalCount % 2 == 0) interval = 5;
                if (intervalCount == 9)     interval = 20;

                let timer = setTimeout(() => {
                    message.channel.send(`count ${intervalCount}, ${interval} minutes ended.`);
                    setPart();
                }, interval * minute);
                if (intervalCount >= 10) {
                    message.reply('The brain is ended.');
                    clearTimeout(timer);
                    return;
                }
            }
        }
        // I could not find a healthy way yet.
        // I can try bot.commands.get('start').execute(message, args)
        // for dynamic commands, later.
        if (command1 == 'stop') {
            // message.channel.send('pomodoro stopped.');
        }
        if (command1 == 'help') {
            message.channel.send("-pom start: starts a pomodoro brain { (25min+5min)*4 + 20min }");
        }
    }

})

bot.login(`${developerKey}`);
