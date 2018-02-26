#!/bin/bash
# Warning: this script has only been tested on macOS Sierra. There's a good chance
# it won't work on other operating systems. If you get it working on another OS,
# please send a pull request with any changes required. Thanks!
set -e

cd `dirname $0`
r=`pwd`
echo $r

if [ -z "$(which heroku)" ]; then
  echo "You must install the Heroku CLI first!"
  echo "https://devcenter.heroku.com/articles/heroku-cli"
  exit 1
fi

if ! echo "$(heroku plugins)" | grep -q heroku-cli-deploy; then
  heroku plugins:install heroku-cli-deploy
fi

server_app=donate-at-iterate-api
serverUri="https://$server_app.herokuapp.com"

client_app=donate-at-iterate
clientUri="https://$client_app.herokuapp.com"

# Deploy the server
cd $r/server
mvn clean package

heroku deploy:jar target/*jar --app $server_app -o "--server.port=\$PORT"
heroku config:set --app $server_app FORCE_HTTPS="true"

# Deploy the client
cd $r/client
rm -rf dist
# replace the server URL in the client
# sed -i -e "s|http://localhost:8080|$serverUri|g" $r/client/src/app/shared/donation/donation.service.ts
yarn && yarn build
cd dist

cat << EOF > static.json
{
  "https_only": true,
  "root": ".",
  "routes": {
    "/**": "index.html"
  }
}
EOF

heroku static:deploy --app $client_app

# show apps and URLs
heroku open --app $client_app