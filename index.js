const fetch = require("node-fetch");
const config = require("./config");

let count = 0;
const interval = setInterval(async()=>{
  await fetch(config.url)
    .then(()=>{
      count++;
      console.log(`${count}:アクセスしました`);
    })
    .catch((err)=>{
      console.log(err);
    });
},config.interval);

setTimeout(()=>{
  clearInterval(interval);
},config.time);