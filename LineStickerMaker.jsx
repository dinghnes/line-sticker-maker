import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Copy, Check, LayoutGrid, Palette, Terminal, Briefcase, Heart, MessageCircle, Sun, Gift, Laugh, Shuffle, Type, ChevronDown, Smile, Hand, Star, Sticker, Upload, Download, RefreshCw, Scissors, Settings, Layers, Droplet, Package, FileText, Hash, Sparkles, Wand2, ZoomIn, X, ShieldAlert, CheckCircle2, Crown, FileUp, AlertCircle, Flame, Coffee, CheckCheck, Edit3, Smartphone, Send, Trash2, Plus, Search, Moon
} from 'lucide-react';

const ACTION_MAP = {

      "早安": "元氣揮手打招呼，朝氣蓬勃燦爛笑臉，身邊有微小晨光",

      "晚安": "抱著小枕頭打哈欠，頭戴可愛睡帽，半瞇雙眼",

      "午安": "端著美味午餐便當，神情愉悅滿足",

      "謝謝": "雙手合十微微鞠躬，臉頰微紅微笑，周圍有點綴小花",

      "不客氣": "笑瞇瞇單手輕擺，神態大方謙遜",

      "對不起": "跪坐雙手抱頭，眼角泛淚，頭頂有歉意汗滴",

      "沒問題": "拍拍胸脯打包票，自信豎起大拇指眨眼 Wink",

      "好的": "認真點頭，比出 OK 手勢，神情信賴可靠",

      "收到": "帥氣立正挺胸敬禮，眼神堅定專注",

      "辛苦了": "雙手奉上一杯熱騰騰茶水，眼神充滿溫柔體貼",

      "OK": "雙手比出大大的 OK 姿勢，活潑躍動",

      "等等": "單手向前平推做出暫停手勢，神情略帶著急流汗",

      "哈囉": "從畫面邊緣探出頭來俏皮揮手打招呼",

      "再見": "轉身向後用力揮手道別，笑容依依不捨",

      "路上小心": "雙手在胸前揮動叮嚀，眼神充滿溫暖關懷",

      "吃飽沒": "捧著圓滾滾肚皮拍拍，露出吃飽傻笑",

      "加油": "雙手握拳置於胸前打氣，眼中燃燒熱情鬥志",

      "笑死": "誇張抱肚倒地大笑，眼角飆出淚珠，拍地狂笑",

      "哭啊": "雙手抱頭跪地，瀑布般流下誇張眼淚，悲憤大喊",

      "氣死": "雙頰漲紅鼓起像包子，頭頂冒出憤怒蒸氣",

      "傻眼": "嘴角抽搐，額頭冒出三條黑線，呆滯無語",

      "我就爛": "攤平在地上變成軟爛液體，神態無所謂又放鬆",

      "是在哈囉": "歪頭挑眉，雙手掌心朝上攤開，滿臉黑人問號",

      "真的假的": "眼睛瞪得滾圓，雙手驚訝摀住嘴巴",

      "壓力山大": "背上揹著一塊巨大岩石，雙腿顫抖吃力咬牙",

      "眼神死": "雙眼反白失去高光，整個人放空趴在桌上變成灰白色",

      "發瘋": "雙手抓狂亂抓頭髮，雙眼呈現蚊香眼螺旋旋轉",

      "想你": "雙手托腮望著天空發呆，身邊漂浮愛心泡泡",

      "愛你": "雙手在頭頂比出巨大愛心，雙眼閃爍愛心高光",

      "抱抱": "張開雙臂向前撲來求擁抱，嘟嘴撒嬌求安慰",

      "親親": "嘟起粉嫩嘴唇湊上前，閉眼送出飛吻",

      "理我": "用手指輕輕戳戳前方，咬嘴唇楚楚可憐",

      "好想你": "緊緊抱住大愛心玩偶蹭臉頰，滿滿思念",

      "啾咪": "單手比手指愛心，俏皮吐舌眨眼",

      "開會中": "戴上黑框眼鏡抱著筆電，神情嚴肅專注敲鍵盤",

      "趕工中": "頭綁必勝布條，雙手在鍵盤敲出殘影，四周燃燒工作火焰",

      "加班中": "桌上堆滿公文與提神飲料，黑眼圈濃重仍狂敲滑鼠",

      "下班！": "背起包包撞破大門興奮狂奔，身後留下殘影與音符",

      "馬上好": "滿頭大汗飛速操作，回頭大喊包在我身上",

      "求放過": "舉起雙手小白旗投降，淚汪汪乞求饒命",

      "我太難了": "默默蹲在角落拿樹枝畫圈圈，頭頂有朵下雨烏雲",

      "准奏": "穿著小龍袍威嚴揮手批准，氣場霸氣十足",

      "這我": "單手推眼鏡，嘴角勾起看破一切的自信神秘微笑",

      "破防了": "雙手摀胸口心碎特效，神情瞬間瓦解崩潰",

      "要確欸": "瞇起雙眼緊盯前方，滿臉懷疑審視神態",

      "急了": "雙腳原地踏步小碎步，手忙腳亂滿頭大汗",

      "很躁": "雙手狂甩，頭頂冒出火花與憤怒塗鴉符號",

      "純愛戰士": "胸口燃燒純真烈火，雙手握拳望向遠方堅定不移",

      "躺平": "整個人裹在棉被裡只露出一雙無慾無求的眼睛",

      "這把高端局": "雙手交叉胸前，身後浮現棋局與高深莫測氣場",

      "最好是": "單手抱胸翻大白眼，嘴角不屑上揚",

      "甘阿捏": "微微側頭瞇眼，嘴角似笑非笑充滿質疑",

      "超派": "雙手叉腰霸氣外露，身後帶有漫畫速度線",

      "拍謝啦": "單手摸後腦勺傻笑吐舌頭，身邊浮現道歉小汗珠",

      "安啦": "神色自若單手比讚，滿臉包在我身上的從容",

      "讚啦": "雙手高高豎起大拇指狂比讚，露出潔白牙齒閃光",

      "先不要": "雙手在身前用力交叉成 X，連忙後退直搖頭",

      "誇張欸": "雙手抱住臉頰下巴掉到地上，雙眼驚呆暴凸",

      "新年快樂": "雙手抱拳作揖拜年，身邊圍繞喜慶紅包與鞭炮",

      "生日快樂": "雙手捧著插著蠟燭的精緻小蛋糕，頭戴派對帽歡呼",

      "聖誕快樂": "戴紅色聖誕帽，抱著滿滿彩色禮物盒微笑",
      "中秋快樂": "手捧金黃美味月餅，頭戴可愛柚子帽，身後一輪溫暖金色滿月，幸福燦爛微笑",
      "中秋節": "頭戴綠色柚子皮削成的小帽子，雙手托腮，呆萌可愛微笑，背景一輪大明月",
      "吃月餅": "雙手捧著咬了一口的金黃蛋黃酥月餅，雙頰鼓起咀嚼，滿臉幸福陶醉",
      "賞月": "愜意坐在草地上仰望巨大的金色滿月，手捧熱茶，悠閒放鬆",
      "賞月去": "一手提著小燈籠，一手指向天空大明月，步伐輕快出發",
      "中秋烤肉": "手拿烤肉夾與香噴噴烤肉串，旁邊小烤肉架飄出炊煙，雙眼發光幸福嘴饞",
      "烤肉啦": "雙手高舉烤肉串與飲料杯，旁邊炭火微紅，滿臉滿足大笑",
      "柚子帽": "頭頂著手削綠色柚子皮造型小帽，雙手比讚，俏皮呆萌",
      "月圓人團圓": "雙手張開比大圓圈，背景有一輪超大金黃明月與祥雲，溫馨祥和微笑",
      "分你吃": "雙手捧著美味點心向前遞出，眼神真誠分享，笑容溫暖",
      "團圓囉": "全家圍坐圓桌其樂融融，氣氛溫馨，背景有金色滿月"

    };



    // 🌟 7 大經典爆款 12 格精選套裝（一鍵整套套用）

    const CURATED_PACKS = [
      {
        id: 'mid_autumn_fest',
        name: '🌕 中秋團圓烤肉',
        icon: <Moon size={14} className="text-amber-300" />,
        desc: '中秋送禮、烤肉連假、月餅柚子應景神套裝',
        phrases: ["中秋快樂", "月圓人團圓", "烤肉啦", "吃月餅", "賞月去", "柚子帽", "分你吃", "超香的", "乾杯", "吃太飽", "連假萬歲", "團圓囉"]
      },

      {

        id: 'daily_essential',

        name: '日常高頻必備',

        icon: <Sun size={14} className="text-amber-400" />,

        desc: '日常聊天覆蓋率 90%，必備萬用神套裝',

        phrases: ["早安", "收到", "謝謝", "辛苦了", "OK", "好的", "沒問題", "稍等", "等等", "笑死", "拜託", "再見"]

      },

      {

        id: 'work_survive',

        name: '上班社畜求生',

        icon: <Briefcase size={14} className="text-blue-400" />,

        desc: '上班族最愛買！滿滿辦公室共鳴與幽默',

        phrases: ["收到", "開會中", "趕工中", "加班中", "馬上好", "求放過", "我太難了", "下班！", "准奏", "眼神死", "對不起", "沒問題"]

      },

      {

        id: 'meme_trend',

        name: '當紅熱門迷因',

        icon: <Flame size={14} className="text-rose-400" />,

        desc: '網路梗王專用，聊天不落俗套超有料',

        phrases: ["這我", "破防了", "笑死", "要確欸", "急了", "很躁", "純愛戰士", "這把高端局", "躺平", "是在哈囉", "哭啊", "超派"]

      },

      {

        id: 'taiwan_style',

        name: '道地台味口頭禪',

        icon: <Laugh size={14} className="text-emerald-400" />,

        desc: '超接地氣台式生活反應，親切感滿分',

        phrases: ["最好是", "是在哈囉", "甘阿捏", "超派", "哭啊", "拍謝啦", "安啦", "讚啦", "先不要", "誇張欸", "沒事啦", "笑死"]

      },

      {

        id: 'lazy_life',

        name: '厭世躺平耍廢',

        icon: <Coffee size={14} className="text-purple-400" />,

        desc: '不想努力了！表達疲憊與放空的極致態度',

        phrases: ["我就爛", "眼神死", "躺平", "發瘋", "壓力山大", "傻眼", "哭啊", "等等", "求放過", "我太難了", "晚安", "對不起"]

      },

      {

        id: 'couple_love',

        name: '撒嬌情侶甜蜜',

        icon: <Heart size={14} className="text-pink-400" />,

        desc: '融化對方的小情侶專屬，甜度超標',

        phrases: ["想你", "愛你", "抱抱", "親親", "好想你", "啾咪", "理我", "吃飽沒", "好棒", "晚安", "早安", "辛苦了"]

      }

    ];



    // =========================================================================

    // 📚 貼圖 16 大完整分類詞庫 (超過 750+ 常用詞)

    // =========================================================================

    const stickerCategories = {

      hots: {

        id: 'hots',

        label: '熱門精選',

        icon: <Star size={14} className="text-amber-400" />,

        pool: [

          "早安", "晚安", "午安", "哈囉", "嗨", "收到", "了解", "好的",

          "OK", "沒問題", "可以", "不行", "等等", "稍等", "馬上來", "快到了",

          "到了", "出發", "回家囉", "謝謝", "感謝", "辛苦了", "麻煩你了", "拜託",

          "對不起", "抱歉", "沒關係", "加油", "讚啦", "太棒了", "恭喜", "真的假的",

          "蛤？", "傻眼", "笑死", "太扯了吧", "無言", "救命", "累死", "想睡",

          "餓了", "好吃", "下班啦", "明天見", "路上小心", "記得喔", "別忘了", "有空嗎"

        ]

      },

      daily: {

        id: 'daily',

        label: '日常生活',

        icon: <Sun size={14} className="text-yellow-400" />,

        pool: [

          "早安", "午安", "晚安", "哈囉", "嗨嗨", "安安", "好久不見", "最近好嗎",

          "吃飽沒", "在幹嘛", "有空嗎", "要不要", "走吧", "出發", "等等我", "我來了",

          "到了", "快到了", "回家囉", "先走囉", "掰掰", "再見", "明天見", "下次見",

          "路上小心", "到家跟我說", "早點睡", "好夢", "起床啦", "我醒了", "餓了", "渴了",

          "吃飯囉", "好吃", "想喝飲料", "休息一下", "累了", "忙一下", "晚點回", "等等回你",

          "收到", "了解", "好的", "沒問題", "可以啊", "不行喔", "都可以", "看你",

          "隨便啦", "我也要", "真的嗎", "原來如此", "知道了", "沒事啦", "別擔心", "放心",

          "保重", "多喝水", "穿暖一點", "好熱", "好冷", "下雨了", "記得帶傘"

        ]

      },

      reaction: {

        id: 'reaction',

        label: '聊天反應',

        icon: <MessageCircle size={14} className="text-blue-400" />,

        pool: [

          "蛤？", "什麼？", "真的假的", "你認真？", "確定？", "真的假的啦", "不會吧", "太扯了吧",

          "誇張欸", "傻眼", "無言", "我看不懂", "聽不懂", "看不下去", "好喔", "喔是喔",

          "嗯嗯", "原來如此", "懂了懂了", "可以喔", "有料", "厲害喔", "太強了", "讚啦",

          "漂亮", "優秀", "完美", "好猛", "笑死", "笑爛", "哈哈哈哈", "救命",

          "我不行了", "嚇死", "怕爆", "完蛋", "慘了", "尷尬", "社死", "崩潰",

          "傻住", "眼神死", "問號", "你再說一次", "我需要消化一下", "我先看看", "合理嗎", "這合理嗎", "可以這樣？"

        ]

      },

      work: {

        id: 'work',

        label: '上班工作',

        icon: <Briefcase size={14} className="text-indigo-400" />,

        pool: [

          "收到", "收到謝謝", "了解", "OK", "沒問題", "好的", "請確認", "請過目",

          "麻煩了", "辛苦了", "感謝", "謝謝幫忙", "處理中", "進行中", "趕工中", "馬上處理",

          "稍後處理", "已完成", "已送出", "已更新", "已修正", "已確認", "請稍等", "晚點回",

          "開會中", "會議中", "忙一下", "加班中", "出差中", "休假中", "請假", "補休",

          "請示", "請批示", "簽核中", "已簽核", "附件請查收", "請看附件", "麻煩確認", "進度更新",

          "今日完成", "明天處理", "有空再看", "急件", "重要", "提醒一下", "可以結案", "下班啦",

          "先下班", "明天繼續", "週末愉快", "辛苦大家了"

        ]

      },

      school: {

        id: 'school',

        label: '老師／學校',

        icon: <FileText size={14} className="text-emerald-400" />,

        pool: [

          "早安同學", "上課囉", "下課囉", "請安靜", "看這裡", "請坐好", "請舉手", "請排隊",

          "集合囉", "準備上課", "開始囉", "時間到", "還有五分鐘", "請交作業", "記得交作業", "作業收到",

          "作業完成", "請訂正", "記得訂正", "請帶課本", "記得帶東西", "請簽名", "請家長簽名", "請聯絡簿簽名",

          "今天有作業", "今天沒作業", "明天要考試", "記得複習", "加油喔", "做得很好", "進步很多", "很棒",

          "再試一次", "慢慢來", "別急", "注意安全", "請小心", "排隊不要跑", "記得喝水", "打掃時間",

          "掃地囉", "準備放學", "放學囉", "明天見", "老師收到", "收到謝謝", "已處理", "請確認",

          "請家長留意", "麻煩家長", "感謝配合", "辛苦家長了", "謝謝協助", "活動提醒", "報名截止", "記得報名"

        ]

      },

      family: {

        id: 'family',

        label: '家庭生活',

        icon: <Heart size={14} className="text-rose-400" />,

        pool: [

          "吃飯囉", "回家吃飯", "記得吃飯", "到家了嗎", "到家跟我說", "路上小心", "慢慢開", "注意安全",

          "記得帶鑰匙", "記得帶傘", "記得吃藥", "多喝水", "早點睡", "不要熬夜", "起床啦", "快起床",

          "要遲到了", "出門囉", "我回來了", "我到家了", "晚點回家", "今天加班", "幫我買一下", "順便買一下",

          "冰箱有東西", "記得倒垃圾", "垃圾車來了", "洗澡囉", "快去洗澡", "作業寫完沒", "快去讀書", "休息一下",

          "辛苦了", "謝謝你", "愛你喔", "抱抱", "別生氣", "沒事啦", "不要擔心", "我知道了",

          "好啦好啦", "等等我", "一起吃飯", "週末去哪", "出發囉", "回家囉"

        ]

      },

      friends: {

        id: 'friends',

        label: '朋友聊天',

        icon: <Laugh size={14} className="text-cyan-400" />,

        pool: [

          "約嗎", "吃飯嗎", "喝一杯嗎", "咖啡嗎", "宵夜嗎", "要去哪", "幾點", "在哪裡",

          "到了嗎", "快到了", "我到了", "等等我", "塞車中", "先點餐", "我先到", "慢慢來",

          "不用急", "下次約", "改天約", "好久不見", "想你們了", "揪一下", "+1", "我也要",

          "算我一個", "不要忘記我", "走起", "出發", "今天可以", "今天不行", "明天可以", "週末可以",

          "再約時間", "傳位置給我", "我迷路了", "救我", "太好笑了", "笑死", "別鬧", "你很鬧",

          "太扯啦", "你認真？", "我先走", "先閃了", "晚點聊", "有空再聊", "謝啦", "辛苦啦"

        ]

      },

      love: {

        id: 'love',

        label: '情侶／撒嬌',

        icon: <Heart size={14} className="text-pink-400" />,

        pool: [

          "想你", "好想你", "愛你", "最愛你", "抱抱", "親親", "啾咪", "貼貼",

          "牽手", "摸摸頭", "秀秀", "寶貝", "親愛的", "老公", "老婆", "哈尼",

          "小可愛", "小寶貝", "在幹嘛", "理我嘛", "陪我", "等你喔", "快回來", "想見你",

          "晚安安", "早安安", "早點睡", "記得吃飯", "不要太累", "辛苦了", "我心疼", "不准生氣",

          "不要氣了", "對不起嘛", "原諒我", "拜託啦", "可以嗎", "好不好嘛", "不要啦", "我不要",

          "人家要", "哼", "討厭", "壞蛋", "笨蛋", "傻瓜", "抱緊處理", "今天也愛你", "明天更愛你"

        ]

      },

      encourage: {

        id: 'encourage',

        label: '鼓勵加油',

        icon: <Sparkles size={14} className="text-amber-300" />,

        pool: [

          "加油", "你可以的", "相信自己", "撐住", "再一下下", "快成功了", "不要放棄", "慢慢來",

          "別急", "沒問題", "交給你了", "交給我", "一起加油", "辛苦了", "做得很好", "太棒了",

          "超厲害", "你最棒", "好強", "漂亮", "完美", "讚啦", "給你一個讚", "掌聲鼓勵",

          "值得慶祝", "恭喜", "成功啦", "完成啦", "過關啦", "辛苦有成果", "今天很棒", "明天繼續",

          "一步一步來", "休息一下再戰", "穩住", "保持住", "衝啊", "GO GO GO", "贏啦", "一定可以",

          "我挺你", "支持你", "抱一下", "拍拍", "辛苦你了"

        ]

      },

      lazy: {

        id: 'lazy',

        label: '厭世／耍廢',

        icon: <Coffee size={14} className="text-purple-400" />,

        pool: [

          "好累", "累死", "不想動", "想睡", "睏爆", "我要睡了", "再睡五分鐘", "起不來",

          "先躺一下", "躺平", "放空中", "腦袋當機", "沒有靈魂", "眼神死", "人生好難", "今天不行",

          "我不行了", "沒電了", "需要充電", "不要找我", "想放假", "我要下班", "什麼都不想做", "明天再說",

          "晚點再弄", "先休息", "算了", "隨便啦", "都可以", "我不知道", "不要問我", "好煩",

          "煩死", "壓力山大", "崩潰中", "想逃跑", "我先消失", "讓我靜靜", "先別說話", "需要咖啡",

          "需要甜點", "需要放空", "週一症候群", "又星期一", "終於週五", "放假萬歲"

        ]

      },

      food: {

        id: 'food',

        label: '吃吃喝喝',

        icon: <Gift size={14} className="text-orange-400" />,

        pool: [

          "吃飯囉", "吃飽沒", "餓了", "超餓", "想吃東西", "好吃", "太好吃了", "開動",

          "我也要", "幫我留", "吃不下了", "吃太飽", "再來一份", "甜點時間", "下午茶", "咖啡時間",

          "來杯咖啡", "想喝飲料", "珍奶嗎", "喝水啦", "乾杯", "宵夜嗎", "火鍋嗎", "燒肉嗎",

          "早餐吃什麼", "午餐吃什麼", "晚餐吃什麼", "今天吃啥", "要吃哪家", "幫我點", "我來點餐", "先吃再說",

          "減肥明天再說", "今天破戒", "好香", "看起來好讚", "我要這個", "不吃香菜", "不要辣", "小辣就好",

          "加辣", "少冰", "微糖", "無糖", "外帶", "內用", "我請客", "AA啦"

        ]

      },

      reminder: {

        id: 'reminder',

        label: '提醒／催促',

        icon: <AlertCircle size={14} className="text-yellow-400" />,

        pool: [

          "記得喔", "別忘了", "提醒一下", "時間到", "快點啦", "要遲到了", "出門了嗎", "到了嗎",

          "好了嗎", "處理了嗎", "看到了嗎", "回我一下", "有空回我", "記得回覆", "記得確認", "請確認",

          "記得簽名", "記得繳交", "記得報名", "快截止了", "今天截止", "明天截止", "還有一天", "剩五分鐘",

          "集合囉", "準備囉", "該出發了", "快起床", "該睡了", "早點睡", "記得喝水", "記得吃飯",

          "記得帶傘", "記得帶東西", "記得充電", "記得關燈", "記得鎖門", "記得拿鑰匙", "不要忘記我", "晚點提醒我"

        ]

      },

      apology: {

        id: 'apology',

        label: '感謝／道歉',

        icon: <Heart size={14} className="text-red-400" />,

        pool: [

          "謝謝", "感謝你", "非常感謝", "謝啦", "多謝", "感恩", "謝謝幫忙", "謝謝你喔",

          "真的謝謝", "辛苦了", "辛苦你了", "麻煩你了", "感謝協助", "感謝配合", "不客氣", "不用客氣",

          "沒事啦", "沒關係", "對不起", "抱歉", "真的抱歉", "不好意思", "我的錯", "我錯了",

          "原諒我", "別生氣", "不要氣了", "下次不會了", "我會改", "拜託你了", "麻煩一下", "請幫忙",

          "救救我", "拜託啦", "感激不盡", "欠你一次", "改天請你", "請你喝飲料", "謝謝體諒", "謝謝提醒"

        ]

      },

      holiday: {

        id: 'holiday',

        label: '節日慶祝',

        icon: <Crown size={14} className="text-amber-400" />,

        pool: [

          "生日快樂", "Happy Birthday", "新年快樂", "恭喜發財", "新春快樂", "大吉大利", "紅包拿來", "恭喜恭喜",

          "開工大吉", "心想事成", "步步高升", "歲歲平安", "年年有餘", "好運旺旺", "招財進寶", "元宵快樂",

          "情人節快樂", "七夕快樂", "母親節快樂", "父親節快樂", "端午安康", "中秋快樂", "聖誕快樂", "Merry Xmas",

          "跨年囉", "萬聖節快樂", "教師節快樂", "兒童節快樂", "畢業快樂", "恭喜畢業", "恭喜升遷", "恭喜中獎"

        ]

      },

      meme: {

        id: 'meme',

        label: '搞笑迷因',

        icon: <Flame size={14} className="text-rose-500" />,

        pool: [

          "是在哈囉", "笑死", "笑爛", "我就看", "你繼續", "又來了", "不要鬧", "太鬧了",

          "這合理嗎", "合理懷疑", "我不理解", "我大受震撼", "問號", "滿頭問號", "傻眼貓咪", "眼神死",

          "沒救了", "我先走", "先閃", "溜了溜了", "救命喔", "完蛋啦", "出事了", "有料",

          "真有你的", "優秀喔", "可以喔", "懂玩", "太會了吧", "不要逼我", "我忍", "忍住",

          "冷靜", "淡定", "先別急", "我很忙", "已讀亂回", "看破不說破", "你說得都對", "好喔沒事",

          "算你狠", "我認輸", "我投降", "別逼我笑", "笑到不行", "主打一個隨緣", "今天就這樣", "明天再努力"

        ]

      },

      taiwan: {

        id: 'taiwan',

        label: '台灣口語',

        icon: <Laugh size={14} className="text-emerald-400" />,

        pool: [

          "真的假的啦", "蛤真的假的", "是在哈囉", "啊不然咧", "有事嗎", "是在忙什麼", "好啦好啦", "可以啦",

          "不行啦", "不要啦", "拜託欸", "很可以", "有夠讚", "有夠扯", "超扯", "超鬧",

          "很鬧欸", "笑死我", "我傻眼", "傻眼欸", "無言欸", "靠邀喔", "別鬧啦", "先不要",

          "母湯喔", "安捏母湯", "真的假的啦", "哩洗咧", "我就問", "到底喔", "怎樣啦", "好喔",

          "喔是喔", "欸不是", "不是欸", "欸等等", "先等一下", "可以欸", "不錯欸", "讚喔",

          "水啦", "穩啦", "沒問題啦", "歹勢啦", "感恩啦", "辛苦啦", "慢慢來啦", "免驚啦"

        ]

      }

    };



    // =========================================================================

    // 🎭 表情貼 (Emoji) 7 大完整專屬分類詞庫 (超過 290+ 常用詞)

    // =========================================================================

    const emojiCategories = {

      faces: {

        id: 'faces',

        label: '表情特寫',

        icon: <Smile size={14} className="text-yellow-400" />,

        pool: [

          "大笑", "微笑", "甜笑", "眨眼", "飛吻", "愛心眼", "害羞", "臉紅",

          "得意", "調皮", "奸笑", "憋笑", "爆笑", "笑到流淚", "感動", "流淚",

          "大哭", "委屈", "可憐兮兮", "生氣", "暴怒", "鼓臉", "不爽", "翻白眼",

          "無言", "傻眼", "眼神死", "尷尬", "冒汗", "疑惑", "歪頭", "思考",

          "發呆", "放空", "想睡", "打哈欠", "驚訝", "嚇到", "尖叫", "崩潰",

          "石化", "期待", "興奮", "崇拜", "星星眼", "滿足", "幸福", "緊張",

          "心虛", "認真", "專注", "自信"

        ]

      },

      hands: {

        id: 'hands',

        label: '手勢動作',

        icon: <Hand size={14} className="text-orange-400" />,

        pool: [

          "比讚", "雙手比讚", "倒讚", "OK手勢", "勝利YA", "雙手YA", "手指愛心", "雙手愛心",

          "合十感謝", "合十拜託", "鼓掌", "握拳加油", "揮手", "雙手揮手", "敬禮", "握手",

          "擊掌", "指上面", "指下面", "指左邊", "指右邊", "指自己", "禁止手勢", "停止手勢",

          "安靜手勢", "遮臉", "遮眼", "抱頭", "雙手叉腰", "雙手抱胸", "張開雙手", "擁抱姿勢",

          "摸頭", "托腮", "擦汗", "拍胸口", "握拳生氣", "投降", "比大愛心", "手比電話"

        ]

      },

      work_tags: {

        id: 'work_tags',

        label: '工作／活動',

        icon: <Briefcase size={14} className="text-blue-400" />,

        pool: [

          "開會", "休假", "加班", "出差", "值班", "請假", "OK", "收到",

          "確認", "待辦", "完成", "急件", "重要", "提醒", "注意", "公告",

          "活動", "聚餐", "報名", "截止", "集合", "出發", "遲到", "早退",

          "繳費", "免費", "優惠", "暫停", "取消", "延期", "處理中", "已完成",

          "已送出", "已更新", "請確認", "已讀", "稍後回", "忙碌中", "下班", "休息"

        ]

      },

      school_tags: {

        id: 'school_tags',

        label: '老師／學校',

        icon: <FileText size={14} className="text-emerald-400" />,

        pool: [

          "上課", "下課", "作業", "訂正", "考試", "複習", "集合", "排隊",

          "安靜", "舉手", "打掃", "放學", "早自習", "午休", "值日", "值週",

          "研習", "開會", "請假", "公差", "報名", "截止", "通知", "公告",

          "提醒", "家長", "聯絡簿", "簽名", "課本", "平板", "設備", "網路"

        ]

      },

      moods: {

        id: 'moods',

        label: '心情狀態',

        icon: <MessageCircle size={14} className="text-purple-400" />,

        pool: [

          "開心", "超開心", "幸福", "興奮", "期待", "滿足", "放鬆", "平靜",

          "無聊", "放空", "疲累", "想睡", "沒電", "煩躁", "生氣", "委屈",

          "難過", "想哭", "緊張", "害怕", "驚訝", "尷尬", "心虛", "疑惑",

          "無言", "傻眼", "崩潰", "瘋掉", "得意", "驕傲", "認真", "專注"

        ]

      },

      symbols: {

        id: 'symbols',

        label: '裝飾符號',

        icon: <Star size={14} className="text-pink-400" />,

        pool: [

          "大愛心", "小愛心", "破碎愛心", "閃亮", "星星", "音符", "驚嘆號", "問號",

          "雙問號", "睡覺Zzz", "生氣符號", "汗滴", "火焰", "爆炸", "燈泡", "錢袋",

          "金幣", "蛋糕", "禮物", "花朵", "太陽", "月亮", "雲朵", "下雨",

          "閃電", "彩虹", "鑽石", "皇冠", "獎盃", "信封", "手機", "咖啡",

          "珍奶", "飯糰", "時鐘", "鬧鐘", "勾勾", "叉叉", "OK標誌", "警告"

        ]

      },

      quick: {

        id: 'quick',

        label: '聊天短句',

        icon: <Sparkles size={14} className="text-cyan-400" />,

        pool: [

          "OK", "好", "可以", "不行", "收到", "了解", "等等", "稍等",

          "馬上", "到了", "出發", "回家", "謝謝", "抱歉", "沒事", "加油",

          "讚", "棒", "笑死", "蛤？", "真的？", "傻眼", "無言", "救命",

          "累了", "想睡", "餓了", "忙中", "下班", "晚安", "早安", "掰掰"

        ]

      }

    };



    // =========================================================================

    // 🧠 智慧神態動作推斷引擎（字典精確 + 21組正則推斷 + 輪巡兜底）

    // =========================================================================

    const inferAction = (phrase, index) => {

      const p = String(phrase || '').trim();

      if (!p) return "正面微笑、雙手自然張開";

      

      // 1. 精確字典命中

      if (ACTION_MAP[p]) return ACTION_MAP[p];



      // 2. 正則語意規則庫

      const rules = [

        [/早安|午安|晚安|嗨|哈囉|安安|再見|掰掰|明天見|下次見/, '開朗揮手，配合時段做精神滿滿或溫柔晚安表情'],

        [/謝謝|感謝|感恩|辛苦|麻煩|不客氣|配合/, '雙手合十或微微鞠躬，真誠感謝的溫暖微笑'],

        [/對不起|抱歉|歹勢|我的錯|原諒/, '低頭道歉、雙手合十，內疚又可愛的表情'],

        [/加油|撐住|相信自己|你可以|衝啊|go go|穩住/, '握拳加油、身體前傾，熱血又有精神'],

        [/讚|棒|厲害|太強|優秀|漂亮|完美|水啦|很可以/, '大拇指比讚或雙手比讚，自信燦爛笑容'],

        [/收到|了解|ok|沒問題|已確認|知道了|可以啦/, '俐落敬禮或比 OK 手勢，認真可靠的表情'],

        [/等等|稍等|等等我|快點|時間到|截止|提醒/, '一手向前示意等等或看手錶，略帶急促的表情'],

        [/到了|快到了|出發|走吧|回家|先走|我來了/, '向前小跑步或指向前方，充滿動感'],

        [/睡|晚安|休息|累|睏|沒電|躺平|放空/, '揉眼睛、抱枕、趴桌或癱軟，疲憊可愛'],

        [/哭|難過|委屈|嗚|心疼/, '眼眶含淚或大哭，肩膀下垂，情緒明顯'],

        [/生氣|怒|氣死|煩|討厭|不爽|紅溫/, '鼓起臉頰、雙手叉腰或頭頂冒火，誇張生氣'],

        [/驚|嚇|真的假的|真的？|真的嗎|蛤|什麼|\?|!!|不會吧/, '睜大眼睛、歪頭或雙手張開，頭頂大問號'],

        [/笑|哈哈|嘿嘿|嘻嘻|笑死|笑爛|太好笑/, '捧腹大笑、笑到流淚或往後仰，喜感誇張'],

        [/愛|想你|抱抱|親親|啾咪|寶貝|貼貼|牽手|小可愛/, '雙手比愛心或張手抱抱，害羞臉紅'],

        [/餓|好吃|吃飯|早餐|午餐|晚餐|宵夜|火鍋|燒肉|咖啡|珍奶/, '拿餐具或飲料、摸肚子，眼睛發亮期待'],

        [/開會|工作|加班|處理中|請確認|報告|簽核|附件|進度/, '拿筆電、文件或筆記板，專注工作姿勢'],

        [/上課|下課|作業|訂正|考試|複習|排隊|集合|放學|老師|家長/, '拿課本、板夾或指示牌，清楚的教師／校園動作'],

        [/中秋|月餅|柚子|賞月|烤肉/, '手捧香甜月餅或戴著柚子帽，身後一輪溫暖金色滿月，幸福微笑'],
        [/生日|新年|聖誕|恭喜|慶祝|乾杯|畢業|升遷|中獎/, '撒彩帶、舉杯或高舉雙手，開心慶祝'],

        [/雨|帶傘|好冷|穿暖|好熱|喝水/, '拿雨傘、水杯或擦汗，配合天氣做明顯動作'],

        [/救命|完蛋|慘了|崩潰|社死|沒救/, '抱頭蹲下或往後倒，誇張崩潰喜劇效果'],

        [/不要|不行|停止|安靜|先不要/, '雙手交叉做禁止手勢，表情堅定但可愛']

      ];

      for (const [re, action] of rules) {

        if (re.test(p)) return action;

      }



      // 3. 兜底多樣輪巡動作

      const fallbacks = [

        "正面微笑、雙手自然張開", "側身比讚、俏皮眨眼", "微微俯角、雙手叉腰",

        "雙手高舉、興奮跳起", "托腮思考、疑惑表情", "雙手抱胸、無言表情",

        "單手指向文字、活潑表情", "半身近景、驚喜表情", "全身小跑步、開心表情",

        "雙手比YA、燦爛微笑", "歪頭放空、呆萌表情", "揮手轉身、輕鬆表情"

      ];

      return fallbacks[index % fallbacks.length];

    };



    // ==========================================

    // Part 1: Prompt Generator Component

    // ==========================================

    const PromptGenerator = ({ mode, setMode }) => {

      const [styleType, setStyleType] = useState("Japanese Anime");
      const [customStyleText, setCustomStyleText] = useState("");

      const [language, setLanguage] = useState("台灣繁體中文");

      const [copied, setCopied] = useState(false);

      const [includeNegative, setIncludeNegative] = useState(true);

      const [includeActions, setIncludeActions] = useState(true); // 動作指令聯動開關

      const [batchInputText, setBatchInputText] = useState("");
      const [phraseSearch, setPhraseSearch] = useState("");
      const [activeDropdown, setActiveDropdown] = useState(null);

      // 點擊外部自動關閉下拉選單
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (!e.target.closest('.phrase-dropdown-container')) {
            setActiveDropdown(null);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

      // 全庫所有詞彙集合（供跨庫搜尋與輸入建議）
      const allCategoryPhrases = useMemo(() => {
        const list = [];
        Object.values(currentCategories).forEach(cat => {
          cat.pool.forEach(p => {
            if (!list.includes(p)) list.push(p);
          });
        });
        return list;
      }, [currentCategories]);

      // 跨分類即時搜尋結果
      const searchResults = useMemo(() => {
        if (!phraseSearch.trim()) return [];
        const q = phraseSearch.trim().toLowerCase();
        const results = [];
        Object.values(currentCategories).forEach(cat => {
          cat.pool.forEach(phrase => {
            if (phrase.toLowerCase().includes(q) && !results.some(r => r.phrase === phrase)) {
              results.push({ phrase, category: cat.label });
            }
          });
        });
        return results;
      }, [phraseSearch, currentCategories]);

      const [showBatchModal, setShowBatchModal] = useState(false);



      const currentCategories = mode === 'sticker' ? stickerCategories : emojiCategories;

      const initialCategoryKey = mode === 'sticker' ? 'hots' : 'faces';



      const [activeCategory, setActiveCategory] = useState(initialCategoryKey);

      const [phrases, setPhrases] = useState(currentCategories[initialCategoryKey].pool.slice(0, 12));



      // 模式切換

      useEffect(() => {

        const defaultCat = mode === 'sticker' ? 'hots' : 'faces';

        setActiveCategory(defaultCat);

        setPhrases(getRandomPhrases(mode === 'sticker' ? stickerCategories.hots.pool : emojiCategories.faces.pool));

      }, [mode]);



            const styleOptions = [
        { value: "Japanese Anime", label: "日系動漫風 (熱銷預設)", desc: "賽璐珞上色、線條乾淨、鮮豔二次元" },
        { value: "Big Eyes Cel Shading", label: "大眼賽璐璐萌系", desc: "靈動大眼睛、精緻賽璐珞光影、極致可愛" },
        { value: "2D Flat Cute", label: "2D 平面簡約可愛", desc: "極簡色塊、粗線條萌感、高對比易讀" },
        { value: "Hand Drawn Watercolor", label: "手繪水彩治癒風", desc: "柔和水彩暈染、溫暖手繪筆觸、清新療癒" },
        { value: "3D Chibi Pixar", label: "3D Q版皮克斯動畫風", desc: "精緻 3D 渲染、細膩黏土材質、圓潤討喜" },
        { value: "American Cartoon", label: "美式復古卡通風", desc: "誇張表情變形、粗黑線條、美式幽默" },
        { value: "Retro Pixel Art", label: "復古像素點陣風", desc: "8-bit 像素藝術、懷舊電玩風格、方塊顆粒感" },
        { value: "Wuxia Ink Martial", label: "🗡️ 經典東方武俠風", desc: "飄逸古風俠客服飾、靈動水墨劍氣筆韻、江湖豪邁俠氣、經典國風氣場" },
        { value: "Hong Kong Manhua", label: "💥 熱血硬派港漫風", desc: "粗獷剛勁線條、精緻黑白交叉排線、誇張肌肉與動態張力、黃玉郎馬榮成熱血漫畫風格" },
        { value: "Doodle Meme", label: "🐱 搞怪白爛手繪風", desc: "簡約隨性粗手繪線條、呆萌無厘頭表情、白爛搞笑、咖波白爛貓風格" },
        { value: "Pastel Kawaii", label: "🍬 三麗鷗粉嫩糖果風", desc: "柔和粉嫩馬卡龍配色、圓滾滾飽滿輪廓、腮紅粉嫩萌感、三麗鷗治癒系" },
        { value: "Minimalist Line", label: "✏️ 極簡黑白線條風", desc: "極簡純黑墨線、大幅白色留白、誇張喜感肢體、日系黑白幽默" },
        { value: "Storybook Gouache", label: "📚 溫暖童話繪本風", desc: "溫暖不透明水粉厚塗、童話繪本筆觸、手作粗糙紙張紋理、治癒文青感" },
        { value: "Claymation 3D", label: "🧸 軟萌黏土手作風", desc: "圓潤立體黏土雕塑質感、定格動畫公仔立體感、手工微光澤與軟萌比例" },
        { value: "Pop Mart Vinyl", label: "🎁 潮玩盲盒公仔風", desc: "泡泡瑪特盲盒玩具感、細緻啞光 PVC 搪膠材質、大頭小身精美高光" },
        { value: "Retro Shoujo", label: "✨ 80年代復古少女漫", desc: "70-80年代經典復古動漫風、眼睛閃爍繁複星星高光、誇張戲劇性華麗網點" },
        { value: "Custom", label: "✏️ 自訂自填風格 (Custom)", desc: "自訂專屬畫風描述" }
      ];



      function getRandomPhrases(pool) {

        const shuffled = [...pool].sort(() => 0.5 - Math.random());

        return shuffled.slice(0, 12);

      }



      const handleCategoryChange = (catKey) => {

        setActiveCategory(catKey);

        setPhrases(getRandomPhrases(currentCategories[catKey].pool));

      };



      const handleShuffleCurrent = () => {

        const pool = currentCategories[activeCategory]?.pool || [];

        setPhrases(getRandomPhrases(pool));

      };



      const handlePhraseChange = (index, value) => {

        const newPhrases = [...phrases];

        newPhrases[index] = value;

        setPhrases(newPhrases);

      };



      // 套用精選套裝

      const handleApplyPack = (pack) => {

        setPhrases([...pack.phrases]);

      };



      // 批次匯入

      const handleBatchImport = () => {

        if (!batchInputText.trim()) return;

        const parsed = batchInputText

          .split(/[\n,，、;；\s]+/)

          .map(s => s.trim())

          .filter(Boolean);

        

        if (parsed.length === 0) return;

        

        const newPhrases = [...phrases];

        for (let i = 0; i < 12; i++) {

          if (i < parsed.length) {

            newPhrases[i] = parsed[i];

          }

        }

        setPhrases(newPhrases);

        setShowBatchModal(false);

        setBatchInputText("");

      };



      // 產生 Prompt 邏輯

      const generatePrompt = () => {

        const selectedStyle = styleOptions.find(s => s.value === styleType);

        let styleDesc = selectedStyle ? selectedStyle.desc : "賽璐珞上色、線條清晰、動漫感";
        if (styleType === "Custom" && customStyleText.trim()) {
          styleDesc = customStyleText.trim();
        }



        const gridInstructions = phrases.map((phrase, index) => {

          const action = inferAction(phrase, index);

          return includeActions

            ? `第${index + 1}格：「${phrase}」— ${action}`

            : `第${index + 1}格：「${phrase}」`;

        }).join('\n');



        const negativePromptBlock = includeNegative ? `

[負向提示詞 (Negative Prompt)]

ugly, deformed, mutated, extra fingers, poorly drawn hands, missing limbs, disconnected limbs, blurry, bad anatomy, bad text, distorted font, gradient background, noisy background, photorealistic, 3d shadows on background

` : '';



        if (mode === 'sticker') {

          return `✅ LINE 貼圖 12 格｜v3.6 Scenario Pro Edition 旗艦 Prompt

請嚴格參考上傳圖片中的同一位角色，生成 4 × 3、共 12 格的 LINE 貼圖集。



[角色一致性｜最高優先]

- 12 格必須是同一位角色，嚴禁新增第二人物。

- 不得改變髮型、髮色、臉型、五官、年齡、性別、服裝、服裝配色與核心配件。

- 每一格都要讓人一眼辨識為同一角色，只改變動作姿勢、表情與拍攝視角。



[畫風與背景規範]

畫風：【${styleDesc}】。

畫面只包含「角色 + 文字」，無背景家具、建築或複雜雜物。

角色與文字外圍皆需加上明顯的【粗白色貼圖外框 (Sticker Contour)】。

背景統一為純綠色【#00FF00 (Pure Green Screen)】，無任何漸層、投影或紋理。



[畫面規格]

4 × 3 網格，共 12 格；整張畫布建議 1480 × 960 px，比例 37:24。

每格內容置中並保留安全邊距，角色與文字嚴禁跨越格線。

視角豐富：全身與半身穿插，正面、微側、俯角交替呈現。



[逐格文字與動態神態｜嚴格依序生成]

${gridInstructions}



[文字設計規範]

語言：【${language}】。

文字必須完全照上面 12 格內容，不可自行增刪、篡改或交換順序。

字體粗體醒目、排版活潑高辨識度；文字大小約佔單格 1/4 ~ 1/3，嚴禁遮擋角色面部。

禁止使用純黑色文字與純綠色文字；優先使用紅、藍、紫、橘、深咖等高對比鮮亮色彩。

${negativePromptBlock}

[輸出參數]

一張大圖內含 4 × 3 共 12 格貼圖；每格不同生動動作與表情；純綠背景 #00FF00。

--ar 37:24 --v 6.0`;

        }



        return `✅ LINE 表情貼 12 格｜v3.6 Scenario Pro Edition 旗艦 Prompt

請嚴格參考上傳圖片中的同一位角色，生成 4 × 3、共 12 格的 LINE 表情貼圖集。



[角色一致性｜最高優先]

- 12 格必須為完全相同的同一位角色，嚴禁更換面孔。

- 髮型、髮色、五官、裝扮風格與配件維持高度一致。

- 重點在於臉部微表情、眼神與趣味手勢的生動變化。



[表情貼特點與規格]

畫面構圖以「Q版大頭特寫／胸部以上半身」為主，頭頂搭配極簡文字或符號。

畫風：【${styleDesc}】，線條乾淨簡約，微縮至 180×180 px 依然極度清晰。

角色周圍加上細緻白色邊框，背景為標準純綠色【#00FF00】。



[畫面規格]

4 × 3 網格，共 12 格；整張建議 720 × 540 px，比例 4:3；每格 180 × 180 px。

每格居中，彼此不重疊穿插。



[逐格內容｜嚴格對應]

${gridInstructions}



[文字規範]

文字嚴格照上述 12 格內容，固定在角色頭頂上方或身側，粗體、鮮明、不可遮臉。

${negativePromptBlock}

[輸出參數]

4 × 3 表情貼大圖，背景純綠色 #00FF00；適合聊天室嵌入微縮顯示。

--ar 4:3 --v 6.0`;

      };



      // 三重保險複製 Prompt

      const handleCopy = async () => {

        const text = generatePrompt();



        const legacyCopy = () => {

          const textArea = document.createElement("textarea");

          textArea.value = text;

          textArea.setAttribute("readonly", "");

          textArea.style.position = "fixed";

          textArea.style.top = "0";

          textArea.style.left = "0";

          textArea.style.width = "1px";

          textArea.style.height = "1px";

          textArea.style.opacity = "0.01";

          textArea.style.zIndex = "999999";

          document.body.appendChild(textArea);

          textArea.focus();

          textArea.select();

          textArea.setSelectionRange(0, textArea.value.length);

          let ok = false;

          try {

            ok = document.execCommand("copy");

          } catch (e) {

            ok = false;

          }

          document.body.removeChild(textArea);

          return ok;

        };



        let copiedOk = false;

        if (navigator.clipboard && window.isSecureContext) {

          try {

            await navigator.clipboard.writeText(text);

            copiedOk = true;

          } catch (err) {

            copiedOk = legacyCopy();

          }

        } else {

          copiedOk = legacyCopy();

        }



        if (copiedOk) {

          setCopied(true);

          setTimeout(() => setCopied(false), 2000);

          return;

        }



        window.prompt("瀏覽器阻擋了自動複製，請按 Ctrl+C 複製下方 Prompt：", text);

      };



      const currentPool = currentCategories[activeCategory]?.pool || [];



      return (

        <div className={`w-full min-h-screen p-4 md:p-8 font-sans transition-colors duration-500 ${mode === 'sticker' ? 'bg-[#0b0c15]' : 'bg-[#0b0c15]'}`}>

          <div className="max-w-7xl mx-auto space-y-6">



            {/* 頂部 Header & 模式切換 */}

            <div className="bg-[#151926] rounded-2xl shadow-xl p-6 border border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">

              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r opacity-70 ${mode === 'emoji' ? 'from-orange-500 via-yellow-500 to-amber-500' : 'from-emerald-500 via-indigo-500 to-purple-500'}`}></div>

              

              <div className="flex items-center space-x-4">

                <div className={`p-3 rounded-2xl text-white transition-all shadow-lg ${mode === 'sticker' ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-orange-500 shadow-orange-500/20'}`}>

                  {mode === 'sticker' ? <Wand2 size={24} /> : <Smile size={24} />}

                </div>

                <div>

                  <div className="flex items-center gap-2.5">

                    <h1 className="text-2xl font-black text-white tracking-tight">

                      {mode === 'sticker' ? 'LINE 貼圖 Prompt 咒語產生器' : 'LINE 表情貼 Prompt 咒語產生器'}

                    </h1>

                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">

                      v3.6 Scenario Pro Edition

                    </span>

                  </div>

                  <p className="text-slate-400 text-xs mt-1">

                    {mode === 'sticker' 

                      ? '✨ 4×3 共 12 格大貼圖 • 16 大情境詞庫 • 動作神態正則自動推斷 • 官方綠幕輸出' 

                      : '✨ 4×3 共 12 格微縮表情貼 • 7 大特寫手勢詞庫 • 適合微縮顯示的大頭特寫'}

                  </p>

                </div>

              </div>



              {/* 模式切換 */}

              <div className="flex bg-[#0f1117] p-1.5 rounded-xl border border-slate-700/80">

                <button

                  onClick={() => setMode('sticker')}

                  className={`flex items-center px-4 py-2 rounded-lg text-xs font-bold transition-all ${

                    mode === 'sticker'

                      ? 'bg-emerald-600 text-white shadow-md'

                      : 'text-slate-400 hover:text-slate-200'

                  }`}

                >

                  <Sticker size={14} className="mr-1.5" />

                  一般貼圖模式

                </button>

                <button

                  onClick={() => setMode('emoji')}

                  className={`flex items-center px-4 py-2 rounded-lg text-xs font-bold transition-all ${

                    mode === 'emoji'

                      ? 'bg-orange-500 text-white shadow-md'

                      : 'text-slate-400 hover:text-slate-200'

                  }`}

                >

                  <Smile size={14} className="mr-1.5" />

                  表情貼模式

                </button>

              </div>

            </div>



            {/* 🌟 7 大經典爆款 12 格精選套裝 (一鍵套用) */}

            {mode === 'sticker' && (

              <div className="bg-[#151926] rounded-2xl p-5 border border-slate-800/80 shadow-lg">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">

                  <div className="flex items-center gap-2">

                    <Crown size={16} className="text-amber-400" />

                    <span className="text-sm font-bold text-slate-200">7 大經典爆款 12 格精選套裝</span>

                    <span className="text-[10px] text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">

                      點擊立即整套填滿 12 格

                    </span>

                  </div>

                  <button

                    onClick={() => setShowBatchModal(true)}

                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30 transition-all font-medium self-start sm:self-auto"

                  >

                    <FileUp size={13} /> 批次貼上文字匯入

                  </button>

                </div>



                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">

                  {CURATED_PACKS.map(pack => (

                    <button

                      key={pack.id}

                      onClick={() => handleApplyPack(pack)}

                      className="group flex flex-col p-3 rounded-xl bg-[#0f1117] border border-slate-800 hover:border-emerald-500/50 hover:bg-[#1a2030] transition-all text-left"

                    >

                      <div className="flex items-center gap-1.5 mb-1">

                        {pack.icon}

                        <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{pack.name}</span>

                      </div>

                      <p className="text-[10px] text-slate-500 line-clamp-1 mb-2">{pack.desc}</p>

                      <span className="text-[9px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded self-start">

                        12 個詞彙

                      </span>

                    </button>

                  ))}

                </div>

              </div>

            )}



            {/* 主要控制與預覽雙欄佈局 */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">



              {/* 左側：控制面板 (7 cols) */}

              <div className="lg:col-span-7 space-y-6">

                

                {/* 風格、語言與動作開關 */}

                <div className="bg-[#151926] rounded-2xl shadow-xl p-6 border border-slate-800/80 space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="space-y-2">

                      <label className="flex items-center text-xs font-semibold text-slate-300">

                        <Palette size={14} className="mr-1.5 text-indigo-400" />

                        繪畫風格選擇

                      </label>

                      <select

                        value={styleType}

                        onChange={(e) => setStyleType(e.target.value)}

                        className="w-full p-2.5 bg-[#0f1117] border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none"

                      >

                        {styleOptions.map((opt) => (

                          <option key={opt.value} value={opt.value}>{opt.label}</option>

                        ))}

                      </select>

                      <p className="text-[10px] text-slate-500 line-clamp-1">

                        {styleOptions.find(o => o.value === styleType)?.desc}

                      </p>

                    </div>



                    <div className="space-y-2">

                      <label className="flex items-center text-xs font-semibold text-slate-300">

                        <Type size={14} className="mr-1.5 text-amber-400" />

                        貼圖文字語言

                      </label>

                      <select

                        value={language}

                        onChange={(e) => setLanguage(e.target.value)}

                        className="w-full p-2.5 bg-[#0f1117] border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none"

                      >

                        <option value="台灣繁體中文">台灣繁體中文 (Traditional Chinese)</option>

                        <option value="English">English</option>

                        <option value="Japanese">日本語 (Japanese)</option>

                        <option value="Korean">한국어 (Korean)</option>

                      </select>

                      <p className="text-[10px] text-slate-500">

                        依目標市場選擇文字呈現語言

                      </p>

                    </div>

                  </div>



                  {/* 參數微調開關 */}

                  <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#0f1117] border border-slate-800 cursor-pointer hover:border-slate-700 transition">

                      <div className="flex flex-col">

                        <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">

                          <Wand2 size={13} className="text-emerald-400" />

                          文字聯動生動動作

                        </span>

                        <span className="text-[10px] text-slate-500">自動生成豐富肢體神態，告別死板站姿</span>

                      </div>

                      <input

                        type="checkbox"

                        checked={includeActions}

                        onChange={(e) => setIncludeActions(e.target.checked)}

                        className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-slate-900"

                      />

                    </label>



                    <label className="flex items-center justify-between p-3 rounded-xl bg-[#0f1117] border border-slate-800 cursor-pointer hover:border-slate-700 transition">

                      <div className="flex flex-col">

                        <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">

                          <ShieldAlert size={13} className="text-rose-400" />

                          附加負向提示詞

                        </span>

                        <span className="text-[10px] text-slate-500">防止多指、破壞字體與雜質背景</span>

                      </div>

                      <input

                        type="checkbox"

                        checked={includeNegative}

                        onChange={(e) => setIncludeNegative(e.target.checked)}

                        className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 bg-slate-900"

                      />

                    </label>

                  </div>

                </div>



                {/* 詞庫分類選擇器 */}

                <div className="bg-[#151926] rounded-2xl shadow-xl p-6 border border-slate-800/80 space-y-4">

                  <div className="flex justify-between items-center">

                    <div className="flex items-center gap-2">

                      <LayoutGrid size={16} className="text-emerald-400" />

                      <h3 className="text-xs font-bold text-slate-200">

                        {mode === 'sticker' ? '貼圖 16 大主題詞庫' : '表情貼 7 大主題詞庫'}

                      </h3>

                    </div>

                    <button

                      onClick={handleShuffleCurrent}

                      className="text-xs px-3 py-1 rounded-lg flex items-center gap-1 text-slate-300 bg-[#1e2336] hover:bg-[#252b42] border border-slate-700 transition"

                    >

                      <Shuffle size={12} /> 換一組隨機詞彙

                    </button>

                  </div>



                  {/* 分類按鈕滾動區 */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">

                    {Object.values(currentCategories).map((cat) => (

                      <button

                        key={cat.id}

                        onClick={() => handleCategoryChange(cat.id)}

                        className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-medium transition-all ${

                          activeCategory === cat.id

                            ? (mode === 'sticker' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-orange-500 text-white shadow-lg')

                            : 'bg-[#0f1117] text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-[#1a2030]'

                        }`}

                      >

                        {cat.icon}

                        <span className="truncate">{cat.label}</span>

                      </button>

                    ))}

                  </div>



                  {/* 12 格內容編輯區 */}

                  <div className="pt-3 border-t border-slate-800/80">

                    <div className="flex justify-between items-center mb-2.5">

                      <span className="text-[11px] font-semibold text-slate-400">

                        當前 12 格詞彙（可直接自由輸入，或點擊 ▾ 下拉自選詞庫）：

                      </span>

                      <span className="text-[10px] text-emerald-400 font-mono">

                        💡 建議 2~4 字易讀性最佳

                      </span>

                    </div>



                    



                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                      {phrases.map((phrase, index) => {

                        const len = phrase.length;

                        const isIdeal = len >= 2 && len <= 4;

                        const isTooLong = len > 5;



                        return (

                                                    <div key={index} className="relative phrase-dropdown-container bg-[#0f1117] p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                            <div className="flex justify-between items-center mb-1 text-[10px] text-slate-500">
                              <span className="font-semibold text-slate-400">#{index + 1}</span>
                              <span className={`font-mono text-[9px] px-1 py-0.2 rounded ${
                                isIdeal ? 'text-emerald-400 bg-emerald-500/10' : (isTooLong ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500')
                              }`}>
                                {len}字
                              </span>
                            </div>

                            <div className="relative flex items-center">
                              <input
                                type="text"
                                value={phrase}
                                onChange={(e) => handlePhraseChange(index, e.target.value)}
                                className="w-full bg-[#151926] pl-2.5 pr-7 py-1.5 text-center text-xs font-bold text-slate-200 border border-slate-700/80 rounded-lg outline-none focus:border-emerald-500 transition"
                                placeholder={`第 ${index + 1} 格`}
                              />
                              <button
                                type="button"
                                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                title="點擊展開詞庫下拉選單自選"
                                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 rounded transition cursor-pointer"
                              >
                                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180 text-emerald-400' : ''}`} />
                              </button>
                            </div>

                            {/* 💡 專屬智慧選詞下拉面板 (點選自己選擇) */}
                            {activeDropdown === index && (
                              <div className={`absolute z-50 mt-1.5 w-72 sm:w-80 bg-[#141824] border border-indigo-500/60 rounded-xl shadow-2xl p-3 text-left space-y-2.5 backdrop-blur-md ${
                                (index % 3 === 2 || index % 2 === 1) ? 'right-0' : 'left-0'
                              }`}>
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                  <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                                    <Sparkles size={13} className="text-amber-400" />
                                    自選第 #{index + 1} 格詞彙
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-slate-400 hover:text-white p-0.5 rounded"
                                  >
                                    <X size={13} />
                                  </button>
                                </div>

                                {/* 切換分類下拉選單 */}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                                    <span>切換詞庫主題：</span>
                                    <span className="text-emerald-400 font-mono">
                                      {currentCategories[activeCategory]?.pool?.length || 0} 個詞可選
                                    </span>
                                  </div>
                                  <select
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value)}
                                    className="w-full bg-[#0b0c15] text-xs text-slate-200 border border-slate-700/80 rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 cursor-pointer"
                                  >
                                    {Object.values(currentCategories).map(cat => (
                                      <option key={cat.id} value={cat.id}>
                                        {cat.label} ({cat.pool.length} 詞)
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* 候選詞庫網格按鈕 */}
                                <div className="space-y-1">
                                  <div className="text-[10px] text-slate-400">點擊任意詞彙立即填入：</div>
                                  <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
                                    {(currentCategories[activeCategory]?.pool || []).map((p, pIdx) => (
                                      <button
                                        key={pIdx}
                                        type="button"
                                        onClick={() => {
                                          handlePhraseChange(index, p);
                                          setActiveDropdown(null);
                                        }}
                                        title={p}
                                        className={`px-2 py-1.5 rounded-lg text-xs font-medium text-center transition truncate border cursor-pointer ${
                                          phrase === p
                                            ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow'
                                            : 'bg-[#0b0c15] hover:bg-indigo-600/30 text-slate-300 hover:text-white border-slate-800 hover:border-indigo-500/50'
                                        }`}
                                      >
                                        {p}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {includeActions && (
                              <p className="text-[9px] text-slate-500 mt-1 line-clamp-1" title={inferAction(phrase, index)}>
                                動作：{inferAction(phrase, index)}
                              </p>
                            )}
                          </div>
                        );
                      })}

                    </div>

                  </div>

                </div>



              </div>



              {/* 右側：預覽與輸出 (5 cols) */}

              <div className="lg:col-span-5 flex flex-col space-y-6">

                <div className="bg-[#151926] rounded-2xl shadow-xl p-6 border border-slate-800/80 flex flex-col h-full">

                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-2">

                      <Terminal size={18} className="text-emerald-400" />

                      <h2 className="text-sm font-bold text-slate-200">生成之 Prompt (提示詞)</h2>

                    </div>

                    <span className="text-[10px] text-slate-400 bg-[#0f1117] px-2.5 py-1 rounded-full border border-slate-800 font-mono">

                      Midjourney / DALL-E 3

                    </span>

                  </div>



                  <div className="flex-grow bg-[#090b10] text-slate-200 p-4 rounded-xl font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-[500px] shadow-inner select-all">

                    {generatePrompt()}

                  </div>



                  <div className="mt-6 space-y-3">

                    <button

                      onClick={handleCopy}

                      className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-200 shadow-lg transform active:scale-[0.99] ${

                        copied

                          ? "bg-emerald-600 text-white shadow-emerald-900/30"

                          : (mode === 'sticker' 

                              ? "bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-emerald-900/20" 

                              : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white shadow-orange-900/20")

                      }`}

                    >

                      {copied ? (

                        <>

                          <Check size={18} className="mr-2" /> 已複製到剪貼簿！

                        </>

                      ) : (

                        <>

                          <Copy size={18} className="mr-2" /> 複製 Prompt 提示詞

                        </>

                      )}

                    </button>



                    <div className="text-[11px] p-3 rounded-xl leading-relaxed bg-[#0f1117] border border-slate-800 text-slate-400 space-y-1">

                      <div className="text-slate-300 font-semibold flex items-center gap-1.5">

                        <Sparkles size={13} className="text-amber-400" /> 接下來的操作步驟：

                      </div>

                      <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[10px]">

                        <li>複製 Prompt，前往 Midjourney 貼上生成 4×3 綠幕大圖。</li>

                        <li>生圖滿意後下載圖片。</li>

                        <li>切換至頂部「第二步：切圖去背」頁籤，拖入圖片一鍵完成！</li>

                      </ol>

                    </div>

                  </div>

                </div>

              </div>



            </div>



          </div>



          {/* 批次匯入 Modal */}

          {showBatchModal && (

            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

              <div className="bg-[#151926] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200 space-y-4">

                <div className="flex justify-between items-center border-b border-slate-800 pb-3">

                  <h3 className="text-base font-bold text-white flex items-center gap-2">

                    <FileUp size={18} className="text-indigo-400" />

                    批次文字快速貼上匯入

                  </h3>

                  <button

                    onClick={() => setShowBatchModal(false)}

                    className="text-slate-400 hover:text-white p-1"

                  >

                    <X size={18} />

                  </button>

                </div>



                <p className="text-xs text-slate-400 leading-relaxed">

                  請將您整理的文字直接貼在下方（支援逗號、空格、換行分隔）。系統會自動擷取前 12 個詞彙並填入貼圖格子中：

                </p>



                <textarea

                  value={batchInputText}

                  onChange={(e) => setBatchInputText(e.target.value)}

                  rows={6}

                  placeholder="早安&#10;收到&#10;謝謝&#10;辛苦了&#10;沒問題&#10;OK&#10;等等&#10;下班啦&#10;笑死&#10;我就爛&#10;加油&#10;明天見"

                  className="w-full bg-[#0f1117] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-500 font-mono"

                />



                <div className="flex justify-end gap-3 pt-2">

                  <button

                    onClick={() => setShowBatchModal(false)}

                    className="px-4 py-2 text-xs rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"

                  >

                    取消

                  </button>

                  <button

                    onClick={handleBatchImport}

                    className="px-5 py-2 text-xs rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/20"

                  >

                    確定匯入 12 格

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      );

    };



    // ==========================================

    // Part 2: Image Splitter Component (Flagship)

    

    // ==========================================
    const ImageSplitter = ({ mode, setMode }) => {
      const [originalImage, setOriginalImage] = useState(null);
      const [stickers, setStickers] = useState([]);
      
      // 去背核心參數
      const [enableSmartRemove, setEnableSmartRemove] = useState(true);
      const [cropScale, setCropScale] = useState(0);
      const [targetColor, setTargetColor] = useState('#00FF00');
      const [tolerance, setTolerance] = useState(30);
      const [smoothness, setSmoothness] = useState(2);
      const [despill, setDespill] = useState(true);
      const [protectWhite, setProtectWhite] = useState(true);
      const [useFloodFill, setUseFloodFill] = useState(true); // 外圍泛洪防穿孔核心
      const [safeMargin, setSafeMargin] = useState(true); // 🛡️ LINE 官方 10px 透明安全邊距保護

      // 圖片適配防止變形
      const [fitMode, setFitMode] = useState('cover'); // cover / contain / stretch
      const [sourceInfo, setSourceInfo] = useState(null);

      // 4 種預覽底色模式 & Lightbox
      const [previewBg, setPreviewBg] = useState('grid'); // 'grid' | 'white' | 'black' | 'line'
      const [lightboxImage, setLightboxImage] = useState(null);

      // 📱 LINE 手機聊天室真實模擬器
      const [showChatSimulator, setShowChatSimulator] = useState(false);
      const [chatTheme, setChatTheme] = useState('light'); // 'light' (LINE綠/藍) | 'dark'
      const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'other', type: 'text', content: '這組新貼圖是你畫的嗎？快傳幾張給我瞧瞧！😍', time: '10:24' }
      ]);

      // LINE 官方審核素材包 (main.png & tab.png)
      const [coverIndex, setCoverIndex] = useState(0);
      const [useLineNaming, setUseLineNaming] = useState(true); // 01.png ~ 24.png / 001.png ~ 040.png
      const [filePrefix, setFilePrefix] = useState('sticker');
      const [startNumber, setStartNumber] = useState('01');
      const [isZipping, setIsZipping] = useState(false);

      const appendInputRef = useRef(null);

      const CONFIG = useMemo(() => {
        if (mode === 'emoji') {
          return {
            id: 'emoji',
            label: 'LINE 表情貼 (Emoji)',
            totalW: 720,
            totalH: 540,
            cols: 4,
            rows: 3,
            cellW: 180,
            cellH: 180,
            desc: '180x180 px (官方標準)',
            uploadHint: '720x540 px (4x3 網格)'
          };
        }
        return {
          id: 'sticker',
          label: 'LINE 一般貼圖',
          totalW: 1480,
          totalH: 960,
          cols: 4,
          rows: 3,
          cellW: 370,
          cellH: 320,
          desc: '370x320 px (官方上限)',
          uploadHint: '1480x960 px (4x3 網格)'
        };
      }, [mode]);

      useEffect(() => {
        setFilePrefix(mode === 'emoji' ? 'emoji' : 'sticker');
      }, [mode]);

      // 內建純原生二進位 ZIP 打包器 (CRC32)，雙保險不依賴外網
      const crcTable = useMemo(() => {
        const table = new Uint32Array(256);
        for (let n = 0; n < 256; n++) {
          let c = n;
          for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
          table[n] = c >>> 0;
        }
        return table;
      }, []);

      const crc32 = (bytes) => {
        let c = 0xFFFFFFFF;
        for (let i = 0; i < bytes.length; i++) c = crcTable[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
        return (c ^ 0xFFFFFFFF) >>> 0;
      };

      const u16 = (n) => new Uint8Array([n & 255, (n >>> 8) & 255]);
      const u32 = (n) => new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
      const concatBytes = (parts) => {
        const len = parts.reduce((a, b) => a + b.length, 0);
        const out = new Uint8Array(len);
        let off = 0;
        parts.forEach(p => { out.set(p, off); off += p.length; });
        return out;
      };
      const base64ToBytes = (dataUrl) => {
        const bin = atob(dataUrl.split(',')[1]);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
      };

      const createStoredZip = (files) => {
        const enc = new TextEncoder();
        const locals = [], centrals = [];
        let offset = 0;
        files.forEach(({ name, bytes }) => {
          const nameBytes = enc.encode(name);
          const crc = crc32(bytes);
          const local = concatBytes([
            u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
            u32(crc), u32(bytes.length), u32(bytes.length), u16(nameBytes.length), u16(0), nameBytes, bytes
          ]);
          locals.push(local);
          const central = concatBytes([
            u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
            u32(crc), u32(bytes.length), u32(bytes.length), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBytes
          ]);
          centrals.push(central);
          offset += local.length;
        });
        const centralBytes = concatBytes(centrals);
        const end = concatBytes([
          u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
          u32(centralBytes.length), u32(offset), u16(0)
        ]);
        return new Blob([...locals, centralBytes, end], { type: 'application/zip' });
      };

      const formatNumber = (startStr, index) => {
        const num = parseInt(startStr, 10);
        if (isNaN(num)) return (1 + index).toString();
        const currentVal = num + index;
        return currentVal.toString().padStart(startStr.length, '0');
      };

      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 0, g: 255, b: 0 };
      };

      const drawFit = (ctx, img, targetW, targetH, mode) => {
        ctx.clearRect(0, 0, targetW, targetH);
        if (mode === 'stretch') {
          ctx.drawImage(img, 0, 0, targetW, targetH);
          return;
        }
        const scale = mode === 'contain'
          ? Math.min(targetW / img.width, targetH / img.height)
          : Math.max(targetW / img.width, targetH / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = (targetW - dw) / 2;
        const dy = (targetH - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      // 切圖函式 (支援傳入 batchId 與起點 index)
      const sliceImage = (img, currentConfig, fit = 'cover', batchId = 1, startId = 0) => {
        const canvas = document.createElement('canvas');
        canvas.width = currentConfig.totalW;
        canvas.height = currentConfig.totalH;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        drawFit(ctx, img, currentConfig.totalW, currentConfig.totalH, fit);

        const newStickers = [];
        for (let row = 0; row < currentConfig.rows; row++) {
          for (let col = 0; col < currentConfig.cols; col++) {
            const sx = col * currentConfig.cellW;
            const sy = row * currentConfig.cellH;
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = currentConfig.cellW;
            tempCanvas.height = currentConfig.cellH;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(ctx.getImageData(sx, sy, currentConfig.cellW, currentConfig.cellH), 0, 0);
            
            const idx = startId + (row * currentConfig.cols + col);
            newStickers.push({
              id: idx,
              batch: batchId,
              selected: true,
              sourceCanvas: tempCanvas,
              processedUrl: tempCanvas.toDataURL('image/png')
            });
          }
        }
        return newStickers;
      };

      const loadImageFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
          alert('請選擇 PNG、JPG 或 WEBP 圖片檔案。');
          return;
        }
        if (file.size > 30 * 1024 * 1024) {
          alert('圖片檔案超過 30MB，建議稍微壓縮後再上傳。');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const expected = CONFIG.totalW / CONFIG.totalH;
            const actual = img.width / img.height;
            const ratioDiff = Math.abs(actual - expected) / expected;
            setSourceInfo({ width: img.width, height: img.height, ratioDiff });
            setOriginalImage(img);
            setStickers(sliceImage(img, CONFIG, fitMode, 1, 0));
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      };

      // 🌟 追加第 2 批網格大圖 (湊成 24 張)
      const handleAppendImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const batch2Stickers = sliceImage(img, CONFIG, fitMode, 2, 12);
            // 處理 batch2 去背
            const processedBatch2 = batch2Stickers.map(s => ({
              ...s,
              processedUrl: processStickerData(s.sourceCanvas)
            }));
            setStickers(prev => [...prev.slice(0, 12), ...processedBatch2]);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
      };

      // 移除第 2 批 (回退為 12 張)
      const handleRemoveBatch2 = () => {
        setStickers(prev => prev.slice(0, 12));
      };

      // 快速勾選控制
      const handleSelectFirst8 = () => {
        setStickers(prev => prev.map((s, i) => ({
          ...s,
          selected: i < 8
        })));
      };

      const handleSelectAll = () => {
        setStickers(prev => prev.map(s => ({ ...s, selected: true })));
      };

      const handleToggleSelect = (index) => {
        setStickers(prev => prev.map((s, i) => i === index ? { ...s, selected: !s.selected } : s));
      };

      const handleImageUpload = (e) => {
        loadImageFile(e.target.files?.[0]);
        e.target.value = '';
      };

      useEffect(() => {
        if (!originalImage) return;
        setStickers(prev => {
          if (prev.length > 12) {
            return sliceImage(originalImage, CONFIG, fitMode, 1, 0); // 若更改適配方式重置回第一批
          }
          return sliceImage(originalImage, CONFIG, fitMode, 1, 0);
        });
      }, [fitMode]);

      // 🛡️ 核心去背演算法：外圍泛洪防穿孔 (Flood Fill) + 10px 安全邊距保護
      const processStickerData = useCallback((sourceCanvas) => {
        if (!enableSmartRemove) return sourceCanvas.toDataURL('image/png');

        const w = CONFIG.cellW;
        const h = CONFIG.cellH;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // 計算 10px 安全留白縮放 (Safe Margin: 留 10px 透明外邊)
        let marginScale = 1.0;
        if (safeMargin) {
          marginScale = Math.min((w - 20) / w, (h - 20) / h);
        }

        const scale = (1 + (cropScale / 100 * 0.2)) * marginScale;
        const dw = w * scale;
        const dh = h * scale;
        const dx = (w - dw) / 2;
        const dy = (h - dh) / 2;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(sourceCanvas, dx, dy, dw, dh);

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const totalPixels = w * h;

        const target = hexToRgb(targetColor);
        const tolDist = tolerance * 4.41;
        const tolDistSq = tolDist * tolDist;
        const featherDist = Math.max(1, smoothness * 5);
        const outerDist = tolDist + featherDist;
        const outerDistSq = outerDist * outerDist;

        // 判定單個像素是否符合背景色
        const isColorMatch = (idx) => {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          if (protectWhite) {
            const minChannel = Math.min(r, g, b);
            const maxChannel = Math.max(r, g, b);
            if (minChannel > 215 && (maxChannel - minChannel) < 30) {
              return 0; // 保護白色邊框
            }
          }

          const dr = r - target.r;
          const dg = g - target.g;
          const db = b - target.b;
          const distSq = dr * dr + dg * dg + db * db;

          if (distSq < tolDistSq) return 1;
          if (distSq < outerDistSq) {
            const dist = Math.sqrt(distSq);
            return 1 - ((dist - tolDist) / featherDist);
          }
          return 0;
        };

        if (useFloodFill) {
          // 🛡️ 外圍泛洪防穿孔模式
          const visited = new Uint8Array(totalPixels);
          const queue = new Int32Array(totalPixels);
          let head = 0;
          let tail = 0;

          // 將四周邊界符合背景色的像素加入佇列
          for (let x = 0; x < w; x++) {
            const topIdx = x;
            if (!visited[topIdx] && isColorMatch(topIdx * 4) > 0) {
              visited[topIdx] = 1;
              queue[tail++] = topIdx;
            }
            const btmIdx = (h - 1) * w + x;
            if (!visited[btmIdx] && isColorMatch(btmIdx * 4) > 0) {
              visited[btmIdx] = 1;
              queue[tail++] = btmIdx;
            }
          }

          for (let y = 0; y < h; y++) {
            const leftIdx = y * w;
            if (!visited[leftIdx] && isColorMatch(leftIdx * 4) > 0) {
              visited[leftIdx] = 1;
              queue[tail++] = leftIdx;
            }
            const rightIdx = y * w + (w - 1);
            if (!visited[rightIdx] && isColorMatch(rightIdx * 4) > 0) {
              visited[rightIdx] = 1;
              queue[tail++] = rightIdx;
            }
          }

          // BFS 泛洪擴散
          while (head < tail) {
            const curr = queue[head++];
            const cx = curr % w;
            const cy = Math.floor(curr / w);

            const neighbors = [
              cx > 0 ? curr - 1 : -1,
              cx < w - 1 ? curr + 1 : -1,
              cy > 0 ? curr - w : -1,
              cy < h - 1 ? curr + w : -1
            ];

            for (let i = 0; i < 4; i++) {
              const n = neighbors[i];
              if (n !== -1 && !visited[n]) {
                const matchVal = isColorMatch(n * 4);
                if (matchVal > 0) {
                  visited[n] = 1;
                  queue[tail++] = n;
                }
              }
            }
          }

          // 去除訪問到的外圍背景，角色內部絕對安全
          for (let p = 0; p < totalPixels; p++) {
            const idx = p * 4;
            if (visited[p]) {
              const matchVal = isColorMatch(idx);
              if (matchVal >= 1) {
                data[idx + 3] = 0;
              } else {
                data[idx + 3] = Math.round(data[idx + 3] * (1 - matchVal));
              }
            } else if (despill && data[idx + 3] > 0) {
              const r = data[idx], g = data[idx + 1], b = data[idx + 2];
              if (target.g > target.r && target.g > target.b) {
                const maxRB = Math.max(r, b);
                if (g > maxRB) data[idx + 1] = maxRB;
              }
            }
          }

        } else {
          // 全圖容差去背
          for (let i = 0; i < data.length; i += 4) {
            const matchVal = isColorMatch(i);
            if (matchVal >= 1) {
              data[i + 3] = 0;
            } else if (matchVal > 0) {
              data[i + 3] = Math.round(data[i + 3] * (1 - matchVal));
            }

            if (despill && data[i + 3] > 0) {
              const r = data[i], g = data[i + 1], b = data[i + 2];
              if (target.g > target.r && target.g > target.b) {
                const maxRB = Math.max(r, b);
                if (g > maxRB) data[idx + 1] = maxRB;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        return canvas.toDataURL('image/png');
      }, [enableSmartRemove, cropScale, targetColor, tolerance, smoothness, despill, protectWhite, useFloodFill, safeMargin, CONFIG]);

      // 防抖即時更新
      useEffect(() => {
        if (!originalImage || stickers.length === 0) return;

        const timer = setTimeout(() => {
          setStickers(prev => prev.map(s => ({
            ...s,
            processedUrl: processStickerData(s.sourceCanvas)
          })));
        }, 180);

        return () => clearTimeout(timer);
      }, [processStickerData, originalImage]);

      // 單張下載
      const handleDownloadSingle = (dataUrl, index) => {
        const fileName = useLineNaming 
          ? (mode === 'emoji' ? `${String(index + 1).padStart(3, '0')}.png` : `${String(index + 1).padStart(2, '0')}.png`)
          : `${filePrefix}_${formatNumber(startNumber, index)}.png`;
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      // 產生等比例居中畫布輔助函式
      const createResizedCanvasData = (sourceUrl, targetW, targetH) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const scale = Math.min(targetW / img.width, targetH / img.height);
            const dw = img.width * scale;
            const dh = img.height * scale;
            const dx = (targetW - dw) / 2;
            const dy = (targetH - dh) / 2;

            ctx.drawImage(img, dx, dy, dw, dh);
            resolve(canvas.toDataURL('image/png'));
          };
          img.src = sourceUrl;
        });
      };

      // 📱 傳送貼圖至模擬聊天室
      const sendStickerToChat = (stickerUrl) => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setChatMessages(prev => [
          ...prev,
          { id: Date.now(), sender: 'me', type: 'sticker', content: stickerUrl, time: timeStr }
        ]);
        setShowChatSimulator(true);
      };

      // 計算勾選項目
      const selectedStickers = useMemo(() => stickers.filter(s => s.selected), [stickers]);
      const selectedCount = selectedStickers.length;

      // 判斷官方規格吻合度
      const isOfficialValid = useMemo(() => {
        if (mode === 'emoji') {
          return selectedCount >= 8 && selectedCount <= 40;
        }
        return [8, 16, 24, 32, 40].includes(selectedCount);
      }, [mode, selectedCount]);

      // 📦 官方規格智慧打包 ZIP
      const handleBatchDownload = async () => {
        if (!selectedStickers.length) {
          alert('請至少勾選 1 張貼圖進行打包！');
          return;
        }
        setIsZipping(true);

        try {
          const isEmoji = mode === 'emoji';
          const targetCoverSticker = stickers[coverIndex] || selectedStickers[0];
          const tabDataUrl = await createResizedCanvasData(targetCoverSticker.processedUrl, 96, 74);
          const mainDataUrl = isEmoji ? null : await createResizedCanvasData(targetCoverSticker.processedUrl, 240, 240);

          // 命名資料夾
          let packFolderName = '';
          if (isEmoji) {
            packFolderName = `line_emoji_${selectedCount}pack`;
          } else {
            if (isOfficialValid) {
              packFolderName = `line_sticker_official_${selectedCount}pack`;
            } else {
              packFolderName = `line_sticker_workpack_${selectedCount}`;
            }
          }

          const getOutputName = (idx) => {
            if (!useLineNaming) return `${filePrefix}_${formatNumber(startNumber, idx)}.png`;
            return isEmoji
              ? `${String(idx + 1).padStart(3, '0')}.png`
              : `${String(idx + 1).padStart(2, '0')}.png`;
          };

          if (window.JSZip) {
            const zip = new window.JSZip();
            const folder = zip.folder(packFolderName);

            selectedStickers.forEach((sticker, idx) => {
              folder.file(getOutputName(idx), sticker.processedUrl.split(',')[1], { base64: true });
            });

            if (!isEmoji && mainDataUrl) folder.file('main.png', mainDataUrl.split(',')[1], { base64: true });
            folder.file('tab.png', tabDataUrl.split(',')[1], { base64: true });

            const content = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${packFolderName}_v3.4.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          } else {
            const files = [];
            selectedStickers.forEach((sticker, idx) => {
              files.push({ name: getOutputName(idx), bytes: base64ToBytes(sticker.processedUrl) });
            });
            if (!isEmoji && mainDataUrl) files.push({ name: 'main.png', bytes: base64ToBytes(mainDataUrl) });
            files.push({ name: 'tab.png', bytes: base64ToBytes(tabDataUrl) });

            const blob = createStoredZip(files);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${packFolderName}_v3.4.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }
        } catch (err) {
          console.error("ZIP packaging error", err);
          alert("ZIP 打包失敗，請嘗試單張下載。");
        } finally {
          setIsZipping(false);
        }
      };

      // 顏色吸管
      const pickColorFromSticker = (e, sticker) => {
        if (!sticker) return;
        const rect = e.target.getBoundingClientRect();
        const x = Math.min(CONFIG.cellW - 1, Math.max(0, Math.floor((e.clientX - rect.left) / rect.width * CONFIG.cellW)));
        const y = Math.min(CONFIG.cellH - 1, Math.max(0, Math.floor((e.clientY - rect.top) / rect.height * CONFIG.cellH)));

        const ctx = sticker.sourceCanvas.getContext('2d');
        const p = ctx.getImageData(x, y, 1, 1).data;
        const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1).toUpperCase();
        setTargetColor(hex);
      };

      return (
        <div className="w-full min-h-screen bg-[#0b0c15] p-4 md:p-8 font-sans text-slate-200">
          <div className="max-w-[1440px] mx-auto space-y-6">

            {/* Header */}
            <div className="bg-[#151926] rounded-2xl shadow-xl p-6 border border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r opacity-70 ${mode === 'emoji' ? 'from-orange-500 to-amber-500' : 'from-indigo-500 to-purple-500'}`}></div>

              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl text-white shadow-lg ${mode === 'emoji' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}>
                  {mode === 'emoji' ? <Smile size={24} /> : <Scissors size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-black text-white tracking-tight">
                      Sticker Splitter <span className={mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}>Pro Creator</span>
                    </h1>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      v3.6 情境旗艦版
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-400" />
                    官方 8 / 24 張送審拼裝 • 手機真實聊天室模擬 • 10px 安全邊距防退件 • 泛洪防穿孔
                  </p>
                </div>
              </div>

              {/* 右側操作按鈕群 */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* 📱 手機聊天室模擬器按鈕 */}
                <button
                  onClick={() => setShowChatSimulator(!showChatSimulator)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                    showChatSimulator
                      ? 'bg-emerald-500 text-slate-900 shadow-emerald-500/30'
                      : 'bg-[#1e2336] text-slate-300 hover:text-white border border-slate-700 hover:border-emerald-500/50'
                  }`}
                >
                  <Smartphone size={14} className="text-emerald-400" />
                  LINE 聊天室模擬器
                </button>

                {/* 模式切換 */}
                <div className="bg-[#0f1117] p-1 rounded-xl border border-slate-700/80 flex">
                  <button
                    onClick={() => { setMode('sticker'); setStickers([]); setOriginalImage(null); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      mode === 'sticker' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Sticker size={13} /> 貼圖
                  </button>
                  <button
                    onClick={() => { setMode('emoji'); setStickers([]); setOriginalImage(null); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      mode === 'emoji' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Smile size={13} /> 表情貼
                  </button>
                </div>

                {stickers.length > 0 && (
                  <button
                    onClick={() => { setStickers([]); setOriginalImage(null); }}
                    className="flex items-center gap-1 px-3 py-2 text-slate-300 bg-[#1e2336] hover:bg-[#252b42] border border-slate-700 rounded-xl text-xs font-medium transition"
                  >
                    <RefreshCw size={13} /> 重設
                  </button>
                )}
              </div>
            </div>

            {/* 工作區 */}
            {stickers.length > 0 ? (
              <div className="grid lg:grid-cols-12 gap-6">

                {/* 左側：去背與匯出設定 (4 cols) */}
                <div className="lg:col-span-4 space-y-6">

                  {/* 官方張數拼裝工具箱 (Official Pack Assembler) */}
                  <div className="bg-[#151926] rounded-2xl shadow-xl border border-slate-800/80 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Crown size={16} className="text-amber-400" />
                        <h2 className="font-bold text-sm text-slate-200">官方張數拼裝器</h2>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        目前已勾選：<strong className="text-emerald-400">{selectedCount}</strong> / {stickers.length} 張
                      </span>
                    </div>

                    {/* 狀態診斷 Banner */}
                    {mode === 'sticker' && (
                      <div className={`p-3 rounded-xl text-xs leading-relaxed border ${
                        isOfficialValid
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}>
                        {selectedCount === 8 && (
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            ✓ 符合 LINE 官方「8 張正式送審包」規定！
                          </div>
                        )}
                        {selectedCount === 24 && (
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 size={14} className="text-emerald-400" />
                            🎉 恭喜！完全符合 LINE 官方熱門「24 張正式送審包」！
                          </div>
                        )}
                        {selectedCount === 12 && (
                          <div>
                            ⚠️ <strong>目前為 12 張工作包</strong>（不可直接送審）。
                            <div className="mt-1 text-[10px] text-slate-400">
                              推薦操作：點擊下方「一鍵精選前 8 張」，或點擊「+ 追加第 2 批網格圖」湊成 24 張送審包！
                            </div>
                          </div>
                        )}
                        {![8, 12, 24].includes(selectedCount) && (
                          <div>
                            目前選取 {selectedCount} 張。LINE 官方一般貼圖規定張數為：<strong>8 / 16 / 24 / 32 / 40 張</strong>。
                          </div>
                        )}
                      </div>
                    )}

                    {mode === 'emoji' && (
                      <div className="p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        ✓ 表情貼模式：選取 {selectedCount} 張（官方允許 8~40 張任意數量，符合送審規格）。
                      </div>
                    )}

                    {/* 快捷按鈕組 */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleSelectFirst8}
                        className="py-2 px-3 rounded-xl bg-[#0f1117] hover:bg-[#1a2030] border border-slate-700/80 hover:border-emerald-500/40 text-xs font-bold text-slate-300 hover:text-emerald-400 transition text-center"
                      >
                        ★ 一鍵精選前 8 張
                      </button>
                      <button
                        onClick={handleSelectAll}
                        className="py-2 px-3 rounded-xl bg-[#0f1117] hover:bg-[#1a2030] border border-slate-700/80 hover:border-indigo-500/40 text-xs font-bold text-slate-300 hover:text-indigo-400 transition text-center"
                      >
                        ✓ 全選所有貼圖
                      </button>
                    </div>

                    {/* 追加第 2 批 (湊 24 張) */}
                    <div className="pt-2">
                      {stickers.length === 12 ? (
                        <div>
                          <input
                            type="file"
                            ref={appendInputRef}
                            accept="image/*"
                            onChange={handleAppendImageUpload}
                            className="hidden"
                          />
                          <button
                            onClick={() => appendInputRef.current?.click()}
                            className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/50 hover:to-purple-600/50 border border-indigo-500/40 rounded-xl text-xs font-bold text-indigo-300 flex items-center justify-center gap-2 transition"
                          >
                            <Plus size={14} /> + 追加第 2 批網格圖 (湊 24 張黃金送審包)
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0f1117] border border-slate-800 text-xs">
                          <span className="text-slate-400">已成功追加第 2 批 (共 24 張)</span>
                          <button
                            onClick={handleRemoveBatch2}
                            className="text-[10px] text-rose-400 hover:text-rose-300 underline"
                          >
                            移除第 2 批
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 去背參數面板 */}
                  <div className="bg-[#151926] rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1a2030]">
                      <h2 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                        <Settings size={16} className="text-indigo-400" />
                        智慧去背與防穿孔參數
                      </h2>
                      <div
                        className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                          enableSmartRemove ? 'bg-indigo-600' : 'bg-slate-700'
                        }`}
                        onClick={() => setEnableSmartRemove(!enableSmartRemove)}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                          enableSmartRemove ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </div>

                    {enableSmartRemove && (
                      <div className="p-5 space-y-5 text-xs">

                        {/* 🛡️ 10px 透明安全邊距防退件開關 */}
                        <div className="bg-emerald-950/20 border border-emerald-500/30 p-3.5 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                              <ShieldAlert size={14} className="text-emerald-400" />
                              LINE 官方 10px 安全透明留白
                            </span>
                            <input
                              type="checkbox"
                              checked={safeMargin}
                              onChange={(e) => setSafeMargin(e.target.checked)}
                              className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-slate-900"
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            自動為每張貼圖外圍預留 10px 透明邊距，防止角色或文字貼齊畫布邊緣遭官方審核退件！
                          </p>
                        </div>

                        {/* 圖片適配防變形 */}
                        <div className="bg-[#0f1117] p-3.5 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-medium flex items-center gap-1">
                              <Layers size={13} className="text-indigo-400" /> 圖片適配方式
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono">Cover 等比填滿</span>
                          </div>
                          <select
                            value={fitMode}
                            onChange={(e) => setFitMode(e.target.value)}
                            className="w-full bg-[#151926] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                          >
                            <option value="cover">等比例填滿 Cover（角色完全不變形）</option>
                            <option value="contain">完整顯示 Contain（可能四周留白）</option>
                            <option value="stretch">強制拉伸 Stretch（舊版拉伸）</option>
                          </select>
                        </div>

                        {/* 外圍泛洪防穿孔開關 */}
                        <div className="bg-indigo-950/30 border border-indigo-500/30 p-3.5 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
                              <ShieldAlert size={14} className="text-indigo-400" />
                              外圍泛洪防穿孔 (Flood Fill)
                            </div>
                            <div
                              className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${
                                useFloodFill ? 'bg-indigo-600' : 'bg-slate-700'
                              }`}
                              onClick={() => setUseFloodFill(!useFloodFill)}
                            >
                              <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                                useFloodFill ? 'translate-x-4' : 'translate-x-0'
                              }`}></div>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            僅自外圍邊界蔓延去背，角色身上的綠眼、綠衣與配件 100% 不破洞！
                          </p>
                        </div>

                        {/* 去背色選擇 */}
                        <div className="bg-[#0f1117] p-3.5 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 font-medium">目標去背顏色</span>
                            <span className="font-mono text-slate-400">{targetColor}</span>
                          </div>
                          <div className="flex gap-2.5 items-center">
                            <div className="relative flex-1 h-8 rounded-lg overflow-hidden border border-slate-700">
                              <input
                                type="color"
                                value={targetColor}
                                onChange={(e) => setTargetColor(e.target.value)}
                                className="absolute -top-2 -left-2 w-[150%] h-[150%] cursor-pointer bg-transparent"
                              />
                            </div>
                            <button
                              onClick={() => setTargetColor('#00FF00')}
                              className="px-2.5 py-1.5 bg-[#151926] hover:bg-[#1e2336] border border-slate-700 rounded-lg text-[10px] text-slate-300 transition"
                            >
                              重設純綠
                            </button>
                          </div>
                        </div>

                        {/* 容差與柔化 */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-slate-400">
                              <span>色彩容許度 (Tolerance)</span>
                              <span className="font-mono text-indigo-400">{tolerance}</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="100"
                              value={tolerance}
                              onChange={(e) => setTolerance(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-slate-400">
                              <span>邊緣柔化 (Feathering)</span>
                              <span className="font-mono text-indigo-400">{smoothness}</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="20"
                              value={smoothness}
                              onChange={(e) => setSmoothness(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between mb-1 text-slate-400">
                              <span>微幅邊界裁切 (Trim Border)</span>
                              <span className="font-mono text-indigo-400">{cropScale}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="50"
                              value={cropScale}
                              onChange={(e) => setCropScale(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                          </div>
                        </div>

                        {/* 保護白邊與溢色去除 */}
                        <div className="pt-3 border-t border-slate-800 space-y-3">
                          <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-slate-300 font-medium">保護角色/文字白色外框</span>
                            <input
                              type="checkbox"
                              checked={protectWhite}
                              onChange={(e) => setProtectWhite(e.target.checked)}
                              className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 bg-slate-900"
                            />
                          </label>

                          <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-slate-300 font-medium">消除綠色溢色反光 (Despill)</span>
                            <input
                              type="checkbox"
                              checked={despill}
                              onChange={(e) => setDespill(e.target.checked)}
                              className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 bg-slate-900"
                            />
                          </label>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* 匯出設定面板 */}
                  <div className="bg-[#151926] rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden p-5 space-y-4 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h3 className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Package size={15} className="text-indigo-400" />
                        LINE 送審打包設定
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        isOfficialValid
                          ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                          : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                      }`}>
                        {isOfficialValid ? '✓ 官方送審包' : '⚠️ 工作包'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-[#0f1117] border border-slate-800 cursor-pointer">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200">採用 LINE 官方標準編號</span>
                          <span className="text-[10px] text-slate-500">
                            {mode === 'emoji' ? '001.png 起 (三位數)' : '01.png 起 (兩位數)'}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={useLineNaming}
                          onChange={(e) => setUseLineNaming(e.target.checked)}
                          className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 w-4 h-4 bg-slate-900"
                        />
                      </label>

                      <div className="bg-[#0f1117] p-3 rounded-xl border border-slate-800 space-y-1 text-[11px] text-slate-400">
                        <div className="text-slate-300 font-semibold flex items-center gap-1">
                          <Crown size={12} className="text-amber-400" />
                          封面指定（目前封面：第 {coverIndex + 1} 格）：
                        </div>
                        <ul className="list-disc list-inside text-[10px] text-emerald-400/90 font-mono pt-1">
                          {mode === 'sticker' && <li>main.png (240 × 240 px 封面)</li>}
                          <li>tab.png (96 × 74 px 聊天室標籤)</li>
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={handleBatchDownload}
                      disabled={isZipping}
                      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-indigo-900/30 transition transform active:scale-[0.99] disabled:opacity-50"
                    >
                      {isZipping ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          正在打包中...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          一鍵打包已選 {selectedCount} 張 (.ZIP)
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* 右側：12 / 24 格貼圖預覽區 (8 cols) */}
                <div className="lg:col-span-8 space-y-4">

                  {/* 頂部預覽底色切換工具列 */}
                  <div className="bg-[#151926] p-3 rounded-2xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">底色檢查：</span>
                      <div className="flex bg-[#0f1117] p-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => setPreviewBg('grid')}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                            previewBg === 'grid' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          🏁 棋盤格
                        </button>
                        <button
                          onClick={() => setPreviewBg('white')}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                            previewBg === 'white' ? 'bg-white text-slate-900 shadow font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          ⚪ 白底
                        </button>
                        <button
                          onClick={() => setPreviewBg('black')}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                            previewBg === 'black' ? 'bg-black text-white shadow' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          ⚫ 黑底
                        </button>
                        <button
                          onClick={() => setPreviewBg('line')}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                            previewBg === 'line' ? 'bg-[#00c300] text-white shadow font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          🟢 LINE 綠底
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <span>已選 <strong className="text-emerald-400">{selectedCount}</strong> / {stickers.length} 張</span>
                      <button
                        onClick={() => setShowChatSimulator(true)}
                        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition"
                      >
                        <Smartphone size={13} /> 打開聊天室預覽
                      </button>
                    </div>
                  </div>

                  {/* 貼圖卡片網格 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                    {stickers.map((sticker, index) => {
                      const isCover = coverIndex === index;
                      const fileName = useLineNaming 
                        ? (mode === 'emoji' ? `${String(index + 1).padStart(3, '0')}.png` : `${String(index + 1).padStart(2, '0')}.png`)
                        : `${filePrefix}_${formatNumber(startNumber, index)}.png`;

                      return (
                        <div
                          key={sticker.id}
                          className={`group relative bg-[#151926] rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 ${
                            sticker.selected 
                              ? (isCover ? 'border-amber-400 shadow-amber-400/20' : 'border-indigo-500/80') 
                              : 'border-slate-800 opacity-60'
                          }`}
                        >
                          {/* 頂部標籤列 */}
                          <div className="flex justify-between items-center p-2.5 bg-[#1a2030] border-b border-slate-800/80 text-[10px] font-semibold">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={sticker.selected}
                                onChange={() => handleToggleSelect(index)}
                                className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 bg-slate-900"
                              />
                              <span className="text-slate-400">#{index + 1}</span>
                            </label>

                            <div className="flex items-center gap-1.5">
                              {isCover && (
                                <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  ★ 封面
                                </span>
                              )}
                              <span className="font-mono text-indigo-300">{fileName}</span>
                            </div>
                          </div>

                          {/* 圖片展示區（動態背景） */}
                          <div
                            className={`relative w-full aspect-[${CONFIG.cellW}/${CONFIG.cellH}] flex items-center justify-center cursor-crosshair overflow-hidden ${
                              previewBg === 'white' 
                                ? 'bg-white' 
                                : (previewBg === 'black' 
                                    ? 'bg-black' 
                                    : (previewBg === 'line' 
                                        ? 'bg-[#00c300]' 
                                        : 'bg-[#090b10]'))
                            }`}
                            style={{ aspectRatio: `${CONFIG.cellW}/${CONFIG.cellH}` }}
                            title="點擊吸取顏色；右上角可設封面、放大或傳入聊天室"
                          >
                            {/* 棋盤格圖層 */}
                            {previewBg === 'grid' && (
                              <div
                                className="absolute inset-0 opacity-15 pointer-events-none"
                                style={{
                                  backgroundImage: 'linear-gradient(45deg, #666 25%, transparent 25%), linear-gradient(-45deg, #666 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(-45deg, transparent 75%, #666 75%)',
                                  backgroundSize: '16px 16px',
                                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                                }}
                              />
                            )}

                            <img
                              src={sticker.processedUrl}
                              onClick={(e) => pickColorFromSticker(e, sticker)}
                              className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                              alt={`Sticker ${index + 1}`}
                            />

                            {/* 懸浮工具列 */}
                            <div className="absolute top-2 right-2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => sendStickerToChat(sticker.processedUrl)}
                                title="傳送至手機聊天室模擬"
                                className="p-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg backdrop-blur transition"
                              >
                                <Smartphone size={13} />
                              </button>
                              <button
                                onClick={() => setCoverIndex(index)}
                                title="設為封面圖 (main.png & tab.png)"
                                className="p-1.5 bg-black/70 hover:bg-amber-500 text-white rounded-lg backdrop-blur transition"
                              >
                                <Crown size={13} />
                              </button>
                              <button
                                onClick={() => setLightboxImage(sticker.processedUrl)}
                                title="高清放大檢視"
                                className="p-1.5 bg-black/70 hover:bg-indigo-600 text-white rounded-lg backdrop-blur transition"
                              >
                                <ZoomIn size={13} />
                              </button>
                            </div>
                          </div>

                          {/* 底部操作 */}
                          <div className="p-2 bg-[#151926] border-t border-slate-800 flex justify-between items-center gap-1.5">
                            <button
                              onClick={() => sendStickerToChat(sticker.processedUrl)}
                              className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded-lg transition font-medium"
                            >
                              <Send size={10} /> 傳送測試
                            </button>
                            <button
                              onClick={() => handleDownloadSingle(sticker.processedUrl, index)}
                              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg text-[10px] font-medium transition"
                            >
                              <Download size={10} /> 下載
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            ) : (
              /* 上傳引導區域 */
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); loadImageFile(e.dataTransfer.files?.[0]); }}
                className="relative border-2 border-dashed border-slate-700/80 rounded-3xl p-12 md:p-24 text-center bg-[#151926]/40 flex flex-col items-center justify-center min-h-[560px] group transition-all hover:border-indigo-500/50"
              >
                <div className="w-24 h-24 bg-[#1e2336] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl border border-slate-700">
                  <Scissors className="w-10 h-10 text-indigo-400" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  上傳您的 <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">{CONFIG.label}</span> 網格大圖
                </h3>

                <p className="text-slate-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                  建議規格：<span className="text-slate-200 font-mono bg-slate-800 px-2 py-0.5 rounded">{CONFIG.uploadHint}</span>
                  <br />
                  單格自動裁切為 <span className="text-indigo-400 font-bold">{CONFIG.cellW} × {CONFIG.cellH} px</span>（等比填滿、防角色變形、預留 10px 安全邊距）
                </p>

                <label className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl cursor-pointer transition shadow-xl shadow-indigo-900/30 font-bold text-base hover:-translate-y-0.5">
                  <Upload size={20} />
                  <span>選擇圖片上傳</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <p className="mt-4 text-xs text-slate-500">
                  支援 PNG、JPG、WEBP 格式；亦可直接將圖片拖曳至此區域
                </p>
              </div>
            )}

          </div>

          {/* 📱 LINE 聊天室真實模擬器 Modal */}
          {showChatSimulator && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="relative w-full max-w-sm rounded-[40px] border-4 border-slate-700 bg-black shadow-2xl overflow-hidden flex flex-col h-[700px] max-h-[92vh] animate-in fade-in zoom-in duration-200">
                
                {/* 手機頂部瀏海 / 動態島 */}
                <div className="bg-black text-white pt-3 pb-1 px-6 flex justify-between items-center text-[11px] font-mono z-30 select-none">
                  <span>9:41</span>
                  <div className="w-20 h-4 bg-slate-900 rounded-full"></div>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <div className="w-5 h-2.5 border border-white rounded-sm p-0.5"><div className="h-full bg-white w-full rounded-2xs"></div></div>
                  </div>
                </div>

                {/* LINE 聊天室導覽列 */}
                <div className={`px-4 py-2.5 flex items-center justify-between border-b transition-colors z-20 ${
                  chatTheme === 'light' ? 'bg-[#8cabd9] text-white border-blue-300/40' : 'bg-[#1e1e1e] text-slate-200 border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setShowChatSimulator(false)} className="p-1 hover:opacity-80">
                      ❮
                    </button>
                    <div>
                      <h4 className="font-bold text-xs leading-none">LINE 好友</h4>
                      <span className="text-[9px] opacity-75">聊天室模擬</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => setChatTheme(chatTheme === 'light' ? 'dark' : 'light')}
                      className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 hover:bg-black/40 text-white font-medium transition"
                    >
                      {chatTheme === 'light' ? '🌙 暗黑模式' : '☀️ 經典主題'}
                    </button>
                    <button
                      onClick={() => setChatMessages([])}
                      title="清空對話"
                      className="p-1 hover:opacity-80"
                    >
                      <Trash2 size={13} />
                    </button>
                    <button
                      onClick={() => setShowChatSimulator(false)}
                      className="p-1 hover:opacity-80"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                {/* 聊天室訊息流 */}
                <div className={`flex-grow p-4 overflow-y-auto space-y-3 font-sans transition-colors ${
                  chatTheme === 'light' ? 'bg-[#8cabd9]' : 'bg-[#121212]'
                }`}>
                  {chatMessages.length === 0 && (
                    <div className="text-center py-10 text-xs opacity-60 text-white">
                      點選下方貼圖傳送至聊天室測試效果！
                    </div>
                  )}

                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} items-end gap-1.5`}>
                      {msg.sender === 'me' && (
                        <div className="flex flex-col items-end text-[9px] text-white/80 pb-0.5 font-mono">
                          <span className="text-emerald-300">已讀</span>
                          <span>{msg.time}</span>
                        </div>
                      )}

                      {msg.type === 'text' ? (
                        <div className={`max-w-[70%] p-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          msg.sender === 'me'
                            ? 'bg-[#00c300] text-white rounded-br-xs'
                            : (chatTheme === 'light' ? 'bg-white text-slate-900 rounded-bl-xs' : 'bg-[#2a2a2a] text-white rounded-bl-xs')
                        }`}>
                          {msg.content}
                        </div>
                      ) : (
                        <div className="max-w-[160px] cursor-pointer hover:scale-105 transition-transform">
                          <img src={msg.content} className="w-full h-auto drop-shadow-md" alt="Sticker in chat" />
                        </div>
                      )}

                      {msg.sender === 'other' && (
                        <div className="text-[9px] text-white/80 pb-0.5 font-mono">
                          <span>{msg.time}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 底部貼圖選擇托盤 */}
                <div className="bg-[#1f222e] border-t border-slate-800 p-2 z-20 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center px-1 text-[10px] text-slate-400">
                    <span>點擊貼圖立即在聊天室中發送：</span>
                    <span className="text-emerald-400 font-mono">共 {stickers.length} 張</span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5">
                    {stickers.map((stk, i) => (
                      <button
                        key={stk.id}
                        onClick={() => sendStickerToChat(stk.processedUrl)}
                        className="flex-shrink-0 w-12 h-12 rounded-lg bg-black/40 border border-slate-700 hover:border-emerald-500 p-0.5 transition hover:scale-110"
                        title={`發送第 ${i + 1} 格`}
                      >
                        <img src={stk.processedUrl} className="w-full h-full object-contain" alt={`stk ${i}`} />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Lightbox 高清燈箱 Modal */}
          {lightboxImage && (
            <div
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            >
              <div className="relative max-w-2xl w-full bg-[#151926] p-4 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center">
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
                >
                  <X size={24} />
                </button>
                <div
                  className={`p-6 rounded-2xl w-full flex items-center justify-center ${
                    previewBg === 'white' ? 'bg-white' : (previewBg === 'black' ? 'bg-black' : (previewBg === 'line' ? 'bg-[#00c300]' : 'bg-[#090b10]'))
                  }`}
                >
                  <img src={lightboxImage} className="max-h-[70vh] object-contain" alt="Lightbox Preview" />
                </div>
                <p className="text-xs text-slate-400 mt-3">點選任意處關閉燈箱</p>
              </div>
            </div>
          )}
        </div>
      );
    };


    function App() {

      const [activeTab, setActiveTab] = useState('generator'); // 'generator' | 'splitter'

      const [globalMode, setGlobalMode] = useState('sticker'); // 'sticker' | 'emoji'



      return (

        <div className="flex flex-col min-h-screen font-sans bg-[#0b0c15]">

          {/* Top Navbar */}

          <nav className="sticky top-0 z-40 bg-[#151926]/95 backdrop-blur border-b border-slate-800 shadow-md">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="flex justify-between items-center h-16">

                <div className="flex items-center">

                  <div className="flex items-center gap-2.5 mr-8">

                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">

                      LS

                    </div>

                    <span className="text-xl font-black bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">

                      LINE Sticker Maker

                    </span>

                  </div>



                  <div className="hidden sm:flex space-x-2">

                    <button

                      onClick={() => setActiveTab('generator')}

                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${

                        activeTab === 'generator'

                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'

                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'

                      }`}

                    >

                      <Wand2 size={16} />

                      第一步：生成咒語

                    </button>

                    <button

                      onClick={() => setActiveTab('splitter')}

                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${

                        activeTab === 'splitter'

                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm'

                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'

                      }`}

                    >

                      <Scissors size={16} />

                      第二步：切圖去背

                    </button>

                  </div>

                </div>



                <div className="flex items-center gap-2.5">

                  <span className="text-xs font-bold text-slate-400 bg-[#0f1117] border border-slate-700/80 px-3 py-1 rounded-full flex items-center gap-1.5">

                    <Sparkles size={12} className="text-amber-400" />

                    v3.6 Scenario Pro

                  </span>

                </div>

              </div>

            </div>



            {/* Mobile Tab */}

            <div className="sm:hidden flex border-t border-slate-800 bg-[#151926]">

              <button

                onClick={() => setActiveTab('generator')}

                className={`flex-1 py-3 text-xs font-bold flex justify-center items-center gap-1.5 border-b-2 transition-colors ${

                  activeTab === 'generator' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-transparent text-slate-400'

                }`}

              >

                <Wand2 size={14} /> 1. 生成咒語

              </button>

              <button

                onClick={() => setActiveTab('splitter')}

                className={`flex-1 py-3 text-xs font-bold flex justify-center items-center gap-1.5 border-b-2 transition-colors ${

                  activeTab === 'splitter' ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-transparent text-slate-400'

                }`}

              >

                <Scissors size={14} /> 2. 切圖去背

              </button>

            </div>

          </nav>



          <main className="flex-grow">

            {activeTab === 'generator' ? (

              <PromptGenerator mode={globalMode} setMode={setGlobalMode} />

            ) : (

              <ImageSplitter mode={globalMode} setMode={setGlobalMode} />

            )}

          </main>

        </div>

      );

    }

export { PromptGenerator, ImageSplitter, App };
export default App;
