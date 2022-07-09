const http = require('http')
const request = require('requests')
const fs = require('fs')
const port = process.env.PORT || 8000;

let homefile = fs.readFileSync('index.html','utf-8');

function replaceparams(tempvalues,orgvalues){
    tempvalues = tempvalues.replace('{%status%}', orgvalues[0].weather[0].main )
    tempvalues = tempvalues.replace('{%location%}', orgvalues[0].name )
    tempvalues = tempvalues.replace('{%temp%}', (orgvalues[0].main.temp) )
    tempvalues = tempvalues.replace('{%mintemp%}', orgvalues[0].main.temp_min )
    tempvalues = tempvalues.replace('{%maxtemp%}', orgvalues[0].main.temp_max )
    return tempvalues;
}

const server = http.createServer((req,res)=>{
    if(req.url='/'){
        request('https://api.openweathermap.org/data/2.5/weather?q=katni&appid=d101babbf8c14c78b9f2bf9a30d27945')
        .on("data",(chunk)=>{
            let objdata = JSON.parse(chunk);
            let objarray = [objdata];
            let homefilee = replaceparams(homefile,objarray)
            // console.log(homefilee);
            res.write(homefilee);
        })
        .on("end",()=>{
            console.log("data has been transferred successfully");
        })
    }
    else{
        res.send("Error Occured");
    }
})
server.listen(port,()=>{
    console.log(`Your server is running on http://127.0.0.1:${port}`);
})