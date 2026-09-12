import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Copy, Check, LayoutGrid, Palette, Terminal, 
  Briefcase, Heart, MessageCircle, Sun, 
  Gift, Laugh, Shuffle, Type, ChevronDown,
  Smile, Hand, Star, Sticker,
  Upload, Download, RefreshCw, Scissors, Settings, 
  Layers, Droplet, Package, FileText, Hash, Sparkles, Wand2
} from 'lucide-react';

// ==========================================
// Part 1: Prompt Generator Component
// ==========================================
export const PromptGenerator = ({ mode, setMode }) => {
  const [styleType, setStyleType] = useState("Japanese Anime");
  const [language, setLanguage] = useState("台灣繁體中文");
  const [copied, setCopied] = useState(false);
  
  // 貼圖 (Sticker) 詞庫
  const stickerCategories = {
    daily: {
      id: 'daily',
      label: '日常生活',
      icon: <Sun size={14} />,
      pool: [
        "早安", "晚安", "午安", "謝謝", "不客氣", "對不起", "沒問題", "好的", "收到", "拜託", 
        "辛苦了", "OK", "等等", "哈囉", "再見", "路上小心", "好夢", "吃飽沒", "我也要", "走吧", 
        "沒關係", "恭喜", "好久不見", "生日快樂", "加油", "沒事", "真的嗎", "了解", "抱歉", "麻煩了", 
        "稍等", "出發", "回家", "睡覺", "起床", "餓了", "渴了", "好吃", "好玩", "開心", 
        "難過", "生氣", "累了", "休息", "忙碌", "有空嗎", "在哪", "到了", "快到了", "塞車", 
        "下雨", "好熱", "好冷", "穿暖點", "多喝水", "讚", "棒", "不錯", "可以", "不行", 
        "隨便", "都好", "看你", "約嗎", "幾點", "哪裡", "這裡", "那裡", "誰", "什麼", 
        "為什麼", "怎麼辦", "救命", "幫忙", "支援", "感謝", "感恩", "謝啦", "安安", "嗨", 
        "掰掰", "明天見", "下次約", "有事", "沒事啦", "別擔心", "放心", "保重", "確實", "原來如此", 
        "筆記", "也可以", "或者是", "然後", "但是", "因為", "所以", "哈哈", "嘿嘿", "嗯嗯"
      ]
    },
    work: {
      id: 'work',
      label: '上班社畜',
      icon: <Briefcase size={14} />,
      pool: [
        "收到", "辛苦了", "開會中", "趕工中", "加班中", "請過目", "報告", "麻煩了", "收到謝謝", "准奏", 
        "+1", "OK", "筆記", "處理中", "已送出", "求救", "我在忙", "馬上好", "修好了", "請確認", 
        "Approved", "請款", "出差中", "您好", "早", "晚點回", "稍後", "會有會議嗎", "請問", "謝謝老闆", 
        "好的沒問題", "了解", "收到了", "已讀", "沒問題", "好的", "馬上處理", "請示", "請批示", "簽核", 
        "歸檔", "附件", "轉寄", "副本", "密件", "會議室", "投影機", "簡報", "提案", "預算", 
        "報銷", "發票", "統編", "請假", "病假", "事假", "特休", "補休", "遲到", "早退", 
        "打卡", "下班", "周報", "月報", "季報", "年報", "績效", "KPI", "目標", "進度"
      ]
    },
    emotional: {
      id: 'emotional',
      label: '情緒/幹話',
      icon: <MessageCircle size={14} />,
      pool: [
        "笑死", "確？", "無言", "嚇死", "哭啊", "氣死", "好喔", "??", "!!", "恭喜", 
        "加油", "傻眼", "我就爛", "是在哈囉", "真的假的", "別鬧", "壓力山大", "暈倒", "眼神死", "發瘋", 
        "可憐", "羨慕", "太扯", "哈哈", "呵呵", "嘿嘿", "嘻嘻", "嗚嗚", "唉", "嘖", 
        "哼", "哇", "靠", "幹嘛", "煩", "討厭", "滾", "閉嘴", "安靜", "吵死", 
        "怕", "抖", "驚", "怒", "悲", "喜", "樂", "爽", "讚", "爛"
      ]
    },
    love: {
      id: 'love',
      label: '情侶/撒嬌',
      icon: <Heart size={14} />,
      pool: [
        "想你", "愛你", "抱抱", "親親", "晚安安", "餓了", "早點睡", "在幹嘛", "好棒", "哼", 
        "拜託啦", "對不起", "理我", "好想你", "啾咪", "愛心", "可以嗎", "不管", "最愛你", "鼻要", 
        "秀秀", "貼貼", "等你喔", "早安安", "寶貝", "老公", "老婆", "哈尼", "親愛的", "笨蛋", 
        "傻瓜", "豬頭", "壞蛋", "討厭鬼", "小可愛", "小寶貝", "抱緊處理", "蹭蹭", "摸頭", "牽手"
      ]
    },
    holiday: {
      id: 'holiday',
      label: '節日慶祝',
      icon: <Gift size={14} />,
      pool: [
        "新年快樂", "生日快樂", "聖誕快樂", "恭喜發財", "萬聖節", "情人節快樂", "母親節快樂", "父親節快樂", "端午安康", "中秋快樂", 
        "跨年囉", "Happy New Year", "Merry Xmas", "Happy Birthday", "恭喜恭喜", "大吉大利", "紅包拿來", "歲歲平安", "步步高升", "心想事成", 
        "乾杯", "慶祝", "派對", "好運旺旺", "年年有餘", "招財進寶", "開工大吉", "情人節", "七夕", "快樂", 
        "平安", "健康", "順利", "發大財", "賺大錢", "中大獎", "尾牙", "春酒", "圍爐", "團圓"
      ]
    },
    meme: {
      id: 'meme',
      label: '搞笑迷因',
      icon: <Laugh size={14} />,
      pool: [
        "從從容容", "連滾帶爬", "超派", "尊嘟假嘟", "破防了", "觸爛", "很躁", "這我", "暈船", "下船", 
        "純愛戰士", "戀愛腦", "I人", "E人", "笑爛", "要確欸", "急了", "紅溫", "貼臉開大", "優勢在我", 
        "半場開香檳", "頂爛", "真頂", "有料", "這把高端局", "菜雞", "大腿", "凱瑞", "搞心態", "心態炸裂", 
        "情勒", "眼神死", "躺平", "擺爛", "內捲", "社死", "C位", "乞丐超人", "友善時光", "主打一個"
      ]
    }
  };

  // 表情貼 (Emoji) 詞庫
  const emojiCategories = {
    faces: {
      id: 'faces',
      label: '表情特寫',
      icon: <Smile size={14} />,
      pool: [
        "大笑", "微笑", "眨眼", "飛吻", "愛心眼", "流口水", "大哭", "流淚", "驚訝", "尖叫",
        "生氣", "暴怒", "無言", "翻白眼", "想睡", "打哈欠", "生病", "戴口罩", "嘔吐", "暈倒",
        "墨鏡", "裝酷", "害羞", "臉紅", "疑惑", "思考", "流汗", "尷尬", "崩潰", "眼神死",
        "奸笑", "陰險", "崇拜", "星星眼", "發光", "天使", "惡魔", "豬頭", "狗頭", "貓臉",
        "OK表情", "No表情", "期待", "興奮", "滿足", "享受", "發呆", "放空", "石化", "黑線"
      ]
    },
    hands: {
      id: 'hands',
      label: '手勢動作',
      icon: <Hand size={14} />,
      pool: [
        "比讚", "倒讚", "OK", "愛心", "手指愛心", "勝利YA", "擊掌", "合十感謝", "拜託", "鼓掌",
        "握拳加油", "指人", "指上面", "指下面", "指左邊", "指右邊", "打招呼", "揮手", "敬禮", "握手",
        "禁止手勢", "安靜手勢", "肌肉展示", "擁抱", "摸頭", "捏臉", "戳臉", "遮臉", "遮眼", "遮耳"
      ]
    },
    work_tags: {
      id: 'work_tags',
      label: '工作/活動實用',
      icon: <Briefcase size={14} />,
      pool: [
        "開會", "休假", "加班", "出差", "值班", "請假", "OK", "收到", "確認", "待辦",
        "完成", "急件", "重要", "提醒", "注意", "公告", "活動", "聚餐", "報名", "截止",
        "集合", "出發", "遲到", "早退", "繳費", "免費", "優惠", "暫停", "取消", "延期"
      ]
    },
    symbols: {
      id: 'symbols',
      label: '裝飾符號',
      icon: <Star size={14} />,
      pool: [
        "大愛心", "破碎愛心", "閃亮", "星星", "音符", "驚嘆號", "問號", "睡覺Zzz", "生氣符號", "汗滴",
        "火", "爆炸", "燈泡", "錢袋", "便便", "幽靈", "骷髏", "蛋糕", "禮物", "花朵",
        "太陽", "月亮", "下雨", "閃電", "彩虹", "鑽石", "皇冠", "獎盃", "信封", "手機"
      ]
    }
  };

  const currentCategories = mode === 'sticker' ? stickerCategories : emojiCategories;
  const initialCategoryKey = mode === 'sticker' ? 'daily' : 'faces';

  const getRandomPhrases = (pool) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 12);
  };

  const [activeCategory, setActiveCategory] = useState(initialCategoryKey);
  const [phrases, setPhrases] = useState(() => currentCategories[initialCategoryKey].pool.slice(0, 12));

  useEffect(() => {
    const defaultCat = mode === 'sticker' ? 'daily' : 'faces';
    setActiveCategory(defaultCat);
    setPhrases(getRandomPhrases(mode === 'sticker' ? stickerCategories.daily.pool : emojiCategories.faces.pool));
  }, [mode]);

  const styleOptions = [
    { value: "Japanese Anime", label: "日系動漫風 (預設)", desc: "賽璐珞上色、線條清晰、動漫感" },
    { value: "Big Eyes Cel Shading", label: "大眼賽璐璐風", desc: "大眼、賽璐璐上色" },
    { value: "2D Flat Cute", label: "2D 平面可愛", desc: "可愛、活潑、2D平面" },
    { value: "Hand Drawn Watercolor", label: "手繪水彩風", desc: "柔和、水彩筆觸、手繪質感" },
    { value: "3D Chibi Pixar", label: "3D Q版皮克斯風", desc: "3D 渲染、Q版比例、高品質材質" },
    { value: "American Cartoon", label: "美式卡通風", desc: "粗線條、誇張變形、鮮豔色彩" },
    { value: "Retro Pixel Art", label: "復古像素風", desc: "8-bit, 像素藝術, 復古遊戲風格" },
  ];

  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    setPhrases(getRandomPhrases(currentCategories[catKey].pool));
  };

  const handleShuffleCurrent = () => {
    const pool = currentCategories[activeCategory]?.pool || [];
    setPhrases(getRandomPhrases(pool));
  };

  const generatePrompt = () => {
    const selectedStyle = styleOptions.find(s => s.value === styleType);
    const styleDesc = selectedStyle ? selectedStyle.desc : "賽璐珞上色、線條清晰、動漫感";
    const phraseString = phrases.join('、');
    
    if (mode === 'sticker') {
      return `✅ 12 格 LINE 貼圖 (Sticker)｜Prompt 建議
請參考上傳圖片中的角色，生成 一張包含 12 個不同動作的角色貼圖集。

[角色與風格設定]
角色一致性：必須完全維持原圖主角的髮型、服裝、五官與整體外觀特徵。
構圖風格：畫面僅包含「角色 + 文字」，不包含任何場景背景。
畫風設定：【${styleDesc}】。
貼紙風格（去背友善）：角色與文字外圍皆需加入 粗白色外框（Sticker Style）。背景統一為 #00FF00（純綠色），不可有雜點。

[畫面佈局與尺寸規格]
整體為 4 × 3 佈局，共 12 張貼圖。總尺寸：1480 × 960 px。
每張小圖約 370 × 320 px（自動等比縮放填滿排列）。每張貼圖四周預留約 0.2 cm Padding，避免畫面互相黏住。
鏡頭多樣化：全身 + 半身混合，必須包含正面、側面、俯角等不同視角。

[文字設計]
語言：【${language}】
文字內容：【${phraseString}】
字型風格：【可愛 Q 版字型，顏色鮮豔、易讀，多色彩混合，絕對禁止使用任何綠色（包含深綠、淺綠、螢光綠、藍綠）與黑色，因為會導致去背錯誤。請改用紅、藍、紫、橘、黃等高對比色彩。】
排版：文字大小約佔單張貼圖 1/3，文字可適度壓在衣服邊角等非重要區域，不能遮臉，不要使用emoji表情符號。

[表情與動作設計]
表情必須明顯、誇張、情緒豐富：【喜、怒、哀、樂、驚訝、無語、放空、大哭】
角色動作需與文字情境一致。
12 格皆須為 不同動作與不同表情。

[輸出格式]
一張大圖，內含 4 × 3 的 12 張貼圖。背景必須為 純綠色 #00FF00。每格角色 + 文字均附上粗白邊。
--ar 37:24 --v 6.0`;
    } else {
      return `✅ 12 格 LINE 表情貼 (Emoji)｜Prompt 建議
請參考上傳圖片中的角色，生成一張包含 12 個 LINE 表情貼的圖集。

[角色與風格設定]
角色一致性：維持原圖主角特徵，但將其轉化為「表情貼」風格。
Emoji 風格重點：
1. 【大頭特寫 + 上方文字】：構圖統一為「角色頭部在下方，文字在頭頂上方」。
2. 畫風設定：【${styleDesc}，線條必須更簡單、清晰，適合縮小觀看】。
3. 去背友善：每個表情(含文字)周圍需有 粗白色外框。背景統一為 #00FF00（純綠色）。

[畫面佈局]
整體為 4 × 3 佈局，共 12 個表情貼。
排列整齊，彼此不重疊。

[內容與文字設計]
文字內容：【${phraseString}】
文字位置：必須寫在角色的「頭頂上方」。
文字風格：黑色或深色粗體字，清晰易讀，不要遮擋到角色臉部。
動作表情：請根據文字含義繪製對應的角色表情（例如文字是「OK」則畫出OK的手勢或表情）。

[輸出格式]
一張大圖，內含 4 × 3 的 12 個表情貼。背景純綠色 #00FF00。
強調：文字清晰、大頭特寫、適合微縮顯示。
--ar 37:24 --v 6.0`;
    }
  };

  const handleCopy = async () => {
    const text = generatePrompt();
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (e) {
        success = false;
      }
    }
    if (!success) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      try {
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
      } catch (err) {
        success = false;
      }
      document.body.removeChild(textArea);
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      alert("複製失敗，請手動選取文字複製。");
    }
  };

  const handlePhraseChange = (index, value) => {
    const newPhrases = [...phrases];
    newPhrases[index] = value;
    setPhrases(newPhrases);
  };

  const currentPool = currentCategories[activeCategory]?.pool || [];

  return (
    <div className={`w-full min-h-screen p-4 md:p-8 font-sans transition-colors duration-500 ${mode === 'sticker' ? 'bg-green-50/70' : 'bg-indigo-50/70'}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 控制面板 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-slate-100">
          
          <div className="border-b pb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-xl text-white transition-colors shadow-md ${mode === 'sticker' ? 'bg-green-500 shadow-green-500/20' : 'bg-indigo-500 shadow-indigo-500/20'}`}>
                  {mode === 'sticker' ? <Sticker size={24} /> : <Smile size={24} />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Prompt 咒語生成器
                  </h1>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${mode === 'sticker' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                     {mode === 'sticker' ? '一般貼圖模式' : '表情貼模式'}
                  </span>
                </div>
              </div>
              
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setMode('sticker')}
                  className={`flex items-center px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                    mode === 'sticker' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Sticker size={16} className="mr-2" />
                  一般貼圖
                </button>
                <button
                  onClick={() => setMode('emoji')}
                  className={`flex items-center px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                    mode === 'emoji' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Smile size={16} className="mr-2" />
                  表情貼
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {mode === 'sticker' 
                ? '🟢 貼圖模式：生成含文字、動作豐富的大貼圖 (Sticker)' 
                : '🟣 表情貼模式：生成大頭特寫，上方搭配簡單文字 (Emoji)'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Palette size={16} className="mr-2 text-purple-500" />
                畫風選擇
              </label>
              <select
                value={styleType}
                onChange={(e) => setStyleType(e.target.value)}
                className={`w-full p-2.5 border rounded-xl focus:ring-2 outline-none bg-white text-sm transition-colors cursor-pointer ${
                  mode === 'sticker' 
                    ? 'border-gray-300 focus:ring-green-400' 
                    : 'border-indigo-200 focus:ring-indigo-400'
                }`}
              >
                {styleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Type size={16} className="mr-2 text-orange-500" />
                語言設定
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`w-full p-2.5 border rounded-xl focus:ring-2 outline-none bg-white text-sm transition-colors cursor-pointer ${
                  mode === 'sticker' 
                    ? 'border-gray-300 focus:ring-green-400' 
                    : 'border-indigo-200 focus:ring-indigo-400'
                }`}
              >
                <option value="台灣繁體中文">台灣繁體中文</option>
                <option value="English">English</option>
                <option value="Japanese">日本語</option>
                <option value="Korean">한국어</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <LayoutGrid size={16} className={`mr-2 ${mode === 'sticker' ? 'text-green-600' : 'text-indigo-600'}`} />
                {mode === 'sticker' ? '貼圖文字 (12格)' : '表情文字 (12格)'}
              </label>
              <button 
                onClick={handleShuffleCurrent}
                className={`text-xs px-3 py-1.5 rounded-full flex items-center transition border font-medium active:scale-95 ${
                  mode === 'sticker' 
                    ? 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200' 
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200'
                }`}
              >
                <Shuffle size={12} className="mr-1" /> 隨機換一組
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              {Object.values(currentCategories).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center justify-center p-2 rounded-lg text-xs font-medium transition-all ${
                    activeCategory === cat.id 
                      ? (mode === 'sticker' ? 'bg-green-600 text-white shadow-md' : 'bg-indigo-600 text-white shadow-md')
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
            
            <datalist id="category-phrases">
              {currentPool.map((phrase, idx) => (
                <option key={idx} value={phrase} />
              ))}
            </datalist>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {phrases.map((phrase, index) => (
                <div key={index} className="relative group">
                   <input
                    type="text"
                    value={phrase}
                    onChange={(e) => handlePhraseChange(index, e.target.value)}
                    list="category-phrases" 
                    className={`w-full p-2 text-center text-xs sm:text-sm font-medium border rounded-lg outline-none focus:ring-2 transition ${
                      mode === 'sticker'
                        ? 'border-gray-200 focus:border-green-400 focus:ring-green-300'
                        : 'border-indigo-100 focus:border-indigo-400 focus:ring-indigo-300 bg-indigo-50/30'
                    }`}
                    placeholder={mode === 'sticker' ? `貼圖 ${index + 1}` : `表情 ${index + 1}`}
                  />
                  <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-300 group-hover:text-gray-400">
                    <ChevronDown size={12} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-1">
              💡 點擊輸入框可選取詞庫，或直接手動輸入任意文字
            </p>
          </div>
        </div>

        {/* 預覽與輸出 */}
        <div className="flex flex-col space-y-6">
          <div className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col h-full border-t-4 transition-colors border-slate-100 ${
            mode === 'sticker' ? 'border-t-green-500' : 'border-t-indigo-500'
          }`}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Terminal size={20} className="mr-2 text-slate-700" />
                生成的 Prompt 提示詞
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">Midjourney / DALL-E</span>
            </h2>
            
            <div className="flex-grow bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs sm:text-sm overflow-y-auto whitespace-pre-wrap leading-relaxed relative group border border-gray-800 shadow-inner min-h-[340px]">
              {generatePrompt()}
            </div>

            <div className="mt-6 flex flex-col space-y-3">
              <button
                onClick={handleCopy}
                className={`w-full py-3.5 rounded-xl font-bold text-base md:text-lg flex items-center justify-center transition-all duration-200 shadow-md transform active:scale-[0.98] ${
                  mode === 'sticker'
                    ? (copied ? "bg-green-600 text-white shadow-green-600/30" : "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20")
                    : (copied ? "bg-indigo-600 text-white shadow-indigo-600/30" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/20")
                }`}
              >
                {copied ? (
                  <>
                    <Check size={22} className="mr-2" /> 已複製到剪貼簿！
                  </>
                ) : (
                  <>
                    <Copy size={22} className="mr-2" /> 複製 Prompt 提示詞
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// Part 2: Image Splitter Component
// ==========================================
export const ImageSplitter = ({ mode, setMode }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [enableSmartRemove, setEnableSmartRemove] = useState(true);
  const [cropScale, setCropScale] = useState(0);
  const [targetColor, setTargetColor] = useState('#00FF00');
  const [tolerance, setTolerance] = useState(30);
  const [smoothness, setSmoothness] = useState(2);
  const [despill, setDespill] = useState(true);
  const [filePrefix, setFilePrefix] = useState('sticker');
  const [startNumber, setStartNumber] = useState('01');
  const [isZipping, setIsZipping] = useState(false);

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
        desc: '180x180px (固定)',
        uploadHint: '720x540px'
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
      desc: '370x320px (最大)',
      uploadHint: '1480x960px'
    };
  }, [mode]);

  useEffect(() => {
    setFilePrefix(mode === 'emoji' ? 'emoji' : 'sticker');
  }, [mode]);

  useEffect(() => {
    if (window.JSZip) return; 
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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

  const handleModeChange = (newMode) => {
    if (stickers.length > 0) {
      if (!window.confirm("切換模式將會清除目前的工作區，確定要切換嗎？")) return;
    }
    setMode(newMode);
    setStickers([]);
    setOriginalImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        const initialStickers = sliceImage(img, CONFIG); 
        setStickers(initialStickers);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const sliceImage = (img, currentConfig) => {
    const canvas = document.createElement('canvas');
    canvas.width = currentConfig.totalW;
    canvas.height = currentConfig.totalH;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(img, 0, 0, currentConfig.totalW, currentConfig.totalH);

    const newStickers = [];
    for (let row = 0; row < currentConfig.rows; row++) {
      for (let col = 0; col < currentConfig.cols; col++) {
        const sx = col * currentConfig.cellW;
        const sy = row * currentConfig.cellH;
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = currentConfig.cellW;
        tempCanvas.height = currentConfig.cellH;
        const tempCtx = tempCanvas.getContext('2d');
        const rawData = ctx.getImageData(sx, sy, currentConfig.cellW, currentConfig.cellH);
        tempCtx.putImageData(rawData, 0, 0);

        newStickers.push({
          id: row * currentConfig.cols + col,
          sourceCanvas: tempCanvas,
          processedUrl: tempCanvas.toDataURL()
        });
      }
    }
    return newStickers;
  };

  const processStickerData = useCallback((sourceCanvas) => {
    if (!enableSmartRemove) return sourceCanvas.toDataURL();

    const w = CONFIG.cellW;
    const h = CONFIG.cellH;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const scale = 1 + (cropScale / 100 * 0.2); 
    const dw = w * scale;
    const dh = h * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sourceCanvas, dx, dy, dw, dh);

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const { r: tr, g: tg, b: tb } = hexToRgb(targetColor);
    
    const tol = tolerance * 4.4; 
    const smooth = Math.max(0.1, smoothness * 2);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const dist = Math.sqrt(
        (r - tr) * (r - tr) + 
        (g - tg) * (g - tg) + 
        (b - tb) * (b - tb)
      );

      let alpha = 255;

      if (dist < tol) {
        alpha = 0;
      } else if (dist < tol + smooth) {
        alpha = ((dist - tol) / smooth) * 255;
      }

      data[i + 3] = alpha;

      if (despill && alpha > 0) {
        if (tg > tr && tg > tb) {
          const limit = (r + b) / 2;
          if (g > limit) data[i + 1] = limit;
        } else if (tb > tr && tb > tg) {
          const limit = (r + g) / 2;
          if (b > limit) data[i + 2] = limit;
        } else if (tr > tg && tr > tb) {
          const limit = (g + b) / 2;
          if (r > limit) data[i] = limit;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL();
  }, [enableSmartRemove, cropScale, targetColor, tolerance, smoothness, despill, CONFIG]);

  useEffect(() => {
    if (!originalImage || stickers.length === 0) return;

    const timer = setTimeout(() => {
      setStickers(prev => prev.map(s => ({
        ...s,
        processedUrl: processStickerData(s.sourceCanvas)
      })));
    }, 40);

    return () => clearTimeout(timer);
  }, [processStickerData, originalImage]);

  const handleDownloadSingle = (dataUrl, index) => {
    const fileName = `${filePrefix}_${formatNumber(startNumber, index)}.png`;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBatchDownload = async () => {
    if (!window.JSZip) {
      alert("系統正在載入打包元件，請稍後再試...");
      return;
    }

    setIsZipping(true);
    const zip = new window.JSZip();
    const folder = zip.folder(`${filePrefix}_pack`);

    stickers.forEach((sticker, index) => {
      const base64Data = sticker.processedUrl.split(',')[1];
      const fileName = `${filePrefix}_${formatNumber(startNumber, index)}.png`;
      folder.file(fileName, base64Data, { base64: true });
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filePrefix}_pack.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP Generation failed:", err);
      alert("打包失敗，請重試");
    } finally {
      setIsZipping(false);
    }
  };

  const handlePreset = (type) => {
    if (type === 'black') {
      setTargetColor('#000000');
      setTolerance(30);
      setDespill(false);
    } else if (type === 'green') {
      setTargetColor('#00FF00');
      setTolerance(30);
      setDespill(true);
    }
  };

  const pickColorFromSticker = (e, sticker) => {
    if (!sticker) return;
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * CONFIG.cellW;
    const y = (e.clientY - rect.top) / rect.height * CONFIG.cellH;
    
    const ctx = sticker.sourceCanvas.getContext('2d');
    const p = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    
    const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1).toUpperCase();
    setTargetColor(hex);
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0c15] p-4 md:p-8 font-sans text-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="bg-[#151926] rounded-2xl shadow-xl p-6 mb-8 border border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
          <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r opacity-70 transition-colors duration-500 ${mode === 'emoji' ? 'from-yellow-400 via-orange-500 to-red-500' : 'from-indigo-500 via-purple-500 to-pink-500'}`}></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white tracking-tight">
              <div className={`p-2.5 rounded-xl shadow-lg transition-colors duration-500 ${mode === 'emoji' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-indigo-600 shadow-indigo-500/20'}`}>
                {mode === 'emoji' ? <Smile className="w-6 h-6 text-white" /> : <Scissors className="w-6 h-6 text-white" />}
              </div>
              Sticker Splitter <span className={`${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'} font-light transition-colors duration-500`}>Pro</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              自動化 4x3 網格分割 • 智能色鍵去背 • <span className={`font-semibold ${mode === 'emoji' ? 'text-orange-300' : 'text-indigo-300'}`}>{CONFIG.label}模式</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 relative z-10 items-center">
            <div className="bg-[#0f1117] p-1 rounded-xl border border-slate-700 flex relative">
               <button 
                 onClick={() => handleModeChange('sticker')}
                 className={`relative z-10 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${mode === 'sticker' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
               >
                 <Sticker className="w-3.5 h-3.5" />
                 一般貼圖
               </button>
               <button 
                 onClick={() => handleModeChange('emoji')}
                 className={`relative z-10 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${mode === 'emoji' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
               >
                 <Smile className="w-3.5 h-3.5" />
                 表情貼
               </button>
            </div>

            {stickers.length > 0 && (
              <button 
                onClick={() => {setStickers([]); setOriginalImage(null);}}
                className="flex items-center gap-1.5 px-3.5 py-2 text-slate-300 bg-[#1e2336] hover:bg-[#252b42] border border-slate-700 hover:border-slate-600 rounded-xl transition-all shadow-md text-xs font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                重新開始
              </button>
            )}
          </div>
        </div>

        {/* Workspace */}
        {stickers.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              <div className="bg-[#151926] text-gray-200 rounded-2xl shadow-xl border border-slate-800/60 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1a2030]">
                  <h2 className={`font-bold text-base flex items-center gap-2 transition-colors ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>
                    <Settings className="w-4 h-4" />
                    去背參數控制
                  </h2>
                  <div 
                    className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${enableSmartRemove ? (mode === 'emoji' ? 'bg-orange-500' : 'bg-indigo-600') + ' shadow-inner' : 'bg-slate-700'}`}
                    onClick={() => setEnableSmartRemove(!enableSmartRemove)}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${enableSmartRemove ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                {enableSmartRemove && (
                  <div className="p-5 space-y-6">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 block">快速設定 (Presets)</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button 
                          onClick={() => handlePreset('green')}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0f1117] border border-slate-700 hover:border-green-500 hover:shadow-green-500/10 transition-all group active:scale-95"
                        >
                          <div className="w-5 h-5 rounded-full bg-green-500 mb-1.5 group-hover:scale-110 transition"></div>
                          <span className="text-xs text-slate-300 group-hover:text-white font-medium">綠幕去背</span>
                        </button>
                        <button 
                          onClick={() => handlePreset('black')}
                          className={`flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0f1117] border border-slate-700 hover:shadow-lg transition-all group active:scale-95 ${mode === 'emoji' ? 'hover:border-orange-500' : 'hover:border-indigo-500'}`}
                        >
                          <div className="w-5 h-5 rounded-full bg-black border border-slate-600 mb-1.5 group-hover:scale-110 transition"></div>
                          <span className="text-xs text-slate-300 group-hover:text-white font-medium">純黑底去背</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-[#0f1117] p-3.5 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-slate-400 flex items-center gap-1 font-medium"><Layers className="w-3.5 h-3.5"/> 邊緣縮放 (消除接縫)</span>
                          <span className={`font-mono font-bold ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>{cropScale}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={cropScale}
                          onChange={(e) => setCropScale(Number(e.target.value))}
                          className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${mode === 'emoji' ? 'accent-orange-500' : 'accent-indigo-500'}`}
                        />
                      </div>

                      <div className="bg-[#0f1117] p-3.5 rounded-xl border border-slate-800">
                          <div className="flex justify-between items-center mb-2.5">
                            <span className="text-xs text-slate-400 font-medium">目標去背顏色</span>
                            <span className="text-xs font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">{targetColor}</span>
                          </div>
                          <div className="flex gap-2.5">
                            <div className={`relative flex-1 h-9 rounded-lg overflow-hidden border border-slate-700 ring-1 ring-transparent transition-all ${mode === 'emoji' ? 'hover:ring-orange-500' : 'hover:ring-indigo-500'}`}>
                                <input 
                                  type="color" 
                                  value={targetColor}
                                  onChange={(e) => setTargetColor(e.target.value)}
                                  className="absolute -top-3 -left-3 w-[150%] h-[150%] cursor-pointer bg-transparent" 
                                />
                            </div>
                            <div className="h-9 px-3 flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg cursor-help text-slate-400 hover:text-white transition text-xs" title="點擊右側貼圖可直接吸取顏色">
                              <Droplet className="w-3.5 h-3.5" />
                              <span className="text-[11px]">吸色</span>
                            </div>
                          </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 font-medium">色彩容許度</span>
                          <span className={`font-mono font-bold ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>{tolerance}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={tolerance}
                          onChange={(e) => setTolerance(Number(e.target.value))}
                          className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${mode === 'emoji' ? 'accent-orange-500' : 'accent-indigo-500'}`}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-400 font-medium">邊緣柔化</span>
                          <span className={`font-mono font-bold ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>{smoothness}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={smoothness}
                          onChange={(e) => setSmoothness(Number(e.target.value))}
                          className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${mode === 'emoji' ? 'accent-orange-500' : 'accent-indigo-500'}`}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                          <span className="text-xs text-slate-300 font-medium">綠幕溢色去除 (Despill)</span>
                          <div 
                            className={`w-10 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${despill ? (mode === 'emoji' ? 'bg-orange-500' : 'bg-indigo-600') : 'bg-slate-700'}`}
                            onClick={() => setDespill(!despill)}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${despill ? 'translate-x-5' : 'translate-x-0'}`}></div>
                          </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#151926] rounded-2xl shadow-xl border border-slate-800/60 overflow-hidden">
                <div className="p-4 bg-[#1a2030] border-b border-slate-800">
                  <h3 className={`font-bold flex items-center gap-2 text-sm ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>
                    <Package className="w-4 h-4" />
                    匯出設定
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> 檔名前綴
                    </label>
                    <input 
                      type="text" 
                      value={filePrefix}
                      onChange={(e) => setFilePrefix(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#0f1117] border border-slate-700 rounded-lg text-slate-200 focus:ring-1 focus:ring-indigo-500 outline-none"
                      placeholder="sticker"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Hash className="w-3 h-3" /> 起始編號
                    </label>
                    <input 
                      type="text" 
                      inputMode="numeric"
                      value={startNumber}
                      onChange={(e) => setStartNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-[#0f1117] border border-slate-700 rounded-lg text-slate-200 focus:ring-1 focus:ring-indigo-500 outline-none font-mono"
                      placeholder="01"
                    />
                  </div>

                  <div className="text-xs text-slate-400 bg-[#0f1117] p-2.5 rounded-lg border border-slate-800/50 flex justify-between items-center">
                    <span>預覽：</span>
                    <span className={`font-mono font-bold ${mode === 'emoji' ? 'text-orange-300' : 'text-indigo-300'}`}>{filePrefix}_{formatNumber(startNumber, 0)}.png</span>
                  </div>

                  <button 
                    onClick={handleBatchDownload}
                    disabled={isZipping}
                    className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]
                      ${mode === 'emoji' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 shadow-orange-900/20' 
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/20'}`}
                  >
                    {isZipping ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        打包中...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        下載全部貼圖 (.ZIP)
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="mb-4 flex items-center gap-2 text-xs text-slate-400 bg-[#151926] py-2 px-4 rounded-xl border border-slate-800 w-fit">
                <span className={`w-2 h-2 rounded-full ${mode === 'emoji' ? 'bg-orange-500' : 'bg-indigo-500'}`}></span>
                目前模式：<span className="text-slate-200 font-medium">{CONFIG.label}</span>
                <span className="mx-1 opacity-30">|</span>
                單張尺寸：<span className="font-mono text-slate-300">{CONFIG.cellW}x{CONFIG.cellH}px</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {stickers.map((sticker, index) => (
                  <div key={sticker.id} className={`group relative bg-[#151926] rounded-2xl shadow-lg border border-slate-800 overflow-hidden transition-all duration-300 ${mode === 'emoji' ? 'hover:border-orange-500/50' : 'hover:border-indigo-500/50'}`}>
                    <div className="flex justify-between items-center p-2.5 bg-[#1a2030] border-b border-slate-800/50 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded">#{index + 1}</span>
                      <span className={`font-mono ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>{filePrefix}_{formatNumber(startNumber, index)}.png</span>
                    </div>

                    <div 
                      className="relative bg-[#0f1117] cursor-crosshair overflow-hidden flex items-center justify-center p-2"
                      title="點擊吸取此顏色為目標顏色"
                      style={{ aspectRatio: `${CONFIG.cellW}/${CONFIG.cellH}` }}
                    >
                      <div className="absolute inset-0 opacity-15 pointer-events-none" 
                           style={{backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)', backgroundSize: '16px 16px', backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'}}>
                      </div>
                      
                      <img 
                        src={sticker.processedUrl} 
                        onClick={(e) => pickColorFromSticker(e, sticker)}
                        className="relative z-10 max-w-full max-h-full object-contain transition-transform duration-200"
                        alt={`Sticker ${index + 1}`}
                      />
                    </div>

                    <div className="p-2.5 bg-[#151926] border-t border-slate-800 flex justify-center">
                       <button 
                         onClick={() => handleDownloadSingle(sticker.processedUrl, index)}
                         className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:text-white transition-all w-full justify-center active:scale-95 ${mode === 'emoji' ? 'hover:bg-orange-600' : 'hover:bg-indigo-600'}`}
                       >
                         <Download className="w-3.5 h-3.5" />
                         單張下載
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={`relative border-2 border-dashed border-slate-700 rounded-3xl p-12 md:p-20 text-center bg-[#151926]/40 flex flex-col items-center justify-center min-h-[540px] transition-all duration-500 group overflow-hidden ${mode === 'emoji' ? 'hover:border-orange-500/30' : 'hover:border-indigo-500/30'}`}>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] blur-[100px] rounded-full pointer-events-none transition-colors duration-500 ${mode === 'emoji' ? 'bg-orange-500/10' : 'bg-indigo-500/10'}`}></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className={`w-24 h-24 bg-[#1e2336] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-300 shadow-2xl border border-slate-700/50 ${mode === 'emoji' ? 'group-hover:border-orange-500/40' : 'group-hover:border-indigo-500/40'}`}>
                   {mode === 'emoji' ? 
                     <Smile className="w-12 h-12 text-orange-400" /> : 
                     <LayoutGrid className="w-12 h-12 text-indigo-400" />
                   }
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  上傳您的 <span className={`text-transparent bg-clip-text bg-gradient-to-r ${mode === 'emoji' ? 'from-orange-400 to-red-400' : 'from-indigo-400 to-purple-400'}`}>{CONFIG.label}</span> 網格圖
                </h3>
                
                <p className="text-slate-400 max-w-lg mx-auto mb-8 text-sm md:text-base leading-relaxed">
                  建議尺寸：<span className="text-slate-200 font-mono bg-slate-800 px-2 py-0.5 rounded font-semibold">{CONFIG.uploadHint}</span> (4x3 網格)
                  <br/>單格將自動裁切為 <span className={`font-semibold ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>{CONFIG.cellW}x{CONFIG.cellH}px</span>
                </p>
                
                <label className={`group/btn flex items-center gap-3 px-8 py-4 text-white rounded-2xl cursor-pointer transition-all shadow-xl font-bold text-base md:text-lg hover:-translate-y-0.5 active:scale-95
                  ${mode === 'emoji' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-900/30' 
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/30'}`}>
                   <Upload className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                   <span>選擇圖片檔案</span>
                   <input 
                     type="file" 
                     accept="image/*" 
                     onChange={handleImageUpload} 
                     className="hidden" 
                   />
                 </label>
                 
                 <p className="mt-4 text-xs text-slate-500">支援 PNG, JPG 格式</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ==========================================
// Main App Component
// ==========================================
export default function LineStickerMaker() {
  const [activeTab, setActiveTab] = useState('generator');
  const [globalMode, setGlobalMode] = useState('sticker');

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-black bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent mr-6">
                LINE Sticker Maker
              </span>
              <div className="hidden sm:flex space-x-4">
                <button
                  onClick={() => setActiveTab('generator')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'generator'
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Wand2 size={18} />
                  第一步：生成咒語
                </button>
                <button
                  onClick={() => setActiveTab('splitter')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === 'splitter'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Scissors size={18} />
                  第二步：切圖去背
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">v2.0 Integrated</span>
            </div>
          </div>
        </div>
        
        <div className="sm:hidden flex border-t border-gray-100">
           <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 py-3 text-xs font-medium flex justify-center items-center gap-2 ${
                activeTab === 'generator' ? 'bg-green-50 text-green-700' : 'text-gray-500'
              }`}
            >
              <Wand2 size={16} /> 生成咒語
            </button>
            <button
              onClick={() => setActiveTab('splitter')}
              className={`flex-1 py-3 text-xs font-medium flex justify-center items-center gap-2 ${
                activeTab === 'splitter' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500'
              }`}
            >
              <Scissors size={16} /> 切圖去背
            </button>
        </div>
      </nav>

      <main className="flex-grow bg-gray-50">
        {activeTab === 'generator' ? (
          <PromptGenerator mode={globalMode} setMode={setGlobalMode} />
        ) : (
          <ImageSplitter mode={globalMode} setMode={setGlobalMode} />
        )}
      </main>
    </div>
  );
}
