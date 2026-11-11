// ============================================================
// 《想寫什麼就寫》 · 文本內容庫
// ------------------------------------------------------------
// 這份檔案只負責存放內容與事件資料,不涉及遊戲邏輯運算。
// 你可以直接在這裡新增/修改/刪除任何描述文字、事件、身份介紹,
// 存檔後重新整理 逆仙之境_整合版.html 就能套用新內容。
//
// 使用說明:
// 1. 每個事件都是一個物件,照既有格式填內容就好。
// 2. type: "plain"  — 沒有選項,文字念完直接結算數值。
//    type: "choice" — 會列出供玩家選,每個選項各自結算文字。
// 3. weight 是抽中該版本的權重,數字越大越容易被抽到,不用是特定總和。
// 4. 想新增事件,直接複製一整段 { ... } 貼在同一個陣列裡就好。
// ============================================================

const CONTENT = {

  /* ============================================================
     序章首戰 ——【暫代文本,之後照 Google Sheet「序章首戰」分頁替換】
     ------------------------------------------------------------
     每一輪開局,孩童(幼年篇的主角)面對一尊金色的偽神(醉花仙),她要你歸順。
     套路固定,每回合一題:選對 answer 就化解,選錯照 onWrong 處理,
     套路照樣往下走。全部打過 = 金身裂開,露出第二階段(真身),它隨即出手,必死(劇情殺)。
     art / trueArt: 舞台上的圖(角色連背景畫在同一張,3:4 直式),art = 第一階段,trueArt = 打贏後露出的真身
     opening: 開打時它說的第一句話;reveal: 金身裂開時的幾句;killText: 真身出手的那一句
     onWrong: "hp"     = 扣 wrongDamage 點氣血
              "reveal" = 當下沒事,但它一直藏著,最後一回合找不到它
              "mana"   = 當下沒事,但最後一回合靈力會不夠
              "lose"   = 直接戰敗(最後一回合)
     文字裡用【】括起來的字會標成金色。
     出手描述(use)與 fleeText 前面會自動掛上「你」,句子開頭不用再寫「你」。
     預告(telegraph)前面會自動掛上 enemyName。
     shield: true = 護盾類招式,施展時氣血條出現銀色外框
     strike: true = 出手時有攻擊演出(打中與落空不同)
     fx: 攻擊演出的方式,"slash" = 斬擊(劍修)、"punch" = 拳擊(體修);沒寫就是斬擊。術法的專屬演出之後再補
     scene: 這回合預告出現時舞台的變化:"ghost" 分身晃動、"press" 往下一沉、"pulse" 一明一暗、
            "murmur" 聲波擴散、"dream" 泛黃起霧(別人的記憶)、"fade" 慢慢變灰、"focus" 四周收攏成一點
     glow / dim: 這一回合因為情況改變的選項,glow = 外框亮起、dim = 變模糊;
                 填 "attack"(攻擊)、"item"(道具)、"spell"(術法)、"flee"(逃跑)
     wrongStatus: { name, turns } = 這回合選錯時,額外染上的狀態(名稱要在 statusEffectCatalog 裡)
                                    染上的那回合不發作,從下一回合結束時開始算(序章不用,留給之後的戰鬥)
     ============================================================ */
  prologueBattle: {
    location: "三界交會地",
    enemyName: "醉花仙", // 被微芒浮夢聖君佔據、長大的雪梅花;女聖主只是假的外表,第二、三階段逐步顯露真身
    emblem: "plum", // 名號牌和說話標籤上的徽記(新版介面),每個 Boss 一個;plum = 梅花
    art: "assets/boss/prologue-1-gold.webp",
    trueArt: "assets/boss/prologue-2-blood.webp",
    // 主角是幼年篇的孩童,不是滿配;招式和道具都是雪梅花在幼年篇送他的東西
    playerRealm: "凡人",
    // 醉花仙不認得你:她把你當成半夜闖進林子的凡人小孩
    opening: "「雪梅花？」她歪著頭，像在聽一個陌生的詞，渾身鈴鐺一陣亂響，「深夜裡竟有凡人的孩子闖進來……迷路了？歸順於我，你就再也不會迷路。」",
    hp: 30,
    wrongDamage: 10,
    mpMax: 6,
    attack: { id: "attack", strike: true, fx: "slash", use: "揮起樹枝打過去。" },
    spells: [
      { id: "guard", name: "護身訣", cost: 1, shield: true, desc: "雪梅花教的口訣，擋下一次重擊。", use: "唸出【護身訣】，一層淡淡的花光罩住全身。" },
      { id: "calm", name: "定心訣", cost: 1, desc: "雪梅花教的口訣，守住心神，不讓外物侵入。", use: "唸出【定心訣】。" },
      { id: "callName", name: "喚名", cost: 5, strike: true, desc: "喊出她真正的名字。只對真身有效。", use: "用盡力氣喊出她的名字：「【雪梅花】！」" }
    ],
    items: [
      { id: "bell", name: "銅鈴", count: 1, desc: "雪梅花給的小鈴鐺，看不清楚東西的時候搖一搖。", use: "搖響【銅鈴】。" },
      { id: "plum", name: "梅子", count: 1, mp: 3, desc: "雪梅花給的青梅，吃了恢復 3 點靈力。", use: "吃下【梅子】。" },
      { id: "blossom", name: "梅花", count: 1, desc: "雪梅花別在你衣襟上的梅花，香氣能讓人從夢裡醒來。", use: "把衣襟上的【梅花】湊到鼻尖。" }
    ],
    turns: [
      {
        telegraph: "金光裡站著好幾個她，每一個都朝你伸出手：「過來。」",
        answer: "bell", onWrong: "reveal", scene: "ghost",
        success: "鈴聲一響，幻影一個個熄滅，只剩一個她。她的笑容僵了一瞬。",
        fail: "每一隻手都那麼溫柔，你分不清哪一個才是她。"
      },
      {
        telegraph: "她輕輕往下一按，整片天穹朝你壓了下來：「跪下，就不疼了。」",
        answer: "guard", onWrong: "hp", scene: "press",
        success: "天穹重重壓在花光上，碎成一地。",
        fail: "你被壓得跪倒在地，膝蓋磕出了血。"
      },
      {
        telegraph: "她收回手，靜靜看著你，周身的光一明一暗，像在呼吸：「不急，你會想通的。」",
        answer: "plum", onWrong: "mana", scene: "pulse",
        success: "梅子酸得你皺起臉，一股暖流湧進四肢。",
        fail: "她沒有動。光一明一暗，像什麼都沒發生。"
      },
      {
        telegraph: "她的聲音直接在你腦子裡響起：「你叫什麼名字？……算了，歸順於我，名字就不重要了。」",
        answer: "calm", onWrong: "hp", scene: "murmur",
        success: "你唸著定心訣，那個聲音退了回去。",
        fail: "那個聲音鑽進腦子深處，你差一點就點了頭，頭痛得像要裂開。"
      },
      {
        telegraph: "你又回到了山腳下，手裡握著半顆饅頭，雪梅花在老梅樹下朝你招手。她在你耳邊說：「留下來吧，這樣不好嗎？」",
        answer: "blossom", onWrong: "hp", scene: "dream",
        success: "梅花的香氣鑽進鼻子，山腳碎成光點，你醒了。",
        fail: "你在那個黃昏裡越陷越深，醒來時渾身是傷。"
      },
      {
        telegraph: "你唸過的口訣在她耳邊迴響，她身上的金光開始褪色：「這口訣……是誰教你的？」你學會的口訣一個接一個變得模糊，只有握著樹枝的手還是真的。",
        answer: "attack", onWrong: "hp", scene: "fade", glow: ["attack"], dim: ["spell"],
        success: "這一下打得很笨，卻是真的。她第一次退了一步，金色的袍角裂開一道縫。",
        fail: "她從褪色的光裡伸手抓了過來。"
      },
      {
        telegraph: "她不再笑了：「不識抬舉。」金光收攏成一點——那是她的真身，還是又一個幻影？",
        answer: "callName", onWrong: "lose", scene: "focus",
        success: "你的聲音撞上金光，金色的神像從眉心裂開——",
        fail: "金光吞沒了你的聲音。",
        failUnrevealed: "你喊向的是幻影。真正的她，在你身後輕輕嘆了口氣。"
      }
    ],
    reveal: [
      "裂縫裡流出來的不是光，是血。",
      "金身一片片剝落。那些金光從來不是神光，是無數魂魄被熬出來的顏色。"
    ],
    killText: "它沒有再開口。你還來不及抬手，就被它吞了下去。",
    fleeText: "轉身想逃，可是四面八方都是她的金光。",
    // 序章打完(黑暗籠罩之後)畫面的第一段
    afterBattleIntro: "亂世之初，萬魂重生。\n你是一縷不容於天地的遊魂，尚未尋得軀殼。",
    winText: "你只記得一件事：\n那尊金色的神，裡面是血。",
    winAchievement: "隱藏成就：一聲雪梅",
    tearText: "你和無數遊魂一起被撕碎，碎片在黑暗裡融成一團。\n你開始往下墜。"
  },

  /* ============================================================
     幼年篇的戰鬥(試玩版):餓狼。雪梅花是夥伴,每幾回合自己出手一次(自動援戰)
     ------------------------------------------------------------
     跟序章首戰同一套格式,另外多了:
     ally: 夥伴。every = 每幾回合出手一次(回合結束時);skills 由上往下挑第一個符合的:
           when "hurt" = 你受了傷、"tired" = 你的靈力剩一半以下、沒寫 = 一定可以;
           hp / mp = 替你補多少,status = 給你一個狀態(名稱要在 statusEffectCatalog 裡,持續 3 回合)
           finale = 打贏時夥伴的收尾(name 特寫上的招式名、text 那句話)
     cannotLose: 打不輸(氣血最少剩 1,最後一回合一定收尾)
     noFlee: 不能逃(按逃跑只會出現 fleeText);next: 打完接幼年篇的哪一段
     stageFx: 這場關掉哪些舞台特效
     ============================================================ */
  childBattle: {
    location: "梅林",
    enemyName: "餓狼",
    art: "assets/placeholder/wolf.svg", // 暫代圖,之後換成正式的圖
    stageFx: { rune: false },
    playerRealm: "凡人",
    opening: "餓狼壓低身子，一步一步逼近。",
    hp: 30,
    wrongDamage: 10,
    mpMax: 6,
    cannotLose: true,
    noFlee: true,
    soulEcho: false,
    next: "afterwolf",
    ally: {
      name: "雪梅花",
      portrait: "assets/placeholder/xuemeihua.svg", // 暫代頭像
      every: 2,
      skills: [
        { when: "hurt", name: "梅香回春", hp: 10, text: "雪梅花把一片梅花瓣按在你的傷口上，暖暖的，一點都不痛了。" },
        { when: "tired", name: "青梅", mp: 2, text: "雪梅花塞給你一顆青梅：「吃了就有力氣！」" },
        { name: "花蔭", status: "花蔭", text: "雪梅花在你腳邊種下一圈梅花，花瓣繞著你轉。" }
      ],
      finale: { name: "花藤", text: "雪梅花從你身後走出來，指尖一點，花藤把狼輕輕推回林子裡：「去吧，以後別再餓著了。」花藤上結出一串野果，滾到牠腳邊。餓狼叼起野果，一溜煙跑進林子裡。" }
    },
    attack: { id: "attack", strike: true, fx: "slash", use: "揮起樹枝打過去。" },
    spells: [
      { id: "guard", name: "護身訣", cost: 1, shield: true, desc: "雪梅花教的口訣，擋下一次重擊。", use: "唸出【護身訣】，一層淡淡的花光罩住全身。" },
      { id: "calm", name: "定心訣", cost: 1, desc: "雪梅花教的口訣，守住心神。", use: "唸出【定心訣】。" }
    ],
    items: [
      { id: "stone", name: "石頭", count: 2, desc: "地上撿的石頭。", use: "丟出一顆【石頭】。" }
    ],
    turns: [
      {
        telegraph: "餓狼伏低身子，喉嚨裡滾著低吼。你的腿抖個不停。",
        answer: "calm", onWrong: "hp",
        success: "你唸著定心訣，心跳慢慢穩了下來。",
        fail: "你嚇得腦子一片空白，狼爪擦過你的肩膀。"
      },
      {
        telegraph: "餓狼猛地撲了過來！",
        answer: "guard", onWrong: "hp",
        success: "一層淡淡的花光罩住你，狼爪撞在上面彈了開去。",
        fail: "狼爪劃過你的手臂。"
      },
      {
        telegraph: "餓狼繞著你們打轉，突然轉頭撲向雪梅花！",
        answer: "attack", onWrong: "hp",
        success: "你衝到她前面揮出樹枝，正好打在牠的鼻子上，牠嗚了一聲往後跳。",
        fail: "你慢了一步，狼爪劃過你的背。"
      },
      {
        telegraph: "餓狼喘著氣，盯著你手上的樹枝，又盯著你們身後的老梅樹，還不死心。",
        answer: "stone", onWrong: "hp",
        success: "你撿起石頭用力丟過去，石頭打在牠腳邊，濺起一片泥土，牠嚇得往後縮。",
        fail: "餓狼又往前逼近了一步。"
      }
    ],
    fleeText: "你想跑，雪梅花拉住你的袖子：「跑了牠會追。」"
  },

  /* ============================================================
     幼年篇(試玩版,只有第一次進遊戲會玩)
     ------------------------------------------------------------
     一段一個節點:title 標題、text 劇情(一句一句打出來)、choices 選項。
     選項的 to = 接哪個節點;"battle:childBattle" = 開打;"prologue" = 進序章戰鬥。
     input: "name" = 這一段要玩家取名字(存在本機,另外產生一組隱藏的 ID)
     文字裡的 {name} 會換成玩家取的名字
     ============================================================ */
  childhood: {
    start: "name",
    nodes: {
      name: {
        title: "",
        text: "一片黑暗。\n有人輕輕拍了拍你的臉，聲音很小，像怕吵醒什麼：\n「喂……你叫什麼名字？」",
        input: "name", next: "wake"
      },
      wake: {
        title: "山腳",
        text: "你睜開眼睛。天快黑了，四周全是不認得的樹。\n你只記得自己追著一隻白蝴蝶跑進了山裡。\n一個白頭髮的小女孩蹲在你旁邊，手裡捏著一片梅花瓣。\n「{name}，你終於醒了。」",
        choices: [{ label: "你是誰？", to: "who" }, { label: "（摸摸口袋，掏出半顆饅頭）", to: "bun" }]
      },
      who: {
        title: "山腳",
        text: "「我叫雪梅花。」她指了指身後那棵老梅樹，「我住在這裡。」\n話剛說完，她的肚子咕嚕叫了一聲。她趕緊把臉別過去。",
        choices: [{ label: "（把半顆饅頭分給她）", to: "bun2" }, { label: "你住在樹裡？", to: "treehouse" }]
      },
      treehouse: {
        title: "山腳",
        text: "「才不是住在樹『裡』呢。」她鼓起臉頰，「是住在樹『旁邊』。這棵樹比山腳的村子還老，我從有記憶起就在這裡了。」\n她的肚子又叫了一聲，這次叫得更大聲。",
        choices: [{ label: "（笑著把饅頭遞給她）", to: "bun2" }]
      },
      bun: {
        title: "山腳",
        text: "她盯著饅頭看了好久，吞了吞口水。\n「……可以分我一點嗎？我叫雪梅花，住在那棵老梅樹那裡。」",
        choices: [{ label: "（把饅頭整個給她）", to: "bun2" }, { label: "（掰一半給她，一起吃）", to: "bunhalf" }]
      },
      bunhalf: {
        title: "山腳",
        text: "你掰了一半給她，自己咬了一口剩下的。\n她學你的樣子，也小小咬了一口，嚼了好久好久，好像在吃什麼稀罕的東西。\n「原來饅頭是這個味道。」",
        choices: [{ label: "你沒吃過饅頭？", to: "bun2" }]
      },
      bun2: {
        title: "山腳",
        text: "雪梅花吃完，舔了舔手指，笑得眼睛彎彎的：「{name}，你人真好。」\n「你是從山腳的村子來的嗎？」",
        choices: [{ label: "嗯，我追一隻白蝴蝶，就迷路了。", to: "butterfly" }, { label: "你一個人住在這裡，不怕嗎？", to: "alone" }]
      },
      butterfly: {
        title: "山腳",
        text: "「白蝴蝶？」她眨眨眼，伸出手指。\n一隻白蝴蝶不知道從哪裡飛來，停在她的指尖上。\n「是這一隻嗎？牠是我的朋友。牠說山下有個小孩跑得好快，一直追牠。」\n你張大了嘴，說不出話來。",
        choices: [{ label: "你……聽得懂蝴蝶說話？", to: "alone" }]
      },
      alone: {
        title: "山腳",
        text: "雪梅花低下頭，用樹枝在地上畫圈圈。\n「山裡的風、蝴蝶、梅樹，都會跟我說話，所以我不怕。」\n「可是……牠們都不會陪我玩。」",
        choices: [{ label: "那我陪你玩！", to: "play" }, { label: "你的爹娘呢？", to: "parents" }]
      },
      parents: {
        title: "山腳",
        text: "「我沒有爹娘。」她說得很輕，好像那不是什麼要緊的事。\n「我只記得，好久好久以前，天上有很亮很亮的金光。然後我就在這棵樹下醒過來了。」\n她抬起頭，又笑了：「所以這棵梅樹就是我娘。」",
        choices: [{ label: "那……我陪你玩！", to: "play" }]
      },
      play: {
        title: "老梅樹",
        text: "「真的嗎？」雪梅花一下子跳起來，裙角沾滿了花瓣，「那我們來玩捉迷藏！我躲，你找！」\n她不等你回答，咻地一聲就跑不見了。\n你數到十，睜開眼睛。四周只剩風吹梅枝的聲音。",
        choices: [{ label: "（找老梅樹的樹洞）", to: "hide_a" }, { label: "（找那叢矮花叢）", to: "hide_b" }, { label: "（找溪邊的大石頭後面）", to: "found" }]
      },
      hide_a: {
        title: "老梅樹",
        text: "樹洞裡只有幾片乾掉的花瓣，還有一個用草編的小人偶，歪歪扭扭的，看得出來編了很多次。\n不在這裡。",
        choices: [{ label: "（找那叢矮花叢）", to: "hide_ab" }, { label: "（找溪邊的大石頭後面）", to: "found" }]
      },
      hide_b: {
        title: "老梅樹",
        text: "你撥開花叢，驚起一群小蟲子，嗡嗡地飛走了。\n不在這裡。",
        choices: [{ label: "（找老梅樹的樹洞）", to: "hide_ba" }, { label: "（找溪邊的大石頭後面）", to: "found" }]
      },
      hide_ab: {
        title: "老梅樹",
        text: "你撥開花叢，驚起一群小蟲子，嗡嗡地飛走了。\n還是不在這裡。溪邊傳來一聲忍不住的偷笑。",
        choices: [{ label: "（找溪邊的大石頭後面）", to: "found" }]
      },
      hide_ba: {
        title: "老梅樹",
        text: "樹洞裡只有幾片乾掉的花瓣，還有一個用草編的小人偶，歪歪扭扭的，看得出來編了很多次。\n還是不在這裡。溪邊傳來一聲忍不住的偷笑。",
        choices: [{ label: "（找溪邊的大石頭後面）", to: "found" }]
      },
      found: {
        title: "溪邊",
        text: "「找到你了！」\n雪梅花縮在大石頭後面，抱著膝蓋笑得喘不過氣：「你好慢喔！」\n溪水很清，映出你們兩個人的臉——不，只映出你一個人的。\n你揉揉眼睛再看，水面晃了一下，她的倒影又在那裡了。",
        choices: [{ label: "剛剛水裡……", to: "reflection" }, { label: "換你找我！", to: "dusk" }]
      },
      reflection: {
        title: "溪邊",
        text: "「水裡怎麼了？」她探過頭來，水面上清清楚楚映著兩張臉。\n「你看錯了啦。」她捧起一把溪水往你臉上潑，「笨蛋{name}！」\n你們在溪邊鬧了好久，鬧到太陽都沉到山後面去了。",
        choices: [{ label: "（跟著她回老梅樹）", to: "grove" }]
      },
      dusk: {
        title: "溪邊",
        text: "「不玩了不玩了，天快黑了。」她拉起你的手，「我帶你去看一樣更好玩的東西。」\n她的手好冰，像剛剛泡過溪水。",
        choices: [{ label: "（跟著她走）", to: "grove" }]
      },
      grove: {
        title: "梅林",
        text: "林子深處全是梅樹，可是每一棵都枯著，一朵花也沒有。\n雪梅花把手按在一根枯枝上，閉起眼睛。\n枯枝上冒出一個小小的花苞，然後「啪」地一聲，開了。",
        choices: [{ label: "好厲害！你是神仙嗎？", to: "gifts" }, { label: "（伸手去摸那朵花）", to: "gifts" }]
      },
      gifts: {
        title: "梅林",
        text: "「才不是神仙呢。」她摘下那朵梅花，別在你的衣襟上：「聞到它的香味，就算做了惡夢也會醒過來。」\n她又教你兩句口訣：一句叫【護身訣】，害怕的時候唸；一句叫【定心訣】，有聲音在腦子裡吵的時候唸。\n「還有這個。」她把一顆青梅和一個小銅鈴塞進你手裡，「梅子餓了吃。鈴鐺……看不清楚東西的時候，搖一搖。」",
        choices: [{ label: "我會好好收著。", to: "promise" }]
      },
      promise: {
        title: "梅林",
        text: "「明天……你還會來嗎？」雪梅花捏著衣角，沒有看你。",
        choices: [{ label: "會！我每天都來！", to: "promise2" }, { label: "你跟我下山吧，村子裡有好多小孩。", to: "cantleave" }]
      },
      cantleave: {
        title: "梅林",
        text: "她搖搖頭：「我不能離開這座山。我試過，走到山腳，腳就動不了了。」\n「所以，你要常常來找我，好不好？」",
        choices: [{ label: "好，我每天都來。", to: "promise2" }]
      },
      promise2: {
        title: "梅林",
        text: "雪梅花伸出小指：「打勾勾。騙人的是小狗。」\n你勾住她的小指。她的手好冰，冰得不像是活人的手。\n可是她笑得好開心，開心到你也忘了這件事。",
        choices: [{ label: "（打勾勾）", to: "wolf" }]
      },
      wolf: {
        title: "林間",
        text: "林子裡傳來一聲低吼。\n一隻瘦得見骨的餓狼從樹後走出來，眼睛直直盯著你們。\n雪梅花把你拉到身後，小小的手在發抖：「別怕，我在。」",
        choices: [{ label: "（撿起地上的樹枝）", to: "battle:childBattle" }]
      },
      afterwolf: {
        title: "林間",
        text: "狼跑遠了。\n雪梅花一屁股坐在地上，臉色白得跟她的頭髮一樣。她剛才用了太多力氣，指尖的花藤一根根枯掉。",
        choices: [{ label: "你沒事吧？", to: "cold" }, { label: "（把外衣披在她身上）", to: "cold" }]
      },
      cold: {
        title: "林間",
        text: "「我沒事。」她把頭靠在你肩膀上，聲音越來越小，「{name}，你剛才好勇敢喔。」\n「只是有點冷……我一用力氣，身體就會變冷。」",
        choices: [{ label: "（陪她坐著）", to: "night" }]
      },
      night: {
        title: "老梅樹下",
        text: "天黑透了。你們靠著老梅樹，看樹梢上一顆一顆冒出來的星星。\n「{name}，山下是什麼樣子？」",
        choices: [{ label: "過年的時候，村子裡會掛滿燈籠。", to: "lantern" }, { label: "我娘做的饅頭，比今天那個還好吃。", to: "mom" }]
      },
      lantern: {
        title: "老梅樹下",
        text: "「燈籠？」她的眼睛亮了起來，「是不是紅紅的、圓圓的、會發光的那種？」\n「等我能下山了，你帶我去看燈籠，好不好？」\n你點點頭。她笑著閉上了眼睛。",
        choices: [{ label: "（陪她看星星）", to: "sleep" }]
      },
      mom: {
        title: "老梅樹下",
        text: "「娘做的饅頭……」她小聲重複了一遍，「那一定很好吃。」\n「等我能下山了，你帶我去吃，好不好？」\n你點點頭。她笑著閉上了眼睛。",
        choices: [{ label: "（陪她看星星）", to: "sleep" }]
      },
      sleep: {
        title: "老梅樹下",
        text: "你們數著從枝頭落下來的花瓣，數到第七十二片的時候，你也睡著了。\n睡夢裡，你好像聽見雪梅花在說夢話：\n「……金色的光……又在叫我了……」",
        choices: [{ label: "（……）", to: "vanish" }]
      },
      vanish: {
        title: "半夜",
        text: "你被冷醒了。\n身邊空空的，雪梅花不見了。\n地上落著一路梅花瓣，一直延伸進叢林深處。花瓣在月光下微微發著光。",
        choices: [{ label: "雪梅花？", to: "vanish2" }, { label: "（循著花瓣走進叢林）", to: "jungle" }]
      },
      vanish2: {
        title: "半夜",
        text: "沒有人回答。\n只有風從叢林裡吹出來，帶著一點梅花的香味。",
        choices: [{ label: "（循著花瓣走進叢林）", to: "jungle" }]
      },
      jungle: {
        title: "叢林深處",
        text: "花瓣在一片空地上停住了。\n空地中央站著一個人。白頭髮，金色的冠，渾身掛滿了鈴鐺。\n她比雪梅花高得多，眼睛蒙著布，嘴角卻一直往上翹，像在笑。\n可是她身上，有和雪梅花一模一樣的梅花香。",
        choices: [{ label: "……雪梅花？", to: "prologue" }]
      }
    }
  },

  /* ============================================================
     世界觀開場(每輪固定播放)
     ============================================================ */
  worldOpening: [
    "洪荒之初，萬靈爭道。",
    "你是一縷不容於天地的孤魂，沒有名字，沒有歸屬，只有一股貪婪地渴望軀殼的本能。",
    "黑暗與寂靜的那一瞬，你將要誕生了，絲毫不猶豫地衝了進去。"
  ],

  /* ============================================================
     開局身份池 (90 個)
     - collision:完整的侵入/碰撞描述(目前僅體質類 10 個已寫)
     - innerDemon:心魔資料(theme / indulge / resist),目前僅體質類已寫
     - 沒有 collision 的身份,先沿用其他分類通用模板文字
     - 沒有 innerDemon 的身份,不會觸發心魔試煉事件
     ============================================================ */
  identities: [
    // ---- 體質類(已含完整心魔) ----
    { id:"farmer", name:"農夫", category:"體質",
      intro:"種了半輩子田，身子骨結實得很，只是沒法子讓一天饅頭夠吃飽。",
      collision:"你趁他熟睡之際，他正躺在田埂，饅頭掉在地上。他的意識中沒有任何人這樣蠻橫闖入——「我不甘心啊，還沒種完這片田！」這句話像鎚子，砸砸地捶著你。你在血流軀殼裡掙扎了不知多久，直到他的意志漸漸微弱，終於歸於沉寂。你贏了，但那句不甘，像根扎在土裡一樣扎進了你的血海深處，揮之不去也甩不掉。",
      innerDemon:{ theme:"不甘平庸", indulge:"安於現狀求穩", resist:"不顧一切拚搏冒進" } },
    { id:"docker", name:"碼頭工人", category:"體質",
      intro:"扛麻袋扛了半輩子，骨子裡就是苦，連飯錢都掙不出一絲累積。",
      collision:"你趁他熟睡之際，他正扛著貨袋走跳板走路。他的意識沒有絲毫犀利地砸砸地捶——「總有一天，不用扛人生了！」這句話像鎚子，搥搥地擊向你，狠要把你也一起扛完那份貨堆之上。你在掙扎了不知多久，直到那份意志漸漸被磨平。沉寂。你贏了，但那份「不甘被人指來揮去」的殘留念頭，如今死死糾纏在你的血海深處。",
      innerDemon:{ theme:"屈辱麻痺", indulge:"忍氣吞聲求存", resist:"寧為玉碎不硬碰" } },
    { id:"wrestler", name:"摔跤藝人", category:"體質",
      intro:"走江湖賣藝摔跤討生活，渾身筋骨，曾經苦力。",
      collision:"你沖上他的一瞬，他正被摔在地上，滿身塵埃。他沒有意識自尊輸——「憑什麼你能笑到最後？」這股意念幾乎將你擠出這具軀殼。你在塵埃裡翻滾廝殺，直到他終於歸於寂靜，那句執念仍如附骨之殘，滲入了你的靈魂。",
      innerDemon:{ theme:"渴求尊嚴", indulge:"討好眾人求認同", resist:"不容侵犯之意要爭一口氣" } },
    { id:"miner", name:"礦工", category:"體質",
      intro:"常年下井挖礦，身體硬得跟礦石一樣，誰進了黑暗都是誰知道。",
      collision:"侵入發生在黑暗最深的坑道裡。他的意識是你想像的頑強——那些永遠不能走出坑道的同伴的名字，如同亡魂纏繞著你，幾乎將你擠入黑暗深處而不能自撥。你死死掙扎，直到那份意志終於歸於崩潰。你贏了，但那份「對同伴的虧欠」，如今成了你揮之不去的夢魘。",
      innerDemon:{ theme:"虧欠亡逝", indulge:"用犧牲自己贖罪", resist:"不顧經驗也要救人" } },
    { id:"boatman", name:"船夫", category:"體質",
      intro:"常年風吹日曬撐船，性格硬朗，一身摸不透的水氣。",
      collision:"江面上，你如浪潮般侵入他的軀體。他沒有防備地站著——但那種對抗流水氣質的直覺，如同漩渦般把你死死沖住，幾乎把你逼退出去。你在暗流裡搏鬥，直到那行意志終於崩潰。你贏了，但對水的畏懼，如今成了你血脈深處的暗湧。",
      innerDemon:{ theme:"畏懼安穩", indulge:"隨波逐流不作為", resist:"死也不要放下肩上之責" } },
    { id:"blacksmith", name:"鐵匠", category:"體質",
      intro:"打了半輩子鐵器，骨架粗於常人，那身影都帶著鐵器味。",
      collision:"爐火正燒旺，你侵入了他。他沒有以為過——鐵器落下的執念如附骨幻影死死地扎，「我要打一把好的劍！」這股意念幾乎將你逼出這具軀殼。你死死忍住不放，直到那行意志漸漸崩潰、沉寂。你贏了，但那句「一把好劍」，如今成了你血脈深處的暗湧。",
      innerDemon:{ theme:"執火之心", indulge:"追求完美", resist:"甘於沉寂" } },
    { id:"hunter", name:"獵人", category:"體質",
      intro:"在崇山峻嶺討生活，膽識過人，沒東西能讓正常入他。",
      collision:"無聲之中，他的意識是你想像的頑強——孤身求生於磨礪之地的警覺，讓他在暗夜之中幾乎吞噬了你。你在黑暗中廝殺，直到他終於崩潰，一句「不許讓任何人靠近他」的執念，如附骨之疽，滲入了你的軀殼深處。",
      innerDemon:{ theme:"畏懼他人", indulge:"保持孤僻之貌", resist:"主動信任他人" } },
    { id:"monk", name:"苦行僧", category:"體質",
      intro:"常年粗茶淡飯，修練出堅韌的身子，清心寡欲卻埋藏著怨恨。",
      collision:"誡然斷惡，你已侵入他的血海。他窮於求索的解答沒有絲毫崩潰——那份不解的答案如附骨，幾乎將你也一同沉入死海裡頭。你在掙扎為許久，直到那行執念終於崩解。你贏了，但那至死未解的疑，如今成了你心底揮之不去的低語。",
      innerDemon:{ theme:"求而不得", indulge:"放下執念的淡然", resist:"窮盡一生也要求得答案" } },
    { id:"watchman", name:"守夜人", category:"體質",
      intro:"夜夜巡更風吹雨打，習慣了什麼都能守住，那鬼魅都提不起。",
      collision:"更鼓餘音未散，你已侵入他的軀體。他窮於歷練出的能力沒有絲毫消散——那些他習慣面對的漫漫長夜，如附骨鎚敲地把你想要撞出，幾乎把你也一同沉在黑暗裡頭。你在廝殺許久，直到那行能力終於崩潰。你贏了，但黑夜對他而言的意義，如今成了你揮之不去的殘留。",
      innerDemon:{ theme:"畏於黑暗", indulge:"逃避未知躲藏起來", resist:"直面黑暗絕不退縮" } },
    { id:"porter", name:"挑夫", category:"體質",
      intro:"天天扛貨負山，一趟一趟走出來的膽識，耐力誰都穩。",
      collision:"山道上，你如骨子般侵入他的軀體。他那趟趟走出本能的意志沒有絲毫立即降臨於你——一趟又一趟的意念如附山路本身，幾乎把你死在窒息的階梯之中。你在掙扎為許久，直到那行意志終於崩解。沉寂。你贏了，但那份「總有一天要走出這座山」的渴望，如今成了你身上揮之不去的軀殼。",
      innerDemon:{ theme:"困於低地", indulge:"安於現在腳下的路", resist:"不顧一切走向未知" } },

    // ---- 根骨類(TODO:collision / innerDemon 待補) ----
    { id:"veteran", name:"沙場老兵", category:"根骨", intro:"沙場退下來的餘生，一身傷疤也練出了鋼鐵的骨頭。" },
    { id:"escort", name:"鏢師", category:"根骨", intro:"走鏢護鏢練就一身硬功夫，揹著的包包是餐飯來源。" },
    { id:"stonemason", name:"石匠", category:"根骨", intro:"天天挑石頭砸鑿，筋皮跟骨頭都被磨硬了起來。" },
    { id:"sparring", name:"武館陪練", category:"根骨", intro:"天天教師傅們練武陪練，越挨越實在，越練越不痛。" },
    { id:"patrol", name:"捕快", category:"根骨", intro:"執掌捕鎮的巡邏鍛鍊出身，常年操練，骨頭是好人硬不了。" },
    { id:"bandit", name:"山賊", category:"根骨", intro:"盤桓在山上混，身上一不小心搞了活得好好磨，硬闖得很。" },
    { id:"carrier", name:"搬運工", category:"根骨", intro:"常年扛重物翻山越嶺，舉一舉骨頭都練出了韌性。" },
    { id:"convict", name:"重刑犯", category:"根骨", intro:"蹲過牢，牢裡什麼都得學挨打，那委屈都能扛下去。" },
    { id:"tamer", name:"馴獸師", category:"根骨", intro:"常被自己養的獸相誤傷，也因此練出了抗撞體質。" },
    { id:"enforcer", name:"賭場打手", category:"根骨", intro:"專攔搶人收帳討錢，天天被打天天還揍，皮膚敲就練實了。" },

    // ---- 體魄類 ----
    { id:"huntersson", name:"獵人之子", category:"體魄", intro:"打小在山裡討生活，力氣是唯一資本，修仙路能否走全靠這。" },
    { id:"strongman", name:"大力士", category:"體魄", intro:"表演扛大石維生，力大如牛，一身腱子肉是吃飯的本錢。" },
    { id:"woodcutter", name:"樵夫", category:"體魄", intro:"日日砍柴賣柴，力氣過人，砍柴砍出一身蠻力。" },
    { id:"boxer", name:"拳師", category:"體魄", intro:"走鏢賣藝練出身，出拳有千鈞，靠拳頭換飯。" },
    { id:"quarryhead", name:"工頭", category:"體魄", intro:"帶人挖山鑿石，粗壯身材，一句話不合就動拳。" },
    { id:"generalheir", name:"武將後代", category:"體魄", intro:"家裡中落但生子遺氣猶存，一身蠻力是祖上唯一遺產。" },
    { id:"thug", name:"地痞", category:"體魄", intro:"少爺人跑腿收帳，以拳頭服人，講的也全靠拳頭。" },
    { id:"cattledealer", name:"牛販", category:"體魄", intro:"常年拉扯牛隻，力氣異於常人，舉牛是牛人間的練。" },
    { id:"outlaw", name:"亡命之徒", category:"體魄", intro:"逃亡路上什麼粗活都幹過，出手誰都果決。" },
    { id:"oldsoldier", name:"沙場老卒", category:"體魄", intro:"一路殺敵過來，出手毫不含糊，眼神裡帶著殺伐氣。" },

    // ---- 悟性類 ----
    { id:"healer", name:"大夫", category:"悟性", intro:"稍知醫術，遊走坊間湊活口飯，對「氣」這種東西別有敏感。" },
    { id:"scholar", name:"書生", category:"悟性", intro:"屢試不第窮酸書生，一肚子墨水沒地方用，倒是對古籍別有一套。" },
    { id:"fortuneteller", name:"算命師", category:"悟性", intro:"街坊間行走賺個小賞，測字準確確實是辣。" },
    { id:"chessplayer", name:"棋手", category:"悟性", intro:"一輩子都在琢磨棋局，腦子轉得很快，看人跟看棋一樣犀利。" },
    { id:"teacher", name:"教書先生", category:"悟性", intro:"教書多年，悟性過人，只是學生沒幾個能跟得他在講什麼。" },
    { id:"scribe", name:"抄書匠", category:"悟性", intro:"抄了半輩子古籍書籍，字跡潦草，腦子裡裝了不少雜學。" },
    { id:"herbalist", name:"藥農", category:"悟性", intro:"常年辨識草藥，觀察過人，一花一木都逃不過他的眼。" },
    { id:"sorcerer", name:"江湖術士", category:"悟性", intro:"學過一點玄學招數，唬唬人做點小生意，對玄妙之事總有興趣。" },
    { id:"storyteller", name:"說書人", category:"悟性", intro:"滿口街坊軼聞故事引人信，見多識廣，腦子裡裝滿好多人的故事。" },
    { id:"expelled", name:"被逐弟子", category:"悟性", intro:"曾被某宗門逐出學，根骨其實不差，只是脾氣不小。" },

    // ---- 氣運類 ----
    { id:"runaway", name:"逃婚少爺", category:"氣運", intro:"被爹逼相親嚇人，連夜翻牆逃跑路，誤打誤撞踏進深山——命是真的很硬。" },
    { id:"gambler", name:"賭徒", category:"氣運", intro:"每賭必輸總在關鍵時刻翻盤，自己都覺得荒唐又奇怪。" },
    { id:"luckyorphan", name:"幸運孤兒", category:"氣運", intro:"打小就被說命裡帶福，沒人知道為什麼，反正每次總能逢凶化吉。" },
    { id:"scavenger", name:"拾荒者", category:"氣運", intro:"常在別人扔掉的地方撿到寶物，鄰居都說他氣運怪異。" },
    { id:"survivor", name:"船難倖存者", category:"氣運", intro:"出過幾次海難，每次都是唯一的生還者，命大得不像話。" },
    { id:"newescort", name:"新手鏢師", category:"氣運", intro:"頭一次出任務就遇上劫匪，卻總能全身而退，師傅們都說他命子硬。" },
    { id:"templekeeper", name:"廟公之子", category:"氣運", intro:"從小接觸香火大小，說一堆是不是真的靈驗，反正日子過得順。" },
    { id:"winner", name:"中獎者", category:"氣運", intro:"買彩帖中過一次大獎，從此自認是天選之人。" },
    { id:"smuggler", name:"走私販", category:"氣運", intro:"幹著違法的買賣總沒被抓到，自己都覺得該去去賭局贏錢。" },
    { id:"lostwanderer", name:"迷路旅人", category:"氣運", intro:"常在莽野中迷路，卻總能誤打誤撞找到貴人，福星高照。" },

    // ---- 靈根類 ----
    { id:"clanbranch", name:"世家子弟", category:"靈根", intro:"家族祖上修行淵源，雖是旁支，根骨比一般人好上一些。" },
    { id:"abandoned", name:"棄嬰", category:"靈根", intro:"出生時異象頻繁，被鄉人視為不祥棄掉，身世成謎。" },
    { id:"templeboy", name:"道觀雜役", category:"靈根", intro:"從小在道觀長，耳濡目染，不知不覺沾染了些靈氣。" },
    { id:"shaman", name:"巫師後代", category:"靈根", intro:"家傳巫術血脈，體質特殊，常人看他總覺得哪裡怪怪的。" },
    { id:"twin", name:"雙胞胎", category:"靈根", intro:"據說雙生子中總有一人資質特殊，他一直好奇是不是自己。" },
    { id:"herbpicker", name:"採藥人", category:"靈根", intro:"常年在靈氣濃郁處活動，體質漸漸起了變化，自己卻渾然不覺。" },
    { id:"furnacechild", name:"丹爐遺童", category:"靈根", intro:"自小在廢棄丹爐旁長大，吸了不少殘留靈氣長大。" },
    { id:"cultivatororphan", name:"修士遺孤", category:"靈根", intro:"血脈裡帶著一絲先天靈根，只是連自己都不知道。" },
    { id:"lightningsurvivor", name:"雷擊倖存者", category:"靈根", intro:"遭天雷劈中卻奇蹟生還，從此體質異於常人。" },
    { id:"omenchild", name:"異象童子", category:"靈根", intro:"出生時就異象滿天，鄰里穩婆都說這孩子命氣特殊。" },

    // ---- 身法類 ----
    { id:"wantedthief", name:"通緝犯", category:"身法", intro:"因為某次不乾淨被通緝，練就一身逃跑的本事，想不到靈身法還挺派得上用場。" },
    { id:"acrobat", name:"雜耍藝人", category:"身法", intro:"走江湖靠雜耍維生，身手矯健，翻滾跳躍是家常便飯。" },
    { id:"swiftpicker", name:"採茶人", category:"身法", intro:"小箍窄峭壁採茶維生，飛簷走壁是吃飯本事。" },
    { id:"messenger", name:"信差", category:"身法", intro:"常年快馬加鞭送信，反應敏快，晚一步就要挨罵。" },
    { id:"dancer", name:"舞者", category:"身法", intro:"身段靈活，步法輕盈，一舉一動都帶著韻律。" },
    { id:"deserter", name:"逃兵", category:"身法", intro:"從戰場上跑得比誰都快撤活下來，實用就是他的護身符。" },
    { id:"tightrope", name:"走繩藝人", category:"身法", intro:"平衡感和反應敏異於常人，一根繩子上討生活。" },
    { id:"boatpuller", name:"縴夫之子", category:"身法", intro:"從小在江邊討生活，腳程矯健，水裡陸上都靈活。" },
    { id:"pickpocket", name:"扒手", category:"身法", intro:"街上偷快換東西，身手極快，一眨眼就能沒入人群。" },
    { id:"mountainguide", name:"嚮導", category:"身法", intro:"常年在崎嶇山路奔走，腳程飛快，山裡沒有他不熟的路。" },

    // ---- 全能類 ----
    { id:"shopkeeper", name:"雜貨店老闆", category:"全能", intro:"什麼都賣一點，什麼都懂一點，顧客問什麼都能接兩句話。" },
    { id:"errand", name:"跑腿", category:"全能", intro:"什麼雜事都接，練就八般武藝皆略懂，樣樣沾一點。" },
    { id:"innkeeper", name:"店小二", category:"全能", intro:"見多識廣，眼觀四面耳聽八方，天天在江湖人中混學問。" },
    { id:"troupeleader", name:"戲班老闆", category:"全能", intro:"帶著八般武藝樣樣要懂一點，才能撐起一台戲，靠著不精。" },
    { id:"failedscholar", name:"落第武舉人", category:"全能", intro:"文武都學過，卻樣樣不精，考場上總是差那麼一口氣。" },
    { id:"travelinghealer", name:"遊醫", category:"全能", intro:"醫術、武術、雜學樣樣沾一點，靠的就是一身雜學。" },
    { id:"jackofall", name:"雜工", category:"全能", intro:"幹過各份工作，雜學不少，倒什麼都能撐個大概。" },
    { id:"accountant", name:"帳房先生", category:"全能", intro:"算帳跟武藝都要會，拳武帶頭疼，倒也練出一身本事。" },
    { id:"clerk", name:"師爺", category:"全能", intro:"文書、人情世故、法律都懂，是縣太爺面前不缺的雜事眼。" },
    { id:"knowitall", name:"百事通", category:"全能", intro:"什麼都知道一點，什麼都不精通，消息卻是誰都靈通。" },

    // ---- 無徵兆類 ----
    { id:"templeorphan", name:"廟孤兒", category:"無徵兆", intro:"自小被丟在破廟門口，連自己姓什麼都不知道。", specialBonus:"更易被事件觸發的機率" },
    { id:"refugee", name:"難民", category:"無徵兆", intro:"一路逃難活下來，身無長物，做什麼都要靠韌性。", specialBonus:"起始靈石較多" },
    { id:"exmonk", name:"還俗和尚", category:"無徵兆", intro:"半路出家又還俗，俗塵未消卻精，還俗之心倒乾淨。", specialBonus:"起始培元丹 +1" },
    { id:"fallenson", name:"落魄公子", category:"無徵兆", intro:"家裡中落，除了一張嘴什麼都不會，倒是很會說話。", specialBonus:"起始靈石較多" },
    { id:"youngster", name:"少年", category:"無徵兆", intro:"年紀尚幾歲，人生剛開始，什麼都還沒定型。", specialBonus:"各屬性成長皆較平均" },
    { id:"blindwanderer", name:"盲人", category:"無徵兆", intro:"自幼雙目失明，旁人常因他的缺陷而小看他，反而讓他磨練出許多不必要的敏銳。", specialBonus:"探索遭遇隨機鬼魅機會的降低" },
    { id:"sickly", name:"病人", category:"無徵兆", intro:"自小體弱多病，大夫都說他活不長，倒也活到了現在。", specialBonus:"起始培元丹 +2" },
    { id:"eternalstudent", name:"老書生", category:"無徵兆", intro:"讀了半輩子書卻什麼都沒讀出個名堂，倒也不算白讀。", specialBonus:"悟性類別更易觸發的機率" },
    { id:"desperategambler", name:"破產賭徒", category:"無徵兆", intro:"輸光了家產，只剩一條命，索性賭一把換命修仙。", specialBonus:"起始靈石極少，但更易觸發的機率" },
    { id:"nobody", name:"無名氏", category:"無徵兆", intro:"那個什麼稱呼都沒有，平凡到不行——但誰知道呢。", specialBonus:"無特殊調整，純粹白紙" }
  ],

  /* ============================================================
     打坐修行事件池
     ------------------------------------------------------------
     這是每次新增的重點:打坐不再是固定結果,而是跟探索一樣抽事件。
     大部份本輪應該放在 "plain"(平淡開場)中,"choice" 事件建議權重控制在
     整體權重的 5~10% 左右,不然特殊事件太常見會失去驚喜感。
     ============================================================ */
  meditateEvents: [
    {
      id: "meditate_plain_calm",
      weight: 25,
      type: "plain",
      text: "你盤膝打坐，呼吸緩慢，體內靈氣緩緩流轉。",
      cultivationRange: [5, 15]
    },
    {
      id: "meditate_plain_wind",
      weight: 20,
      type: "plain",
      text: "山風吹拂，你的呼吸跟天地同頻，修為在不知不覺間精進了些許。",
      cultivationRange: [5, 15]
    },
    {
      id: "meditate_plain_dream",
      weight: 15,
      type: "plain",
      text: "打坐時做了個奇怪的夢，夢裡的內容醒來後便已忘得一乾二淨，你精神卻異常清爽。",
      cultivationRange: [8, 18]
    },

    // ---- 特殊事件示範:戒指裡的老者 ----
    {
      id: "meditate_ring_elder",
      weight: 3,
      type: "choice",
      text: "打坐至深處，你忽然聽見一道蒼老的聲音從戒指裡飄來：「小友，老夫在此已困了三百年，你可願聽老夫說幾句話？」",
      choices: [
        {
          label: "願意聽老者說",
          resultText: "（待填寫）老者緩緩道出的內容……",
          effects: { cultivation: 10 }
        },
        {
          label: "繼續打坐，不予理會",
          resultText: "（待填寫）你選擇不理會這道聲音，打坐繼續……",
          effects: { }
        }
      ]
    },

    // ---- 特殊事件示範:走火入魔前兆(接後續機制系統) ----
    {
      id: "meditate_qi_deviation",
      weight: 4,
      type: "choice",
      text: "體內靈氣忽然逆流亂竄，你感覺到一絲不祥的躁動——若強行壓下未必扎根，若放任不管恐走火入魔。",
      choices: [
        {
          label: "強行壓下逆流",
          resultText: "（待填寫）你嘗試壓下體內躁動的靈氣……",
          effects: { qi: -15 }
        },
        {
          label: "放任靈氣流轉，聽天由命",
          resultText: "（待填寫）你放任靈氣自行，結果……",
          effects: { statusEffect: "神智不清" }
        }
      ]
    }

    // ← 在這裡繼續新增你自己的打坐事件,照上面的格式做就好
  ],

  /* ============================================================
     探索歷練事件池 (重新整理版 v1,格式統一跟打坐一樣)
     ============================================================ */
  exploreEvents: {
    loot: [
      "你在山縫間發現半塊蒙塵的殘破碎片。",
      "草叢裡藏著前人遺落的行囊，裡頭裝了些奇怪的東西。",
      "溪水沖刷出一小塊靈石，在陽光下閃著微光。"
    ],
    combatIntro: [
      "你遭遇了一頭低階妖獸，戰鬥在山谷之中！",
      "草叢中竄出一隻猙獰的山魈，對你齜牙咧嘴。",
      "一頭渾身赤紅的怪物擋住了去路，似乎盯上了你身上的氣息。"
    ],
    encounterIntro: [
      "你在路邊遇到一位受傷的獵人求助。",
      "破廟裡蜷縮著一個瘦弱的孩子，似乎迷路了。",
      "一位老者攔在路中，看起來已經好幾天沒進食。"
    ],
    nothing: [
      "你在山路裡走了一陣，一無所獲，倒也算是歷練心境。",
      "這一趟只是尋常的趕路，沒什麼特別的際遇。",
      "山路寂靜，除了風聲什麼都沒有。"
    ]

    // ← 之後可以在這裡新增更多變化文本,或是新的事件分類
  },

  /* ============================================================
     狀態效果總表
     ------------------------------------------------------------
     name  = 顯示名稱
     mark  = 戰鬥畫面上的單字徽章(點開才看到全名與說明)
     color = 標籤顏色(給 UI 用)
     desc  = 效果說明(滑鼠移過去或點擊時可以看到,目前先統一固定顯示)
     戰鬥中已接上的效果:
     hpPerTurn = 每回合結束時扣多少氣血
     blurDesc  = true 時,術法/道具清單的說明看不清楚
     ============================================================ */
  statusEffectCatalog: {
    "中毒": { mark: "毒", color: "#4a7c3f", hpPerTurn: 20, desc: "每回合持續損失少量氣血，直到中毒狀態解除。" },
    "神智不清": { mark: "惑", color: "#7a4fb5", blurDesc: true, desc: "思緒混亂，部分選項可能無法正常判斷。" },
    "走火入魔": { mark: "魔", color: "#b5424f", desc: "靈氣運轉紊亂，施法容易反噬自身。" },
    "浴火重生": { mark: "凰", color: "#d4af37", desc: "護體有著額外加成效果，瀕死時觸發一次重生。" },
    "花蔭": { mark: "蔭", color: "#e79ab3", desc: "雪梅花種下的梅花，會替你擋下一次傷害。" }
    // ← 之後可以在這裡新增更多狀態效果
  },

  /* ============================================================
     demoScenes ——【暫代文本,隨便生成,之後要換掉】
     ------------------------------------------------------------
     心魔試煉結束後,場景流的最小示範版本會從這裡抽場景。
     跟真正的身份/角色故事線無關,純粹讓 beta 版有東西可以玩,
     之後要換成正式的場景資料(固定路線+條件變體那套設計)。
     weight = 抽中權重,cultivationGain = 這個選項給的修為值(暫定小數字)
     ============================================================ */
  demoScenes: [
    {
      id: "demo_village",
      weight: 10,
      text: "你走進一座依山而建的小村子，炊煙裊裊，幾個孩童在土路上追逐。",
      choices: [
        { label: "跟村民打聽消息", result: "村民七嘴八舌說了些道聽塗說的傳聞，聽不出個所以然，倒也長了些見識。", cultivationGain: 2 },
        { label: "找個地方歇腳", result: "你在村口老樹下坐了一會兒，吹著風，心緒漸漸平靜。", cultivationGain: 1 },
        { label: "什麼都不做，繼續趕路", result: "你沒有多停留，逕自往前走去。", cultivationGain: 0 }
      ]
    },
    {
      id: "demo_forest",
      weight: 10,
      text: "山路轉入一片密林，林間光影斑駁，隱約傳來不知名的鳥獸叫聲。",
      choices: [
        { label: "循聲探查", result: "你循著聲音摸索過去，只驚起一群飛鳥，虛驚一場。", cultivationGain: 2 },
        { label: "加快腳步穿林而過", result: "你不敢久留，加快腳步走出了樹林。", cultivationGain: 1 },
        { label: "什麼都不做，原地觀望", result: "你站在原地看了一會兒，林子恢復了寂靜。", cultivationGain: 0 }
      ]
    },
    {
      id: "demo_stranger",
      weight: 8,
      text: "路邊坐著一個衣衫襤褸的陌生人，低頭不知在擺弄什麼東西。",
      choices: [
        { label: "上前搭話", result: "陌生人抬頭看了你一眼，沒說什麼，只是笑了笑。", cultivationGain: 2 },
        { label: "留下些許乾糧就走", result: "你放下手邊的乾糧，沒等對方反應就轉身離開。", cultivationGain: 1 },
        { label: "什麼都不做，繞道而行", result: "你選擇繞開，沒有多做停留。", cultivationGain: 0 }
      ]
    },
    {
      id: "demo_ruins",
      weight: 6,
      text: "你路過一處荒廢的舊廟，斷壁殘垣間爬滿了藤蔓。",
      choices: [
        { label: "進去看看", result: "廟裡空空如也，只有滿地塵土，倒是意外地讓人靜下心來。", cultivationGain: 3 },
        { label: "在外頭拜一拜", result: "你對著殘破的神像拱了拱手，便繼續上路。", cultivationGain: 1 },
        { label: "什麼都不做，匆匆走過", result: "你沒有多看一眼，加快腳步離開了這裡。", cultivationGain: 0 }
      ]
    },
    {
      id: "demo_river",
      weight: 8,
      text: "一條小溪擋住了去路，溪水清澈，能看見水底的鵝卵石。",
      choices: [
        { label: "涉水而過", result: "溪水沁涼，你踩著石頭一步步走了過去。", cultivationGain: 2 },
        { label: "沿岸尋找橋梁", result: "你繞了一段路，總算找到一座簡陋的木橋。", cultivationGain: 1 },
        { label: "什麼都不做，坐在溪邊發呆", result: "你在溪邊坐了好一會兒，什麼也沒想。", cultivationGain: 0 }
      ]
    }
  ]

};
