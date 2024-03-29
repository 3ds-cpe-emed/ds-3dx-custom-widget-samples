# ds-3dx-custom-widget-samples
Examples of 3DEXPERIENCE Custom Widgets. The samples provided in this repository are merely for learning purposes and should not be used as-is in any production deployment. 

## custom-widget-basic-authcall
Exercise WAFData authenticatedRequest in the main.js. Makes Web service calls using DS Passport authentication. It must be used for services of the 3DEXPERIENCE.

## custom-widget-basic-proxycall
Exercise WAFData proxifiedRequest in the main.js. The proxified request avoids CORS issues when calling a backend/some API that doesn't accept calls from a different domain (3dexperience.3ds.com).

## custom-widget-vuejs-template01
Basic - with minimal dependencies and simplified as possible - VueJS with webpack custom widget "Hello World" demo. Requires NodeJs installed for building. I have used NodeJS 20.12.0.

### Deployment considerations
#### Azure 
In some of the samples if you are deploying them as an Azure Static Web App you might need to include the staticwebapp.config.json file with the distribution. This might be needed if the sample is using a straight fetch (and not a WAFData proxified call). The file should contain the following:
```json
{
    "globalHeaders": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
    }
}
```