# Weather API

**The project assignment for roadmap.sh**

URL of the assignment in roadmap.sh:  
https://roadmap.sh/projects/weather-api-wrapper-service

This API retrieves weather information about a specific city from a 3rd party API and sends it back to the user.  
It also uses [Redis](https://redis.io/) to cache the information.  
The 3rd party API used in the project: https://goweather.xyz

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ilia-abbasi/Weather-API.git
   cd Weather-API
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Run the server with:

   ```sh
   npm run start
   ```

2. Send requests using [Postman](https://www.postman.com/) or a browser. Example URL to send a GET request to:  
   127.0.0.1:PORT/weather/CITY  
   Replace `PORT` with the port you set inside the `.env` file or the default `5000` port defined in the source code.  
   Replace `CITY` with whatever city you want to get information about, like `moscow`.

## Dependencies

- axios
- dotenv
- express
- express-rate-limit
- redis

The source code is formatted with [Prettier](https://prettier.io/).

---

Read the docs [here](https://github.com/ilia-abbasi/Weather-API/blob/main/Documentation.md).  
Weather-API is licensed under the [GPL-3.0 license](https://github.com/ilia-abbasi/Weather-API/blob/main/LICENSE).
