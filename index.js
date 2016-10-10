'use strict';

class RedirectPlugin {
  constructor(sls, options) {
    this.serverless = sls;
    this.options = options;
    this.commands = {
      deploy: {
        lifecycleEvents: [ ]
      },
    };

    this.hooks = {
        'after:deploy:compileEvents': () => {
            const resources = this.serverless.service.provider.compiledCloudFormationTemplate.Resources;
            Object.keys(resources).forEach(resourceName => {
              let resource = resources[resourceName];
              if ( resource.Type == "AWS::ApiGateway::Method") {
                this.addLocationHeaderToResponse(resource.Properties)
                this.addIntegrationResponse(resource.Properties);
              }
            })
        }
    };
  }
  
  addIntegrationResponse(properties) {
      let responses = properties.Integration.IntegrationResponses;
      let redirectResponse = { StatusCode:302 };
      let found = false;
      responses.forEach(r => {
        if (r.StatusCode == 302) {
          redirectResponse = r;
          found = true;
        }
      });
      if (!found) {
        properties.Integration.IntegrationResponses.push(redirectResponse);
      }
      redirectResponse.SelectionPattern = '.*http[s]{0,1}://.*';
      redirectResponse.ResponseParameters = redirectResponse.ResponseParameters || {};
      redirectResponse.ResponseParameters['method.response.header.Location'] = 'integration.response.body.errorMessage';

  }

  addLocationHeaderToResponse(properties) {
      var found = false;
      properties.MethodResponses.forEach( response => {
        if (response.StatusCode == 302) {
          found = true;
          response.ResponseParameters = response.ResponseParameters || {}
          response.ResponseParameters['method.response.header.Location'] = false;
        }
      })
      if (!found) {
        properties.MethodResponses.push({
          StatusCode:302,
          ResponseParameters: {
            'method.response.header.Location':false
          }
        })
      }
  }
}

module.exports = RedirectPlugin;
