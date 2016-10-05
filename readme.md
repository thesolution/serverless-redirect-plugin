Serverless Plugin SNS
=====================

This plugin adds http 302 redirects to your Serverless+APIGateway service. 

*Note*: This plugin supports Serverless commit:242ad7bab4d44bf4c23c4476662e640452f2c5b9.  See Installation instructions.


### Installation

 - make sure that aws is installed
 - @see http://docs.aws.amazon.com/cli/latest/userguide/installing.html
 - install serverless from the commit this plugin was tested against
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

### Install Specific version of Serverless

```
git clone --depth 1 -n https://github.com/serverless/serverless.git
git checkout 242ad7bab4d44bf4c23c4476662e640452f2c5b9
cd serverless
npm install 
npm link
```

### Redirect the Response

 - this plugin finds urls in the errorMessage property of an error your Lambda returned
 - deploy your app as normal
 - to use create an error with the redirect target as the error message
 ```
    cb(new Error('https://www.google.com/));
 ```
 - that's all!
 
