const ngrok = require('ngrok')
const fs = require('fs')
async function netSetup(){
    let url = await ngrok.connect(3000);
    console.log("Public url: " + url)
    const urlJson = {
        url: url
    }
    fs.writeFile('../front-end/URL.json', JSON.stringify(urlJson), err => { 
        if(err) console.log(err)
        else console.log("URL written to front-end")
    })
}
netSetup();