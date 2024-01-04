const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const moduleFederationConfig = withModuleFederationPlugin({

  remotes: {
    "loginapp": "/loginapp/remoteEntry.js", 
   // "loginapp": "http:localhost:4300/remoteEntry.js",       
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings:["@commons-lib"]
});
 moduleFederationConfig.output.publicPath = '/inventarioappti/'
//moduleFederationConfig.output.publicPath = '/'
module.exports =moduleFederationConfig