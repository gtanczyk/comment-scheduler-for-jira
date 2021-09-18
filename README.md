# Comment Scheduler for Jira

**WARNING** This app is under development! The codebase is a bit of a mess, and a proof of concept quality.

## Installation

The app can be installed with this link: https://developer.atlassian.com/console/install/a7441f25-daa3-43d3-9478-d7ccc15863b7?signature=53f20355a319518a77f218a7a66dd0f03d49437f098922e9fd69c794a2388079&product=jira

## Inspiration

Gmail or Slack let you schedule a message, for example you write it at the evening at schedule for delivery at 9:00 AM of next day.

This is very practical, and I was missing such functionality in Jira.

## Features

- Schedule a comment for delivery at exact date and time
- Show list of scheduled comments
- Delete scheduled comments
- Send scheduled comments immediately

## Development (Frontend)

It is possible to develop the frontend outside of Jira. The backend is mocked(`mock-invoke.js` file)

```
npm install
cd frontend && npm run start
open http://localhost:3000/?mock
```

## TODOs :)

- Improve design
- Mentions, attachments
- Improve security (migrate to Issue properties?)
- Improve project setup, more streamlined development and deployment

## Future ideas

- Scheduled issue updates - example: resolve issue tomorrow 
- Scheduled macro actions in Jira: example - start sprint tomorrow
- Conditional semi-automations: example - send a comment if issue is not resolved
- Make it look nicely blended into Jira UI (Forge limitations) 

## Limitations (Atlassian Forge)

- Not possible post a comment as a user
- Built-in comment box is not pluggable
- some other Forge limitations
- Atlassian Forge does not work in JSM projects :(