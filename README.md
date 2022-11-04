<!-- # ![Nexus-Logo](https://github.com/Capstone-Team4/nexus-dashboard/blob/main/frontend/src/logo.png)
 -->
<p align="center">
  <img width="400px" src="https://github.com/Capstone-Team4/nexus-cli/blob/readme/images/logo.png" alt="Nexus" />
</p>

<p align="center">A GraphQL Backend-as-a-Service</p>

## What is Nexus?

Nexus is a GraphQL Backend-as-a-Service. This is a great way for you and your team to test if Nexus is right for your project! With Nexus, you can easily generate a GraphQL server that connects to all of your data sources and test queries quickly on your own AWS infrastructure. Nexus takes your data sources, whether it be a Postgres Database, GraphQL API Endpoint, REST API or all three. The GraphQL we create for you creates a unified schema, giving your frontend team a single endpoint to make queries to. You can test your queries in your local development environment and when you're ready, simple run `nexus deploy`, and we take care of deploying your graphql backend to your AWS infrastructure.

## The Team

**Felicia Bacon** Software Engineer - College Station, Texas

**Benjamin Perrault** Software Engineer - Tulsa, Oklahoma

**Kimberly Ramirez** Software Engineer - Colorado

**Matthew Malane** Software Engineer - California

## Prerequisistes

- Docker (Make sure Docker Daemon is running)
- AWS IAM Account
- AWS CLI installed and configured
- Node
- NPM

## Commands

| Commands          | Description                 |
| ----------------- | --------------------------- |
| `nexus init`      | Configures nexus server     |
| `nexus dev`       | Starts mesh server          |
| `nexus dashboard` | Starts dashboard            |
| `nexus deploy`    | Deploys server to AWS       |
| `nexus redeploy`  | Redeploys changes to AWS    |
| `nexus destroy`   | Destroys AWS infrastructure |

## Setup

### Installation

How to install and use:

- Install the Nexus CLI npm package with `npm install nexus-cli`
- Install dependencies with `npm install`
- Install `nexus` commands with `npm install -g .`
- Create a new empty directory where you will run your server from
- Run `nexus --help` to get a list and descriptions of nexus commands

Note: Make sure you do not commit generated files (.meshrc.yaml, .mesh folder, the generated package.json and package-lock.json)
