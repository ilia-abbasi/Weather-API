# Documentation

Here is a straight-forward documentation for using Weather-API

## Response format

Every response from this API is a JSON object with three properties:

- success (boolean)
- message (string)
- data (object)

### Success

This is a boolean indicating wether the request was OK or not. If the API successfully understands the request and responds with the information you want, the value of `success` will be `true`, anything else will make this property to be `false`.  
Based on the different status codes that Weather-API may use in the response of your request, `true` is for when the status code is `200` and `false` is for when it's anything else.

### Message

`message` is a short string explaining a summary of the response object. Its value is based on the status codes:

- `200`: `"Request was successful"`
- `404`: `"Not found"` OR `"City was not found"`
- `405`: `"You can not METHOD /weather/actual_city"`
- `422`: `"No city was provided while it is a necessary parameter"`
- `429`: `"You have reached your request limit"`
- `500`: `"An error occurred while fetching data from the third-party API:\nERROR_DESCRIPTION"`

### Data

This is an object containing the actual weather data about the specified city. `data` will be an empty object if the status code is anything except `200`.

Here is an example of a response object:

1. Request:
   `GET /weather/rome`
2. Response:
   ```json
   {
     "success": true,
     "message": "Request was successful",
     "data": {
       "temperature": "+31 °C",
       "wind": "15 km/h",
       "description": "Partly cloudy",
       "forecast": [
         {
           "day": "1",
           "temperature": "32 °C",
           "wind": "13 km/h"
         },
         {
           "day": "2",
           "temperature": "33 °C",
           "wind": "29 km/h"
         },
         {
           "day": "3",
           "temperature": "+27 °C",
           "wind": "13 km/h"
         }
       ]
     }
   }
   ```

## Endpoints

- `GET` -> `/weather/:city`: Get weather data about a city

There is currently only one endpoint and it's `/weather/:city` where `:city` is the parameter indicating the city you want to get info about. This parameter is mandatory and if not provided, a `422` error will be sent back.  
The only method which can be used for this endpoint is `GET` and anything else will result in a `405` error.

## Status codes

Every possible status code recieved from the API is listed in the [Response format](https://github.com/ilia-abbasi/Weather-API/blob/main/Documentation.md#message) section.

## Headers

There is only one custom http header used in this API and it's `Retrieval-Method`.  
If Weather-API retrieves the data by requesting the 3rd party API, the value of this header will be `request`.  
If Weather-API retrieves the data by using its cache, the value will be `cache`.

This header will only exist if the status code is `200`.

## Rate limit

The `express-rate-limit` package is used to limit only 60 requests in 10 minutes. If this limit is exceeded, a `429` error will be sent back.
