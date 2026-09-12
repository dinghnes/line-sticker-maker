import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Copy, Check, LayoutGrid, Palette, Terminal, Briefcase, Heart, MessageCircle, Sun, Gift, Laugh, Shuffle, Type, ChevronDown, Smile, Hand, Star, Sticker, Upload, Download, RefreshCw, Scissors, Settings, Layers, Droplet, Package, FileText, Hash, Sparkles, Wand2, ZoomIn, X, ShieldAlert, CheckCircle2, Crown, FileUp, AlertCircle, Flame, Coffee, CheckCheck, Edit3
} from 'lucide-react';

// =========================================================================
    // 🧠 核心詞庫與超豐富「文字 ➔ 生動動作與神態」字典
    // =========================================================================
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
      "聖誕快樂": "戴紅色聖誕帽，抱著滿滿彩色禮物盒微笑"
    };

    // 🌟 6 大經典爆款 12 格精選套裝
    const CURATED_PACKS = [
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

    // ==========================================
    // Part 1: Prompt Generator Component
    // ==========================================
    const PromptGenerator = ({ mode, setMode }) => {
      const [styleType, setStyleType] = useState("Japanese Anime");
      const [language, setLanguage] = useState("台灣繁體中文");
      const [copied, setCopied] = useState(false);
      const [includeNegative, setIncludeNegative] = useState(true);
      const [includeActions, setIncludeActions] = useState(true); // 動作指令聯動開關
      const [batchInputText, setBatchInputText] = useState("");
      const [showBatchModal, setShowBatchModal] = useState(false);

      const [phrases, setPhrases] = useState(() => CURATED_PACKS[0].phrases);

      const styleOptions = [
        { value: "Japanese Anime", label: "日系動漫風 (推薦)", desc: "賽璐珞上色、線條清晰、動漫感" },
        { value: "Big Eyes Cel Shading", label: "大眼賽璐璐風", desc: "大眼、賽璐璐上色、日系Q版" },
        { value: "2D Flat Cute", label: "2D 平面可愛", desc: "可愛、活潑、2D平面簡潔線條" },
        { value: "Hand Drawn Watercolor", label: "手繪水彩風", desc: "柔和、水彩筆觸、手繪質感" },
        { value: "3D Chibi Pixar", label: "3D Q版皮克斯風", desc: "3D 渲染、Q版比例、高品質材質" },
        { value: "American Cartoon", label: "美式卡通風", desc: "粗線條、誇張變形、鮮豔色彩" },
        { value: "Retro Pixel Art", label: "復古像素風", desc: "8-bit, 像素藝術, 復古遊戲風格" },
      ];

      // 套用套裝組合
      const handleApplyPack = (pack) => {
        setPhrases([...pack.phrases]);
      };

      // 隨機更換詞彙
      const handleShuffleCurrent = () => {
        const allWords = Object.keys(ACTION_MAP);
        const shuffled = [...allWords].sort(() => 0.5 - Math.random());
        setPhrases(shuffled.slice(0, 12));
      };

      // 批次套用文字
      const handleApplyBatchText = () => {
        if (!batchInputText.trim()) return;
        const words = batchInputText
          .split(/[,，\n、\s]+/)
          .map(w => w.trim())
          .filter(Boolean);
        
        if (words.length === 0) return;
        const newPhrases = [...phrases];
        for (let i = 0; i < 12; i++) {
          if (words[i]) newPhrases[i] = words[i];
        }
        setPhrases(newPhrases);
        setShowBatchModal(false);
        setBatchInputText("");
      };

      const handlePhraseChange = (index, value) => {
        const newPhrases = [...phrases];
        newPhrases[index] = value;
        setPhrases(newPhrases);
      };

      // 產生動作與神態描述
      const getActionDescription = (phrase, index) => {
        if (ACTION_MAP[phrase]) return ACTION_MAP[phrase];
        const defaultActions = [
          "做出活潑自信的揮手動作，燦爛笑容",
          "雙手合十微微鞠躬，神態充滿真誠",
          "興奮跳躍比出剪刀手 YA，身旁有閃爍星星",
          "單手托腮思考，眼神充滿好奇與靈動",
          "拍拍胸脯豎起大拇指比讚，自信十足",
          "俏皮吐舌單眼眨眼 Wink，雙手比心",
          "雙手叉腰開懷大笑，充滿感染力",
          "雙手在胸前握拳打氣，熱血滿滿",
          "雙手在身前擺動，露出可愛無奈表情",
          "雙眼放光充滿期待，微微向前傾",
          "端著熱咖啡啜飲，神情放鬆溫馨",
          "手拿小筆記本認真點頭記錄"
        ];
        return defaultActions[index % defaultActions.length];
      };

      const generatePrompt = () => {
        const selectedStyle = styleOptions.find(s => s.value === styleType);
        const styleDesc = selectedStyle ? selectedStyle.desc : "賽璐珞上色、線條清晰、動漫感";
        const phraseString = phrases.join('、');
        
        const actionBlock = includeActions ? `
[12 格角色動作與表情對應設計]
${phrases.map((p, i) => `${i + 1}.「${p}」：(${getActionDescription(p, i)})`).join('\n')}` : '';

        const negativeParams = includeNegative ? ` --no extra limbs, extra fingers, malformed hands, blur, complex background, text artifacts, duplicate character, bad anatomy` : ``;

        if (mode === 'sticker') {
          return `✅ 12 格 LINE 貼圖 (Sticker)｜Prompt 建議
請參考上傳圖片中的角色，生成一張包含 12 個不同動作的角色貼圖集。

[角色與風格設定]
角色一致性：必須完全維持原圖主角的髮型、服裝、五官與整體外觀特徵。
構圖風格：畫面僅包含「角色 + 文字」，不包含任何場景背景。
畫風設定：【${styleDesc}】。
貼紙風格（去背友善）：角色與文字外圍皆需加入「粗白色外框（Sticker Style）」。背景統一為 #00FF00（純綠色），不可有雜點、光暈與漸層。

[畫面佈局與尺寸規格]
整體為 4 × 3 佈局，共 12 張貼圖。總尺寸：1480 × 960 px。
每張小圖約 370 × 320 px。每張貼圖四周預留適度 Padding 間距，避免角色彼此互相黏住。
鏡頭視角：全身與半身混合，必須包含正面、側面等多重視角。
${actionBlock}

[文字設計]
語言：【${language}】
文字內容：【${phraseString}】
字型風格：可愛 Q 版字型，顏色鮮豔易讀，多色彩混合，絕對禁止使用任何綠色與黑色字體（請改用紅、藍、紫、橘、黃等高對比色彩以利去背）。
排版：文字大小約佔單張貼圖 1/3，可適度置於身側或非重要區域，切勿遮擋角色五官臉部。

[輸出格式]
一張大圖，內含 4 × 3 的 12 張貼圖。背景必須為純綠色 #00FF00。每格角色 + 文字均附上粗白邊。
--ar 37:24 --v 6.0${negativeParams}`;
        } else {
          return `✅ 12 格 LINE 表情貼 (Emoji)｜Prompt 建議
請參考上傳圖片中的角色，生成一張包含 12 個 LINE 表情貼的圖集。

[角色與風格設定]
角色一致性：維持原圖主角特徵，轉化為微縮清晰的「表情貼」風格。
Emoji 構圖重點：
1. 【大頭特寫 + 上方文字】：統一構圖為「角色頭部在下方，文字位於頭頂上方」。
2. 畫風設定：【${styleDesc}，線條簡潔清晰，極適合微縮觀看】。
3. 去背友善：每個表情(含文字)周圍需有粗白色外框。背景統一為 #00FF00（純綠色）。

[畫面佈局]
整體為 4 × 3 佈局，共 12 個表情貼。總尺寸：720 × 540 px，單張 180 × 180 px，排列整齊互不重疊。
${actionBlock}

[內容與文字設計]
文字內容：【${phraseString}】
文字風格：深色粗體字，位於角色頭頂上方，清晰易讀。
動作表情：請根據文字含義繪製對應表情。

[輸出格式]
一張大圖，內含 4 × 3 的 12 個表情貼。背景純綠色 #00FF00。
--ar 37:24 --v 6.0${negativeParams}`;
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
          document.body.appendChild(textArea);
          try {
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
          alert("複製失敗，請手動全選右側文字框複製。");
        }
      };

      return (
        <div className={`w-full min-h-screen p-4 md:p-8 font-sans transition-colors duration-500 ${mode === 'sticker' ? 'bg-[#0f172a]' : 'bg-[#131127]'}`}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 左側：詞庫與控制面板 */}
            <div className="bg-[#1e293b] rounded-2xl shadow-xl p-6 space-y-5 border border-slate-700/70">
              
              {/* 頂部切換 */}
              <div className="border-b border-slate-700/80 pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl text-white transition-colors shadow-lg ${mode === 'sticker' ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-indigo-600 shadow-indigo-600/20'}`}>
                      {mode === 'sticker' ? <Sticker size={24} /> : <Smile size={24} />}
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Prompt 咒語生成器
                      </h1>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${mode === 'sticker' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'}`}>
                        {mode === 'sticker' ? 'LINE 一般貼圖模式' : 'LINE 表情貼模式'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex bg-[#0f172a] p-1 rounded-xl border border-slate-700">
                    <button
                      onClick={() => setMode('sticker')}
                      className={`flex items-center px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        mode === 'sticker' 
                          ? 'bg-emerald-600 text-white shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Sticker size={14} className="mr-1.5" />
                      一般貼圖
                    </button>
                    <button
                      onClick={() => setMode('emoji')}
                      className={`flex items-center px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                        mode === 'emoji' 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Smile size={14} className="mr-1.5" />
                      表情貼
                    </button>
                  </div>
                </div>
              </div>

              {/* 風格與語言 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="flex items-center text-xs font-semibold text-slate-300">
                    <Palette size={14} className="mr-1.5 text-purple-400" />
                    畫風選擇
                  </label>
                  <select
                    value={styleType}
                    onChange={(e) => setStyleType(e.target.value)}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                  >
                    {styleOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center text-xs font-semibold text-slate-300">
                    <Type size={14} className="mr-1.5 text-amber-400" />
                    語言設定
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2.5 bg-[#0f172a] border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                  >
                    <option value="台灣繁體中文">台灣繁體中文</option>
                    <option value="English">English</option>
                    <option value="Japanese">日本語</option>
                    <option value="Korean">한국어</option>
                  </select>
                </div>
              </div>

              {/* 🌟 爆款情境套裝推薦（一鍵套用） */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Crown size={14} className="text-yellow-400" />
                    經典熱銷套裝（一鍵套用 12 格黃金組合）
                  </span>
                  <button
                    onClick={() => setShowBatchModal(true)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Edit3 size={12} /> 批次貼上文字
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CURATED_PACKS.map((pack) => (
                    <button
                      key={pack.id}
                      onClick={() => handleApplyPack(pack)}
                      className="p-2.5 rounded-xl bg-[#0f172a] border border-slate-700/80 hover:border-indigo-500/80 hover:bg-slate-800/80 text-left transition group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-white mb-1">
                        {pack.icon}
                        <span>{pack.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 leading-tight">{pack.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 12 格貼圖文字編輯與神態 */}
              <div className="space-y-2.5 pt-1 border-t border-slate-700/70">
                <div className="flex justify-between items-center">
                  <label className="flex items-center text-xs font-semibold text-slate-300">
                    <LayoutGrid size={14} className={`mr-1.5 ${mode === 'sticker' ? 'text-emerald-400' : 'text-indigo-400'}`} />
                    12 格文字清單（建議 2~4 字最佳）
                  </label>
                  <button 
                    onClick={handleShuffleCurrent}
                    className="text-xs px-2.5 py-1 rounded-lg flex items-center transition bg-[#0f172a] hover:bg-slate-800 text-slate-300 border border-slate-700 font-medium active:scale-95"
                  >
                    <Shuffle size={11} className="mr-1 text-yellow-400" /> 隨機換詞
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {phrases.map((phrase, index) => {
                    const isLong = phrase.length > 4;
                    const action = getActionDescription(phrase, index);
                    return (
                      <div key={index} className="relative group">
                        <input
                          type="text"
                          value={phrase}
                          onChange={(e) => handlePhraseChange(index, e.target.value)}
                          className={`w-full p-2 text-center text-xs font-bold bg-[#0f172a] border rounded-lg text-slate-100 outline-none focus:ring-1 ${
                            isLong ? 'border-amber-500/60 focus:border-amber-400' : 'border-slate-700 focus:border-indigo-500'
                          }`}
                          placeholder={`格 ${index + 1}`}
                          title={`AI動作：${action}`}
                        />
                        {isLong && (
                          <span className="absolute -top-1.5 -right-1 text-[9px] bg-amber-500 text-black px-1 rounded-full font-black scale-90" title="字數稍多，手機微縮可能不易辨識">
                            !
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 動作聯動與負向提示詞開關 */}
                <div className="pt-2 space-y-1.5 border-t border-slate-700/60 text-xs">
                  <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-emerald-400" />
                      開啟「文字 ➔ AI 生動動作神態聯動」（推薦，大幅提升角色動態）
                    </span>
                    <input
                      type="checkbox"
                      checked={includeActions}
                      onChange={(e) => setIncludeActions(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-600 text-emerald-600 cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-slate-300 cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert size={13} className="text-yellow-400" />
                      自動附加負向提示詞（防肢體畸變、多手指、背景雜點）
                    </span>
                    <input
                      type="checkbox"
                      checked={includeNegative}
                      onChange={(e) => setIncludeNegative(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-600 text-indigo-600 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* 右側：生成的 Prompt 預覽 */}
            <div className="flex flex-col space-y-6">
              <div className={`bg-[#1e293b] rounded-2xl shadow-xl p-6 flex flex-col h-full border-t-4 transition-colors border-slate-700/70 ${
                mode === 'sticker' ? 'border-t-emerald-500' : 'border-t-indigo-500'
              }`}>
                <h2 className="text-base font-bold text-white mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={18} className="text-emerald-400" />
                    生成的 Prompt (提示詞)
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                    Midjourney v6 / DALL-E 3
                  </span>
                </h2>
                
                <div className="flex-grow bg-[#090b10] text-slate-200 p-4 rounded-xl font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed relative border border-slate-800 shadow-inner min-h-[350px] max-h-[500px]">
                  {generatePrompt()}
                </div>

                <div className="mt-5 space-y-3">
                  <button
                    onClick={handleCopy}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center transition-all shadow-lg active:scale-[0.98] ${
                      mode === 'sticker'
                        ? (copied ? "bg-emerald-600 text-white shadow-emerald-900/30" : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-900/20")
                        : (copied ? "bg-indigo-600 text-white shadow-indigo-900/30" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-900/20")
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={20} className="mr-2" /> 已複製到剪貼簿！
                      </>
                    ) : (
                      <>
                        <Copy size={20} className="mr-2" /> 複製完整 Prompt (含動作指令)
                      </>
                    )}
                  </button>

                  <div className="text-[11px] p-3 rounded-xl leading-relaxed bg-[#0f172a] border border-slate-700/80 text-slate-300">
                    <strong className="text-yellow-400 font-bold block mb-1">💡 專業建議：</strong>
                    每個詞彙已自動被賦予對應動作（例如：「早安」會揮手微笑、「收到」會帥氣敬禮、「笑死」會捧腹飆淚），生圖時 AI 能畫出神情各異的高品質貼圖！
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 批次貼上 Modal */}
          {showBatchModal && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowBatchModal(false)}
            >
              <div 
                className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <Edit3 size={16} className="text-indigo-400" />
                    批次貼上 12 格文字
                  </h3>
                  <button onClick={() => setShowBatchModal(false)} className="text-slate-400 hover:text-white p-1">
                    <X size={16} />
                  </button>
                </div>

                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  請將 12 個文字貼在下方，支援以「逗號、空格或換行」分隔：
                </p>

                <textarea
                  rows={4}
                  value={batchInputText}
                  onChange={(e) => setBatchInputText(e.target.value)}
                  placeholder="範例：早安, 晚安, 收到, 謝謝, OK, 沒問題, 笑死, 哭啊, 辛苦了, 加油, 拜託, 掰掰"
                  className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-indigo-500 mb-4 resize-none font-mono"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowBatchModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleApplyBatchText}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
                  >
                    一鍵套用填入
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      );
    };

    // ==========================================
    // Part 2: Image Splitter Component
    // ==========================================
    const ImageSplitter = ({ mode, setMode }) => {
      const [originalImage, setOriginalImage] = useState(null);
      const [stickers, setStickers] = useState([]);
      const [isDragging, setIsDragging] = useState(false);
      
      const [enableSmartRemove, setEnableSmartRemove] = useState(true);
      const [removalMode, setRemovalMode] = useState('flood');
      const [cropScale, setCropScale] = useState(0);
      const [targetColor, setTargetColor] = useState('#00FF00');
      const [tolerance, setTolerance] = useState(30);
      const [smoothness, setSmoothness] = useState(2);
      const [despill, setDespill] = useState(true);

      const [coverIndex, setCoverIndex] = useState(0);
      const [includeOfficialAssets, setIncludeOfficialAssets] = useState(true);
      const [useLineNaming, setUseLineNaming] = useState(true);
      const [filePrefix, setFilePrefix] = useState('sticker');
      const [startNumber, setStartNumber] = useState('01');
      const [isZipping, setIsZipping] = useState(false);

      const [previewBg, setPreviewBg] = useState('checker');
      const [activeModalSticker, setActiveModalSticker] = useState(null);

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
          desc: '370x320px (偶數規格)',
          uploadHint: '1480x960px'
        };
      }, [mode]);

      useEffect(() => {
        setFilePrefix(mode === 'emoji' ? 'emoji' : 'sticker');
      }, [mode]);

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
        setCoverIndex(0);
      };

      const processFile = (file) => {
        if (!file || !file.type.startsWith('image/')) {
          alert('請上傳有效的圖片檔案 (PNG, JPG, WebP 等)');
          return;
        }

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
      };

      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) processFile(file);
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
        const tolSq = tol * tol;
        const tolSmooth = tol + smooth;
        const tolSmoothSq = tolSmooth * tolSmooth;

        if (removalMode === 'flood') {
          const visited = new Uint8Array(w * h);
          const queue = [];

          const checkAndPush = (x, y) => {
            const idx = y * w + x;
            if (visited[idx]) return;
            visited[idx] = 1;
            const pi = idx * 4;
            const r = data[pi], g = data[pi + 1], b = data[pi + 2];
            const distSq = (r - tr)**2 + (g - tg)**2 + (b - tb)**2;
            if (distSq < tolSmoothSq) {
              queue.push(x | (y << 16));
            }
          };

          for (let x = 0; x < w; x++) {
            checkAndPush(x, 0);
            checkAndPush(x, h - 1);
          }
          for (let y = 0; y < h; y++) {
            checkAndPush(0, y);
            checkAndPush(w - 1, y);
          }

          let head = 0;
          while (head < queue.length) {
            const val = queue[head++];
            const cx = val & 0xFFFF;
            const cy = val >>> 16;
            const idx = cy * w + cx;
            const pi = idx * 4;
            
            const r = data[pi], g = data[pi + 1], b = data[pi + 2];
            const distSq = (r - tr)**2 + (g - tg)**2 + (b - tb)**2;

            if (distSq < tolSq) {
              data[pi + 3] = 0;
            } else if (distSq < tolSmoothSq) {
              const dist = Math.sqrt(distSq);
              data[pi + 3] = Math.min(data[pi + 3], ((dist - tol) / smooth) * 255);
            }

            if (cx > 0) checkAndPush(cx - 1, cy);
            if (cx < w - 1) checkAndPush(cx + 1, cy);
            if (cy > 0) checkAndPush(cx, cy - 1);
            if (cy < h - 1) checkAndPush(cx, cy + 1);
          }

        } else {
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const distSq = (r - tr)**2 + (g - tg)**2 + (b - tb)**2;

            if (distSq < tolSq) {
              data[i + 3] = 0;
            } else if (distSq < tolSmoothSq) {
              const dist = Math.sqrt(distSq);
              data[i + 3] = ((dist - tol) / smooth) * 255;
            }
          }
        }

        if (despill) {
          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha > 0) {
              const r = data[i], g = data[i + 1], b = data[i + 2];
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
        }

        ctx.putImageData(imgData, 0, 0);
        return canvas.toDataURL('image/png');
      }, [enableSmartRemove, removalMode, cropScale, targetColor, tolerance, smoothness, despill, CONFIG]);

      useEffect(() => {
        if (!originalImage || stickers.length === 0) return;

        const timer = setTimeout(() => {
          setStickers(prev => prev.map(s => ({
            ...s,
            processedUrl: processStickerData(s.sourceCanvas)
          })));
        }, 30);

        return () => clearTimeout(timer);
      }, [processStickerData, originalImage]);

      const generateLineOfficialAsset = (sourceDataUrl, targetW, targetH) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const scale = Math.min((targetW - 12) / img.width, (targetH - 12) / img.height);
            const dw = img.width * scale;
            const dh = img.height * scale;
            const dx = (targetW - dw) / 2;
            const dy = (targetH - dh) / 2;

            ctx.drawImage(img, dx, dy, dw, dh);
            resolve(canvas.toDataURL('image/png').split(',')[1]);
          };
          img.src = sourceDataUrl;
        });
      };

      const handleDownloadSingle = (dataUrl, index) => {
        const fileName = useLineNaming 
          ? `${formatNumber('01', index)}.png` 
          : `${filePrefix}_${formatNumber(startNumber, index)}.png`;
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const handleBatchDownload = async () => {
        if (!window.JSZip) {
          alert("系統正在載入 ZIP 打包元件，請稍候再試...");
          return;
        }

        setIsZipping(true);
        try {
          const zip = new window.JSZip();
          const packFolderName = useLineNaming ? `line_sticker_package` : `${filePrefix}_pack`;
          const folder = zip.folder(packFolderName);

          stickers.forEach((sticker, index) => {
            const base64Data = sticker.processedUrl.split(',')[1];
            const fileName = useLineNaming 
              ? `${formatNumber('01', index)}.png` 
              : `${filePrefix}_${formatNumber(startNumber, index)}.png`;
            folder.file(fileName, base64Data, { base64: true });
          });

          if (includeOfficialAssets && stickers[coverIndex]) {
            const coverUrl = stickers[coverIndex].processedUrl;
            const mainBase64 = await generateLineOfficialAsset(coverUrl, 240, 240);
            const tabBase64 = await generateLineOfficialAsset(coverUrl, 96, 74);
            folder.file("main.png", mainBase64, { base64: true });
            folder.file("tab.png", tabBase64, { base64: true });
          }

          const content = await zip.generateAsync({ type: "blob" });
          const url = URL.createObjectURL(content);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${packFolderName}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error("ZIP Generation failed:", err);
          alert("打包失敗，請重試！");
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
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        
        const x = Math.floor((clientX / rect.width) * CONFIG.cellW);
        const y = Math.floor((clientY / rect.height) * CONFIG.cellH);
        
        const ctx = sticker.sourceCanvas.getContext('2d');
        const p = ctx.getImageData(Math.max(0, Math.min(x, CONFIG.cellW - 1)), Math.max(0, Math.min(y, CONFIG.cellH - 1)), 1, 1).data;
        
        const hex = "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1).toUpperCase();
        setTargetColor(hex);
      };

      const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
      };

      const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
      };

      const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processFile(e.dataTransfer.files[0]);
        }
      };

      const getBgStyle = () => {
        if (previewBg === 'white') return { backgroundColor: '#ffffff' };
        if (previewBg === 'black') return { backgroundColor: '#000000' };
        if (previewBg === 'line-green') return { backgroundColor: '#7AC043' };
        return {
          backgroundImage: 'linear-gradient(45deg, #2a2e3f 25%, transparent 25%), linear-gradient(-45deg, #2a2e3f 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2a2e3f 75%), linear-gradient(-45deg, transparent 75%, #2a2e3f 75%)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          backgroundColor: '#121624'
        };
      };

      return (
        <div className="w-full min-h-screen bg-[#0b0c15] p-4 md:p-8 font-sans text-slate-200">
          <div className="max-w-[1440px] mx-auto">
            
            {/* Header */}
            <div className="bg-[#151926] rounded-2xl shadow-xl p-6 mb-8 border border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r opacity-80 transition-colors duration-500 ${mode === 'emoji' ? 'from-amber-400 via-orange-500 to-red-500' : 'from-indigo-500 via-purple-500 to-pink-500'}`}></div>
              
              <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3 text-white tracking-tight">
                  <div className={`p-2.5 rounded-xl shadow-lg transition-colors duration-500 ${mode === 'emoji' ? 'bg-orange-500 shadow-orange-500/20' : 'bg-indigo-600 shadow-indigo-500/20'}`}>
                    {mode === 'emoji' ? <Smile className="w-6 h-6 text-white" /> : <Scissors className="w-6 h-6 text-white" />}
                  </div>
                  Sticker Splitter <span className={`${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'} font-light`}>Pro Max</span>
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  外圍泛洪防穿孔去背 • 自動生成 main / tab 官方審核圖 • <span className={`font-semibold ${mode === 'emoji' ? 'text-orange-300' : 'text-indigo-300'}`}>{CONFIG.label}模式</span>
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
                    className="flex items-center gap-1.5 px-3.5 py-2 text-slate-300 bg-[#1e2336] hover:bg-[#252b42] border border-slate-700 hover:border-slate-600 rounded-xl transition-all shadow-md text-xs font-medium active:scale-95"
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
                
                {/* 左側：控制面板 */}
                <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                  
                  <div className="bg-[#151926] text-gray-200 rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#1a2030]">
                      <h2 className={`font-bold text-sm flex items-center gap-2 transition-colors ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>
                        <Settings className="w-4 h-4" />
                        去背與演算法控制
                      </h2>
                      <div 
                        className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 ${enableSmartRemove ? (mode === 'emoji' ? 'bg-orange-500' : 'bg-indigo-600') + ' shadow-inner' : 'bg-slate-700'}`}
                        onClick={() => setEnableSmartRemove(!enableSmartRemove)}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${enableSmartRemove ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                    </div>

                    {enableSmartRemove && (
                      <div className="p-5 space-y-5">
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                            去背模式 (防止破洞)
                          </label>
                          <div className="grid grid-cols-2 gap-2 p-1 bg-[#0f1117] rounded-xl border border-slate-800">
                            <button
                              onClick={() => setRemovalMode('flood')}
                              className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all text-center ${
                                removalMode === 'flood'
                                  ? (mode === 'emoji' ? 'bg-orange-500 text-white shadow-sm' : 'bg-indigo-600 text-white shadow-sm')
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              🛡️ 外圍泛洪 (推薦)
                            </button>
                            <button
                              onClick={() => setRemovalMode('global')}
                              className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all text-center ${
                                removalMode === 'global'
                                  ? (mode === 'emoji' ? 'bg-orange-500 text-white shadow-sm' : 'bg-indigo-600 text-white shadow-sm')
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              🌐 全圖色鍵
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1.5 leading-tight">
                            {removalMode === 'flood' ? '💡 外圍泛洪：遇到白邊即停止，角色身上的綠眼/綠衣服不會被挖空。' : '💡 全圖色鍵：全畫面符合顏色的像素皆會去背。'}
                          </p>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">快捷底色</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => handlePreset('green')}
                              className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#0f1117] border border-slate-700 hover:border-emerald-500 transition-all text-xs font-semibold text-slate-300 hover:text-white"
                            >
                              <div className="w-3.5 h-3.5 rounded-full bg-[#00FF00] shadow"></div>
                              綠幕 (#00FF00)
                            </button>
                            <button 
                              onClick={() => handlePreset('black')}
                              className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#0f1117] border border-slate-700 hover:border-slate-500 transition-all text-xs font-semibold text-slate-300 hover:text-white"
                            >
                              <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-600 shadow"></div>
                              黑底 (#000000)
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-[#0f1117] p-3 rounded-xl border border-slate-800">
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-slate-400 flex items-center gap-1 font-medium"><Layers className="w-3.5 h-3.5"/> 邊緣向內裁切 (消除黑邊)</span>
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

                          <div className="bg-[#0f1117] p-3 rounded-xl border border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-slate-400 font-medium">目標去背色</span>
                              <span className="text-xs font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">{targetColor}</span>
                            </div>
                            <div className="flex gap-2">
                              <div className="relative flex-1 h-8 rounded-lg overflow-hidden border border-slate-700">
                                <input 
                                  type="color" 
                                  value={targetColor}
                                  onChange={(e) => setTargetColor(e.target.value)}
                                  className="absolute -top-3 -left-3 w-[150%] h-[150%] cursor-pointer bg-transparent" 
                                />
                              </div>
                              <div className="h-8 px-2.5 flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs cursor-pointer">
                                <Droplet className="w-3.5 h-3.5 text-yellow-400" />
                                <span>吸色</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400 font-medium">色彩容許度 (Tolerance)</span>
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
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400 font-medium">邊緣柔化 (Smoothness)</span>
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

                          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                            <span className="text-xs text-slate-300 font-medium">綠光溢色去除 (Despill)</span>
                            <div 
                              className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${despill ? (mode === 'emoji' ? 'bg-orange-500' : 'bg-indigo-600') : 'bg-slate-700'}`}
                              onClick={() => setDespill(!despill)}
                            >
                              <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${despill ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 匯出設定 */}
                  <div className="bg-[#151926] rounded-2xl shadow-xl border border-slate-800/80 overflow-hidden">
                    <div className="p-4 bg-[#1a2030] border-b border-slate-800 flex justify-between items-center">
                      <h3 className={`font-bold flex items-center gap-2 text-sm ${mode === 'emoji' ? 'text-orange-400' : 'text-indigo-400'}`}>
                        <Package className="w-4 h-4" />
                        LINE 官方上架打包規範
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="p-3 bg-[#0f1117] rounded-xl border border-slate-800 space-y-2">
                        <label className="flex items-center justify-between text-xs font-semibold text-slate-200 cursor-pointer">
                          <span className="flex items-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-yellow-400" />
                            自動生成 main.png & tab.png
                          </span>
                          <input 
                            type="checkbox"
                            checked={includeOfficialAssets}
                            onChange={(e) => setIncludeOfficialAssets(e.target.checked)}
                            className="rounded bg-slate-800 border-slate-600 text-indigo-600 cursor-pointer"
                          />
                        </label>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-slate-400">命名規範</label>
                          <button
                            onClick={() => setUseLineNaming(!useLineNaming)}
                            className={`text-[11px] px-2 py-0.5 rounded font-semibold transition ${useLineNaming ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}
                          >
                            {useLineNaming ? '✓ LINE官方規範 (01.png)' : '自訂前綴模式'}
                          </button>
                        </div>

                        {!useLineNaming && (
                          <div className="space-y-2 pt-1">
                            <input 
                              type="text" 
                              value={filePrefix}
                              onChange={(e) => setFilePrefix(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#0f1117] border border-slate-700 rounded-lg text-slate-200 outline-none"
                              placeholder="前綴 (如 sticker)"
                            />
                            <input 
                              type="text" 
                              value={startNumber}
                              onChange={(e) => setStartNumber(e.target.value)}
                              className="w-full px-3 py-2 text-xs bg-[#0f1117] border border-slate-700 rounded-lg text-slate-200 font-mono outline-none"
                              placeholder="起始號 (如 01)"
                            />
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={handleBatchDownload}
                        disabled={isZipping}
                        className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg disabled:opacity-50 active:scale-[0.98]
                          ${mode === 'emoji' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 shadow-orange-900/30' 
                            : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/30'}`}
                      >
                        {isZipping ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            正在打包並縮放官方圖檔...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            一鍵打包全部貼圖 (.ZIP)
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 右側：貼圖網格 */}
                <div className="lg:col-span-8 xl:col-span-9 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#151926] py-2.5 px-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${mode === 'emoji' ? 'bg-orange-500' : 'bg-indigo-500'}`}></span>
                      規格：<span className="font-mono text-slate-200 font-bold">{CONFIG.cellW} × {CONFIG.cellH} px</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-[#0f1117] p-1 rounded-lg border border-slate-800">
                      <span className="text-[11px] text-slate-400 px-1">檢視底色：</span>
                      <button
                        onClick={() => setPreviewBg('checker')}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition ${previewBg === 'checker' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                      >
                        🏁 透明
                      </button>
                      <button
                        onClick={() => setPreviewBg('white')}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition ${previewBg === 'white' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}
                      >
                        ⚪ 白底
                      </button>
                      <button
                        onClick={() => setPreviewBg('black')}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition ${previewBg === 'black' ? 'bg-slate-900 text-white border border-slate-600' : 'text-slate-400 hover:text-white'}`}
                      >
                        ⚫ 黑底
                      </button>
                      <button
                        onClick={() => setPreviewBg('line-green')}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition ${previewBg === 'line-green' ? 'bg-[#7AC043] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                      >
                        🟢 LINE綠
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                    {stickers.map((sticker, index) => {
                      const isCover = coverIndex === index;
                      const fileName = useLineNaming 
                        ? `${formatNumber('01', index)}.png` 
                        : `${filePrefix}_${formatNumber(startNumber, index)}.png`;

                      return (
                        <div key={sticker.id} className={`group relative bg-[#151926] rounded-2xl shadow-lg border overflow-hidden transition-all duration-200 hover:scale-[1.02] ${
                          isCover ? 'border-yellow-400 shadow-yellow-500/10' : 'border-slate-800 hover:border-slate-600'
                        }`}>
                          <div className="flex justify-between items-center p-2 bg-[#1a2030] border-b border-slate-800/80 text-[10px] font-semibold">
                            <span className="flex items-center gap-1 text-slate-300">
                              #{index + 1}
                              {isCover && <span className="bg-yellow-400/20 text-yellow-300 px-1 py-0.2 rounded border border-yellow-400/40">封面 (main)</span>}
                            </span>
                            <span className="font-mono text-slate-400">{fileName}</span>
                          </div>

                          <div 
                            className="relative cursor-crosshair overflow-hidden flex items-center justify-center p-2"
                            style={{ 
                              aspectRatio: `${CONFIG.cellW}/${CONFIG.cellH}`,
                              ...getBgStyle()
                            }}
                            onClick={(e) => pickColorFromSticker(e, sticker)}
                          >
                            <img 
                              src={sticker.processedUrl} 
                              className="relative z-10 max-w-full max-h-full object-contain pointer-events-none"
                              alt={`Sticker ${index + 1}`}
                            />

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalSticker({ ...sticker, index, fileName });
                              }}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
                              title="放大檢視"
                            >
                              <ZoomIn size={14} />
                            </button>
                          </div>

                          <div className="p-2 bg-[#151926] border-t border-slate-800 flex gap-1.5">
                            <button 
                              onClick={() => setCoverIndex(index)}
                              className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex-1 ${
                                isCover 
                                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' 
                                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
                              }`}
                            >
                              {isCover ? '★ 封面圖' : '設為封面'}
                            </button>
                            <button 
                              onClick={() => handleDownloadSingle(sticker.processedUrl, index)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all"
                            >
                              <Download size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-3xl p-8 md:p-20 text-center bg-[#151926]/50 flex flex-col items-center justify-center min-h-[520px] transition-all duration-300 group overflow-hidden ${
                  isDragging 
                    ? (mode === 'emoji' ? 'border-orange-500 bg-orange-500/10' : 'border-indigo-500 bg-indigo-500/10')
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`w-24 h-24 bg-[#1e2336] rounded-3xl flex items-center justify-center mb-6 transition-all duration-300 shadow-2xl border border-slate-700/50 group-hover:scale-105 ${mode === 'emoji' ? 'group-hover:border-orange-500/40' : 'group-hover:border-indigo-500/40'}`}>
                  {mode === 'emoji' ? 
                    <Smile className="w-12 h-12 text-orange-400" /> : 
                    <LayoutGrid className="w-12 h-12 text-indigo-400" />
                  }
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  上傳您的 <span className={`text-transparent bg-clip-text bg-gradient-to-r ${mode === 'emoji' ? 'from-orange-400 to-red-400' : 'from-indigo-400 to-purple-400'}`}>{CONFIG.label}</span> 網格大圖
                </h3>
                
                <p className="text-slate-400 mb-8 text-sm md:text-base max-w-lg leading-relaxed">
                  支援 Midjourney 生成的 4×3 網格圖（建議總尺寸：<span className="text-slate-200 font-mono bg-slate-800 px-2 py-0.5 rounded font-semibold">{CONFIG.uploadHint}</span>）
                  <br/>自動等比分割為 12 格，並支援「外圍泛洪防穿孔去背」與「LINE 官方規格打包」。
                </p>
                
                <label className={`group/btn flex items-center gap-3 px-8 py-4 text-white rounded-2xl cursor-pointer transition-all shadow-xl font-bold text-base md:text-lg hover:-translate-y-0.5 active:scale-95
                  ${mode === 'emoji' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-900/30' 
                    : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/30'}`}>
                  <Upload className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" />
                  <span>選擇圖片檔案 或 拖曳至此處</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
                
                <p className="mt-4 text-xs text-slate-500">支援 PNG, JPG, WebP 格式 • 支援拖曳直接上傳</p>
              </div>
            )}

          </div>

          {/* Lightbox Modal */}
          {activeModalSticker && (
            <div 
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setActiveModalSticker(null)}
            >
              <div 
                className="bg-[#151926] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">貼圖檢視 #{activeModalSticker.index + 1}</span>
                    <span className="font-mono text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{activeModalSticker.fileName}</span>
                  </div>
                  <button 
                    onClick={() => setActiveModalSticker(null)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div 
                  className="w-full rounded-2xl flex items-center justify-center p-4 overflow-hidden mb-5"
                  style={{
                    aspectRatio: `${CONFIG.cellW}/${CONFIG.cellH}`,
                    ...getBgStyle()
                  }}
                >
                  <img 
                    src={activeModalSticker.processedUrl} 
                    className="max-w-full max-h-full object-contain"
                    alt="放大預覽"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCoverIndex(activeModalSticker.index);
                      setActiveModalSticker(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500/30 transition flex items-center justify-center gap-1.5"
                  >
                    <Crown size={14} /> 設為封面圖 (main.png)
                  </button>
                  <button
                    onClick={() => handleDownloadSingle(activeModalSticker.processedUrl, activeModalSticker.index)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center justify-center gap-1.5"
                  >
                    <Download size={14} /> 下載此單張
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      );
    };

    // ==========================================
    // Main App Component
    // ==========================================
    function App() {
      const [activeTab, setActiveTab] = useState('generator');
      const [globalMode, setGlobalMode] = useState('sticker');

      return (
        <div className="flex flex-col min-h-screen font-sans bg-[#0b0c15]">
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

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/80">
                    v2.3 Content Pro
                  </span>
                </div>
              </div>
            </div>
            
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
