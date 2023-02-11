# DIARY API

[![CircleCI](https://circleci.com/gh/tonyguesswho/Ecommerce-api/tree/develop.svg?style=shield&circle-token=bf272982b7397a8f6498ea69b44c0a5a507528fd)](https://circleci.com/gh/nkasi-e/My-Diary/tree/coverage) [![Coverage Status](https://coveralls.io/repos/github/Nkasi-e/My-Diary/badge.png?branch=coverage)](https://coveralls.io/github/Nkasi-e/My-Diary?branch=coverage?service=github)
[![Dairy API](https://github.com/Nkasi-e/My-Diary/actions/workflows/build.yml/badge.svg)](https://github.com/Nkasi-e/My-Diary/actions/workflows/build.yml)

## _An Api that allows users to create, read and modify their diary logs_

## Features

- [x] Users can create diary entries.
- [x] Users can read all diary entries in the database.
- [x] Users can read a specific diary entry by ID from the database.
- [x] Users can update diary entries.
- [x] Users can delete diary entries.

<!-- - Note: The unchecked box means those particular feature are not ready yet but still under production or building.
- More features may still be added to the `Diary API` as an update, until it is fully ready. -->

## Root Endpoint

[To be provided when API is fully Ready]

## API Documentation

API documentation:

[To be provided when API is fully Ready]

> The purpose of this API is to allow users to create, read, and manage whatever is in their diary log. This helps users to keep their thought organized and make them apprehensible digitally.

Pivotal tracker was used for the management of this project.
[https://www.pivotaltracker.com/projects/2590691]

## Getting Started

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on your local machine.

- Node JS
- Postgresql
- Pg 4 Admin or any Postgresql GUI of your choice.

### Installation

- Clone this repository

```
git clone [https://github.com/nkasi-e/My-Diary.git]
```

- Navigate to the project directory
- Run `npm install` or `yarn` to install the project dependencies
- create a `.env` file and copy the contents of the `.env` file into it and supply the values for each variable

```
cp dev.env .env
```

- Create a Postgresql database and connect to the database for optimum result.
