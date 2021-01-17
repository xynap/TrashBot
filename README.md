# TrashBot
A simple Discord bot that listens for chat commands.

## Developing locally
Get your bot token from the Discord [developer portal](https://discord.com/developers/applications) and set it as an environment variable:
```bash
export DISCORD_TOKEN='<token>'
```

Start the bot:
```bash
npm start
```

## Deploying to production
Make sure AWS CDK is setup by following the [getting started](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_prerequisites) and [bootstrapping](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html#bootstrapping-howto) guides. You'll also need to install [Docker](https://www.docker.com/products/docker-desktop).

Deploy the bot to your account:
```bash
npm run deploy
```

Get your bot token from the Discord [developer portal](https://discord.com/developers/applications) and copy it into `DiscordSecret...` in the AWS [Secrets Manager console](https://console.aws.amazon.com/secretsmanager). 
