/* =========================================================
   ★ 友達リスト（25枚）— rarity を追加済み
   ========================================================= */
const friends = [
  { name: "あいみ",      img: "images/aimi.JPG",       info: "飲み過ぎ",            rarity: "R"  },
  { name: "あお",        img: "images/ao.JPG",         info: "あお〜ん",           rarity: "N"  },
  { name: "いまむらそう", img: "images/imamura.jpg",    info: "配慮しろ",           rarity: "N"  },
  { name: "いっぺい",    img: "images/ippei.jpg",      info: "休部",               rarity: "N"  },
  { name: "いせり",      img: "images/iseri.JPG",      info: "迷走",               rarity: "R"  },
  { name: "かい",        img: "images/kai.jpg",        info: "俺を倒しに来い",       rarity: "N"  },
  { name: "かいと",      img: "images/kaito.jpg",      info: "２留注意",           rarity: "R"  },
  { name: "かもはら",    img: "images/kamohara.JPG",   info: "ブレキングダウン出ろ", rarity: "N"  },
  { name: "けいた",      img: "images/keita.jpg",      info: "猪怖かった",         rarity: "N"  },
  { name: "けいたろう",  img: "images/keitarou.jpg",   info: "コーチ様",           rarity: "R"  },
  { name: "こうせい",    img: "images/kousei.jpg",     info: "パワハラ注意",       rarity: "N"  },
  { name: "くるす",      img: "images/kurusu.JPG",     info: "飲ませてごめん",     rarity: "N"  },
  { name: "まお",        img: "images/mao.JPG",        info: "アルハラ注意",       rarity: "N"  },
  { name: "まつだ",      img: "images/matuda.JPG",     info: "アメリカのお土産くれ", rarity: "N"  },
  { name: "みらい",      img: "images/mirai.jpg",      info: "虫と草は食べるな",    rarity: "N"  },
  { name: "もたに",      img: "images/motani.jpg",     info: "東京拠点千葉支部",   rarity: "SR" },
  { name: "ながた",      img: "images/nagata.jpg",     info: "髪切れ",             rarity: "N"  },
  { name: "なかはら",    img: "images/nakahara.JPG",   info: "煽るな",             rarity: "SR" },
  { name: "にいむら",    img: "images/niimura.jpg",    info: "俺",                 rarity: "SR" },
  { name: "ののか",      img: "images/nonoka.JPG",     info: "たまによくすごく失礼", rarity: "R"  },
  { name: "たかみや",    img: "images/takamiya.jpg",   info: "漁協の恨み",         rarity: "R"  },
  { name: "ためなが",    img: "images/tamenaga.jpeg",  info: "遭難注意",           rarity: "N"  },
  { name: "やすこ",      img: "images/yasuko.jpg",     info: "かわいい",           rarity: "R"  },
  { name: "ゆき",        img: "images/yuki.jpg",       info: "ナルシスト注意",     rarity: "N"  },
  { name: "ゆうと",      img: "images/yuto.jpg",       info: "ヒゲの成長早すぎ",   rarity: "N"  }
];

/* =========================================================
   ★ レア度ごとの排出率
   ========================================================= */
const rarityRate = { SR: 3, R: 17, N: 80 };

/* 抽選関数：レア度を先に決め、そのプールから 1 枚 */
function drawFriend() {
  const rand = Math.random() * 100;
  let sum = 0, chosen = "N";
  for (const [rarity, wt] of Object.entries(rarityRate)) {
    sum += wt;
    if (rand < sum) { chosen = rarity; break; }
  }
  const pool = friends.filter(f => f.rarity === chosen);
  return pool[Math.floor(Math.random() * pool.length)];
}

/* =========================================================
   ★ localStorage から図鑑を読み込み
   ========================================================= */
let collection = JSON.parse(localStorage.getItem('myCollection')) || [];

/* =========================================================
   ★ ガチャボタン
   ========================================================= */
document.getElementById('gachaButton').onclick = () => {
  const friend = drawFriend();
  document.getElementById('resultArea').innerHTML = `
    <img src="${friend.img}">
    <h3>${friend.name}
      <span class="rarity ${friend.rarity}">${friend.rarity}</span>
    </h3>
    <p>${friend.info}</p>`;
  if (!collection.some(f => f.name === friend.name)) {
    collection.push(friend);
    saveCollection();
    updateCollection();
  }
};

/* =========================================================
   ★ 図鑑を画面に表示
   ========================================================= */
function updateCollection() {
  const area = document.getElementById('collection');
  if (!area) return;
  area.innerHTML = '';
  collection.forEach(f => {
    area.innerHTML += `
      <div class="collection-item">
        <img src="${f.img}">
        <p>${f.name}
          <span class="rarity ${f.rarity}">${f.rarity}</span>
        </p>
      </div>`;
  });
}

/* =========================================================
   ★ 図鑑をリセットするボタン
   ========================================================= */
const resetBtn = document.getElementById('resetButton');   // HTML に <button id="resetButton">図鑑リセット</button> を追加
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (!confirm('本当に図鑑をリセットしますか？')) return;
    localStorage.removeItem('myCollection');  // 保存データ削除
    collection = [];                          // 変数も空に
    updateCollection();                       // 画面更新
  });
}

/* =========================================================
   ★ 図鑑を localStorage に保存
   ========================================================= */
function saveCollection() {
  localStorage.setItem('myCollection', JSON.stringify(collection));
}

/* =========================================================
   ★ ページ読み込み時
   ========================================================= */
window.onload = updateCollection;
