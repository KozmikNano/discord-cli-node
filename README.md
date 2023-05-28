# discord-cli-node
This is a discord client written is node.js for the CLI. It allows you to send and read messages from a discord server.

### Current limitations
- No access to DMs
- No access to servers you can't add a bot too
- Can't change settings or view users in the server
- Must be behind a discord bot

## Usage
*You can follow ##Instalation to download and install this project or use the npx package (Coming soon.)*

This project was created to help with development where it can be annoying to change windows just to try talking to a command. This can be used to send/read messages.

**Commands in CLI**
- !q, !e, !quit, !exit    To exit the chat

**Features**
- Read the last 50 messages sent in server
- Send messages
- View the time a message was sent, the user who sent it, and the message that was sent

## Instalation
1. Make sure node v20+ and git is intsalled on your computer
2. Download and open the folder
```bash
git clone https://github.com/kozmiknano/discord-cli-node
cd discord-cli-node
```
3. Install the deps
```bash
npm install
```
4. Now you can [get a discord bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token) and do one of two things
    - Just start the program (`node .`) and paste your token in
    - Or, create a `.env` file and create a variable like so:
    ```env
    DISCORDTOKEN=yourdiscordtokenhere
    ```
    Then run the program (`node .`)
