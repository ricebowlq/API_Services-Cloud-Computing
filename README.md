# City Monitoring API Service
![Alt text](<Documentation/System Design.png>)

# GraphQL

<img alt="GraphQL Logo" align="right" src="https://graphql.org/img/logo.svg" width="15%" />

The GraphQL specification is edited in the markdown files found in
[`/spec`](./spec) the latest release of which is published at
https://graphql.github.io/graphql-spec/.

The latest draft specification can be found at
https://graphql.github.io/graphql-spec/draft/ which tracks the latest commit to
the main branch in this repository.

Previous releases of the GraphQL specification can be found at permalinks that
match their [release tag](https://github.com/graphql/graphql-spec/releases). For
example, https://graphql.github.io/graphql-spec/October2016/. If you are linking
directly to the GraphQL specification, it's best to link to a tagged permalink
for the particular referenced version.

## Overview

This is a Working Draft of the Specification for GraphQL, a query language for
APIs created by Facebook.

The target audience for this specification is not the client developer, but
those who have, or are actively interested in, building their own GraphQL
implementations and tools.

In order to be broadly adopted, GraphQL will have to target a wide variety of
backend environments, frameworks, and languages, which will necessitate a
collaborative effort across projects and organizations. This specification
serves as a point of coordination for this effort.

Looking for help? Find resources
[from the community](https://graphql.org/community/).

## Getting Started

Clone the git repo in local machine

```bash
git clone -b dev/mursalin https://github.com/ricebowlq/API_Services-Cloud-Computing.git
```

After repo has been successfully cloned run 
```bash
npm i && npm run start
```
This will download all the necessary packages and will start the server at [localhost:4000](http://localhost:4000/)

We have disabled the playground for production purposes by default but you can easily add these lines of code to activate the server playground which will enable the Apollo Sandbox

```typescript
//Comment this line
//ApolloServerPluginLandingPageDisabled(),
```

Going to [localhost:4000](http://localhost:4000/) will show this where you can create your queries and get output in json format

![Apollo Playground](<Documentation/ss1.PNG>)

## Example Request

```graphql
query Vehicles {
  vehicles {
    kind
    cc
    priority
  }
}
```

## Example Response
```json
{
  "data": {
    "vehicles": [
      {
        "kind": "Bike",
        "cc": 1292,
        "priority": "Medium"
      },
      {
        "kind": "Bike",
        "cc": 147,
        "priority": "VIP"
      },
      {
        "kind": "Bike",
        "cc": 146,
        "priority": "High"
      },
      {
        "kind": "Bike",
        "cc": 613,
        "priority": "High"
      },
      {
        "kind": "Bike",
        "cc": 1116,
        "priority": "Low"
      },
      {
        "kind": "Bus",
        "cc": 734,
        "priority": "High"
      },
      {
        "kind": "Bus",
        "cc": 970,
        "priority": "High"
      },
      {
        "kind": "Bus",
        "cc": 1099,
        "priority": "High"
      },
      {
        "kind": "Bike",
        "cc": 737,
        "priority": "Low"
      },
      {
        "kind": "Bus",
        "cc": 751,
        "priority": "VIP"
      },
      {
        "kind": "Car",
        "cc": 978,
        "priority": "Low"
      },
      {
        "kind": "Car",
        "cc": 357,
        "priority": "High"
      },
      {
        "kind": "Bike",
        "cc": 604,
        "priority": "Medium"
      },
      {
        "kind": "Car",
        "cc": 158,
        "priority": "Low"
      },
      {
        "kind": "Bus",
        "cc": 885,
        "priority": "VIP"
      },
      {
        "kind": "Car",
        "cc": 1338,
        "priority": "VIP"
      },
      {
        "kind": "Bike",
        "cc": 490,
        "priority": "Low"
      },
      {
        "kind": "Bike",
        "cc": 1203,
        "priority": "Low"
      },
      {
        "kind": "Bus",
        "cc": 307,
        "priority": "High"
      },
      {
        "kind": "Bus",
        "cc": 1438,
        "priority": "High"
      }
    ]
  }
}
```
