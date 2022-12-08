<p align="center">
  <img width="800px" src="https://github.com/Capstone-Team4/nexus-cli/blob/main/images/logo.png" alt="Nexus" />
</p>

<p align="center">A instant GraphQL API framework</p>

## What is Nexus?

Nexus is an open-source framework that generates and deploys a GraphQL API from a user’s existing data sources. We make the setup for the user easy by providing a CLI tool and admin dashboard. Data sources can be added, removed, and changed without writing any new code or schemas. Additionally, users can test the generated GraphQL server locally with an integrated graphical interface. This interface exposes the entire API’s documentation and serves as a playground for making test queries and viewing responses. Lastly, when the server is ready to deploy, Nexus automates deployment to AWS.

## The Team

**:woman_technologist: Felicia Bacon** _Software Engineer_ College Station, Texas

**:man_technologist: Benjamin Perrault** _Software Engineer_ Tulsa, Oklahoma

**:woman_technologist: Kimberly Ramirez** _Software Engineer_ Colorado

**:man_technologist: Matthew Malane** _Software Engineer_ Huntington Beach, California

## :heavy_check_mark: Prerequisites

- Docker (Make sure Docker Daemon is running)
- AWS IAM Account
- AWS CLI installed and configured
- Node
- NPM

## :desktop_computer: Commands

| Commands          | Description                         |
| ----------------- | ----------------------------------- |
| `nexus init`      | Creates and configures your project |
| `nexus add`       | Adds additional data sources        |
| `nexus dev`       | Starts mesh server                  |
| `nexus dashboard` | Starts dashboard                    |
| `nexus deploy`    | Deploys server to AWS               |
| `nexus redeploy`  | Redeploys changes to AWS            |
| `nexus destroy`   | Destroys AWS infrastructure         |

## :desktop_computer: Setup & Installation

### 1. `npm install -g nexus_graphql_cli`

- Globally installs the Nexus CLI NPM package

### 2. `nexus --help`

- Displays a list and descriptions of all Nexus commands

### 3. `mkdir <project directory name> && cd <project directory name>`

- Create a new empty directory where you will run your project

### 4. `nexus init` or `nexus i`

- Initializes your new project that contains a `.meshrc.yaml` configuration file. Nexus adds your data sources to this file to configure your GraphQL server.

## :technologist: Development

Once you have created your project and added data sources, you can run your GraphQL server in your local environment. This is a quick way to test your queries and make sure things are working correctly before you deploy your server to your AWS infrastructure.

### `nexus add` or `nexus a`

- Asks for your data source name
- You can 3 options: Postgres Database, GraphQL API Endpoint and REST API Endpoint
- Asks for your connection details
- For Postgres, you will enter a connection string
- For GraphQL and REST, you will enter an endpoint

### `nexus dev` or `nexus d`

- Spins up your local development GraphQL Server
- Opens a browser page at `localhost` with the port you specified in the command line
- From here, you can make test queries to your data sources
- Any data sources that you add through `nexus add` will be reflected in the Explorer

### `nexus dashboard`

- Spins up your project dashboard
- You can add, edit and remove data sources
- You have a few options when it comes to deploying to your AWS infrastructure:
  - If you have not deployed your server yet, you can click the `deploy` button
  - If you have already deployed your project, you can make changes to your data sources and then redeploy your project
- On the `GraphiQL` tab, you can view your local development environment. This GraphiQL is similiar to the GraphiQL that appears in your browser at `localhost` when you run the command `nexus dev`
- When you make changes to your data sources, a new GraphiQL environment will generate after a few seconds. This will reflect all of your data source changes.

## :rocket: Deployment

We automate the process of deploying your server to AWS to make things easier for you and your team. With one command, we provision AWS infrastructure for you on your account. Your server will run on an AWS EC2 instance that is provisioned through AWS Fargate and ECS.

### `nexus deploy`

- Creates a Docker image that packages up your code
- Pushes the Docker image to a private repository on Amazon's Elastic Container Registry
- Provisions AWS services to run your server through Fargate and ECS.

### `nexus redeploy`

- Re-creates the Docker image that packages up your code
- Updates ECR with the new Docker image
- Updates the Fargate task to the new Docker image and produces a new IP address to query

## :arrow_lower_left: Teardown

You can decide to deprovision your AWS resources. This will not destroy your GraphQL server project locally, only the deployed server and resources on AWS.

### `nexus destroy`

- Destroys your AWS ECS Fargate infrastructure
