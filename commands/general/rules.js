const Discord = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
    name: 'rules',
    description: 'post rules to this channel.',
    usages: ['rules'],

    async execute(message, args) {
        const rules = [
            {
                title:          'no discrimination',
                description:    'discrimination against marginalized groups is taken seriously. slurs and hate speech will not be tolerated.',
            },
            {
                title:          'content notice',
                description:    'please take care to post sensitive topics in the appropriate channels. your comment may be removed by moderators if it is deemed inappropriate. please tag sensitive content.\nex. `(cn: politcs)`',
            },
        ];

        await Promise.all(rules.map((rule, index) => message.channel.post(`**${index}. ${rule.title}**\n\n${rule.description}`)));
    },
};
