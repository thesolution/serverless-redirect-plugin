Serverless Redirect Plugin 
=====================

This plugin adds http 302 redirects to your Serverless+APIGateway service. 

*Note*: This plugin supports Serverless 1.0.0-rc.2 and above


### Installation

 - make sure that aws is installed
 - @see http://docs.aws.amazon.com/cli/latest/userguide/installing.html
 - install serverless 
 - install this plugin to your projects node_modules folder

```
cd projectfolder
npm install git+http://gitlab.trad.tradestation.com/colin/serverless-redirect-plugin.git
```

 - Add the plugin to your serverless.yml

```
plugins:
  - serverless-redirect-plugin
```

### Redirect the Response

 - this plugin finds urls in the errorMessage property of an error your Lambda returned
 - deploy your app as normal
 - to use create an error with the redirect target as the error message
 ```
    cb(new Error('https://www.google.com/));
 ```
 - that's all!
 
### Development

If you want to contribute to this project, please clone+merge request me.


Tips for working with a dev npm package
 - Uninstall the package if you already have it pulled
 - git clone the package repo
 - ```npm install``` (of course)
 - ```npm link```  This creates a global link on your machine so other projects can access your source
 - Move to your dependent project and ```npm link serverless-existing-api-plugin``` to create a link in your project's node_modules 
 