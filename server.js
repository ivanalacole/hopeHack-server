const jsonServer = require('json-server');
const axios = require('axios');
//Axios is a Javascript library used to make HTTP requests from node. js
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);

// asynchronous function performs GET to 3rd party API
(async function(){
    await axios({
        method: 'GET',
        url: "https://npiregistry.cms.hhs.gov/api/?number=&enumeration_type=&taxonomy_description=Obstetrics+%26+Gynecology&first_name=&use_first_name_alias=&last_name=&organization_name=&address_purpose=&city=charlotte&state=nc&postal_code=&country_code=&limit=10&skip=&pretty=on&version=2.1"
    })
    .then(res => {
        const information = res.data.results;
        console.log(information);
        return information;
    })
    .then((information)=> {
        console.log(information);

        axios({
            method: 'POST',
            url: "https://hack-server-app.herokuapp.com/users", //replace this link with Ivana's heroku link
            data: JSON.stringify(information),
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
    .catch(function(error){
        console.log(error);
    })
}());