// 友達データをここに記入（画像名を実際の名前に変える）
// images フォルダの 25 枚を登録（info は自由に書き換えてください）
const friends = [
    { name: "あいみ",      img: "images/aimi.JPG",       info: "飲み過ぎ" },
    { name: "あお",        img: "images/ao.JPG",         info: "あお〜ん" },
    { name: "いまむらそう",        img: "images/imamura.jpg",    info: "配慮しろ" },
    { name: "いっぺい",    img: "images/ippei.jpg",      info: "休部" },
    { name: "いせり",        img: "images/iseri.JPG",      info: "迷走" },
    { name: "かい",          img: "images/kai.jpg",        info: "俺を倒しに来い" },
    { name: "海斗",        img: "images/kaito.jpg",      info: "２留注意" },
    { name: "かもはら",        img: "images/kamohara.JPG",   info: "ブレキングダウン出ろ" },
    { name: "恵太",        img: "images/keita.jpg",      info: "猪怖かった" },
    { name: "けいたろう",      img: "images/keitarou.jpg",  info: "コーチ様" },
    { name: "こうせい",        img: "images/kousei.jpg",     info: "パワハラ注意" },
    { name: "くるす",        img: "images/kurusu.JPG",     info: "飲ませてごめん" },
    { name: "まお",        img: "images/mao.JPG",        info: "アルハラ注意" },
    { name: "まつだ",        img: "images/matuda.JPG",     info: "アメリカのお土産くれ" },
    { name: "みらい",        img: "images/mirai.jpg",      info: "虫と草は食べるな" },
    { name: "もたに",        img: "images/motani.jpg",     info: "東京拠点千葉支部" },
    { name: "ながた",        img: "images/nagata.jpg",     info: "髪切れ" },
    { name: "なかはら",        img: "images/nakahara.JPG",   info: "煽るな" },
    { name: "にいむら",        img: "images/niimura.jpg",    info: "俺" },
    { name: "ののか",      img: "images/nonoka.JPG",     info: "たまによくすごく失礼" },
    { name: "たかみや",        img: "images/takamiya.jpg",   info: "漁協の恨み" },
    { name: "ためなが",        img: "images/tamenaga.jpeg",  info: "遭難注意" },
    { name: "やすこ",        img: "images/yasuko.jpg",     info: "かわいい" },
    { name: "ゆき",        img: "images/yuki.jpg",       info: "ナルシスト注意" },
    { name: "ゆうと",      img: "images/yuto.jpg",       info: "ヒゲの成長早すぎ" }
  ];
  
    
  // 起動時に図鑑をlocalStorageから読み込み
  let collection = JSON.parse(localStorage.getItem('myCollection')) || [];
  
  // ガチャボタンをクリックした時の動作
  document.getElementById('gachaButton').onclick = function(){
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
  
    document.getElementById('resultArea').innerHTML = `
      <img src="${randomFriend.img}">
      <h3>${randomFriend.name}</h3>
      <p>${randomFriend.info}</p>
    `;
  
    if (!collection.some(f => f.name === randomFriend.name)){
      collection.push(randomFriend);
      saveCollection();
      updateCollection();
    }
  };
  
  // 図鑑を画面に表示する
  function updateCollection(){
    const collectionArea = document.getElementById('collection');
    collectionArea.innerHTML = '';
    
    collection.forEach(friend => {
      collectionArea.innerHTML += `
        <div class="collection-item">
          <img src="${friend.img}">
          <p>${friend.name}</p>
        </div>`;
    });
  }
  
  // 図鑑をlocalStorageに保存する
  function saveCollection(){
    localStorage.setItem('myCollection', JSON.stringify(collection));
  }
  
  // ページが開かれたら図鑑を表示する
  window.onload = updateCollection;
  