const urlInput = document.getElementById("urlInput");

const intervalInput = document.getElementById("intervalInput");
const intervalValue = document.getElementById("intervalValue");

const timeInput = document.getElementById("timeInput");
const timeValue = document.getElementById("timeValue");

const startButton = document.getElementById("startButton");

const countValue = document.getElementById("count");

intervalValue.textContent = intervalInput.value;
intervalInput.addEventListener("input",(event)=>{
  intervalValue.textContent = event.target.value;
});

timeValue.textContent = timeInput.value;
timeInput.addEventListener("input",(event)=>{
  timeValue.textContent = event.target.value;
});

startButton.addEventListener("click",(event)=>{
  if(urlInput.value.length == 0) return alert("URLが指定されていません");
  if(!urlInput.value.match(/^(http(s)?:\/\/)?[^\s]+\.[^\s]+$/)[0]) return alert("URLを入力してください");
  
  if(!confirm(`URL: ${urlInput.value}\nアクセス間隔: ${intervalInput.value}ms\n継続時間: ${timeInput.value}秒\n\nこの設定で実行しますか？`)) return;

  let count = 0;
  const interval = setInterval(async()=>{
    await fetch(urlInput.value)
      .then(()=>{
        count++;
        countValue.innerHTML = count;
        console.log(`${count}: Success Access`);
      })
      .catch((err)=>{
        console.log(`FetchError: ${err}`);
      });
  },intervalInput.value);

  setTimeout(()=>{
    clearInterval(interval);
  },timeInput.value * 1000);
});