
import { ChartData, DataPoint, HistoricalEra, FutureScenario } from './types';
import { Shield, Zap, TrendingUp, Anchor, Cpu, Factory, Database, Brain, Target, Layers } from 'lucide-react';

export const DATA_SOURCES = {
  engels: "Source: Robert C. Allen (2009). 'Engels' Pause: Technical Change, Capital Accumulation, and Inequality in the British Industrial Revolution'.",
  modern: "Source: Economic Policy Institute (EPI), 'The Productivity-Pay Gap' (1979-2021); Bureau of Labor Statistics (BLS).",
  polarization: "Source: David Autor (MIT), 'The Polarization of Job Opportunities in the U.S. Labor Market' (2010)."
};

// Stylized data based on Robert Allen's indices (1860=100 base re-indexed)
export const ENGELS_PAUSE_DATA: DataPoint[] = [
  { year: 1780, productivity: 100, wages: 100 },
  { year: 1790, productivity: 105, wages: 101 },
  { year: 1800, productivity: 112, wages: 100, event: "卢德运动 (开始)" },
  { year: 1810, productivity: 120, wages: 98, event: "破坏机器法案 (死刑)" },
  { year: 1820, productivity: 135, wages: 99 },
  { year: 1830, productivity: 150, wages: 102 },
  { year: 1840, productivity: 170, wages: 105, event: "恩格斯的停顿结束" },
  { year: 1850, productivity: 195, wages: 130, event: "教育与工会改革" },
  { year: 1860, productivity: 220, wages: 160 },
  { year: 1870, productivity: 250, wages: 195 },
];

// Stylized data based on EPI Productivity-Pay Gap
export const MODERN_DIVERGENCE_DATA: DataPoint[] = [
  { year: 1980, productivity: 100, wages: 100 },
  { year: 1990, productivity: 125, wages: 110 },
  { year: 2000, productivity: 155, wages: 115, event: "计算机化/全球化" },
  { year: 2010, productivity: 185, wages: 118, event: "中产空心化" },
  { year: 2020, productivity: 215, wages: 122, event: "AI 冲击开始" },
  { year: 2024, productivity: 235, wages: 123, event: "认知自动化" },
];

export const TRAP_LOGIC_MAP: ChartData = {
  nodes: [
    { 
      id: 'tech_shock', 
      label: '技术变革', 
      type: 'cause', 
      x: 450, y: 50, 
      description: "技术本身是中性的，但其属性（取代 vs 赋能）决定了初始冲击。",
      detailedMarkdown: `
### 技术变革的双重性 (The Duality of Tech)

技术进步并不是线性的福祉增长，而是在 **取代 (Replacing)** 与 **赋能 (Enabling)** 之间摆动。

#### 1. 取代型技术 (Replacing) - "做同样的事但更便宜"
- **定义**：直接替代人类执行现有任务，通常导致零和博弈。
- **历史**：19世纪的动力织机替代了织工；今天的生成式 AI 替代初级程序员、插画师和翻译。
- **后果**：技能贬值，工资停滞，资本份额上升。 **"去技能化"** 是其核心特征。

#### 2. 赋能型技术 (Enabling) - "做以前做不到的事"
- **定义**：帮助人类更高效地完成新任务，或创造全新领域。
- **历史**：电力创造了全新的夜间经济和家用电器；望远镜赋能天文学家；CAD 软件赋能工程师。
- **后果**：创造新职业，技能溢价，中产阶级扩张。 **"再技能化"** 是其核心特征。

**当前危机**：
生成式 AI 正从“辅助工具”转向 **“通用认知替代”** 。它不仅是自动化的工具，更是 **认知能力的量产** 。这意味着入门级认知工作（"职业阶梯的第一级"）正在被蒸发。
      `,
      relatedConcepts: ["劳动力替代", "技能过时", "创造性破坏", "通用认知技术"]
    },
    { 
      id: 'short_term', 
      label: '短期破坏', 
      type: 'effect', 
      x: 450, y: 250, 
      description: "技能贬值与恩格斯停顿。这是“痛苦的转型期”。",
      detailedMarkdown: `
### 短期破坏 (Short-Run Disruption)

> "从长远来看，我们都死了。" —— 凯恩斯

虽然长期来看技术能把蛋糕做大，但在短期（可能长达 40-60 年，即两代人）内，它会让很多人的生活变糟。

#### 恩格斯的停顿 (Engels' Pause)
指工业革命初期（1790-1840）：
- **产出飙升**：人均 GDP 增长。
- **工资停滞**：工人实际工资在 50 年间几乎没有增长。
- **利润暴涨**：收益全部流向了购买机器的资本家。

#### 现代回响：劳动力市场的"哑铃型"分化
第三次工业革命（计算机化）导致了中产阶级的**空心化**：
- **顶层**（抽象认知）：收入暴涨。
- **底层**（体力服务）：难以替代，但工资低。
- **中层**（常规认知/体力）：如会计、柜员、装配工，正在被系统性消除。

**心理冲击**：工作不仅是收入来源，也是尊严来源。AI 对“认知劳动”的解构，让知识工作者面临前所未有的存在主义危机。
      `,
      relatedConcepts: ["恩格斯的停顿", "中产空心化", "哑铃型社会", "技能贬值"]
    },
    { 
      id: 'institution_gap', 
      label: '制度滞后', 
      type: 'cause', 
      x: 450, y: 500, 
      description: "技术呈指数级发展，而制度呈线性演变。这种滞后是混乱的根源。",
      detailedMarkdown: `
### 制度滞后 (Institutional Lag)

**核心论点**：技术陷阱的根源不在于技术本身，而在于**制度响应的速度**。这是所有国家都会经历的十字路口。

#### 历史的时间差
- **第一次工业革命**：技术突破（1760s） → 制度改革（1870s 教育法/工会法）。**滞后 110 年**。结果：三代人的痛苦与暴乱。
- **第二次工业革命**：技术突破（1880s） → 制度改革（1910s 高中运动）。**滞后 30-40 年**。结果：相对快速的繁荣。
- **AI 时代**：ChatGPT 用户破亿仅用 2 个月，而教育体系改革通常需要 10-20 年。我们正处于 **"永久性适应危机"** 中。

#### 为什么制度总是慢半拍？
1. **认知惯性**：当权者往往是旧模式的受益者。
2. **利益集团阻力**：正如罗马皇帝拒绝新技术以维持奴隶制稳定，既得利益者会阻碍变革。
3. **政治极化**：社会撕裂导致立法僵局，难以达成共识。
      `,
      relatedConcepts: ["制度变迁", "时间滞后", "教育改革", "政治僵局"]
    },
    { 
      id: 'resistance', 
      label: '社会反抗', 
      type: 'effect', 
      x: 140, y: 720, // Left Cluster
      description: "不要嘲笑卢德分子 (Luddites)。他们不是反科技的疯子，而是理性的经济行动者。",
      detailedMarkdown: `
### 社会反抗 (Social Resistance)

**关系定位**：这是“短期破坏”未能得到“制度缓解”后的必然并发症。

#### 历史镜像
*   **19世纪**：当织布机摧毁了生计，并没有任何社会保障时，砸毁机器是唯一的议价手段。英国政府不得不派兵 12,000 人镇压——人数超过了同期对拿破仑作战的军队。
*   **21世纪**：今天的反抗表现为对大型科技公司的监管呼声、反全球化浪潮、以及极右翼/极左翼民粹主义的兴起。

#### 核心逻辑
如果社会契约破裂，人们觉得“努力工作不再能带来更好的生活”，通过政治或暴力手段阻碍技术就成为必然选项。这是一种**政治上的失败**。
      `,
      relatedConcepts: ["卢德运动", "议价能力", "社会契约", "民粹主义"]
    },
    { 
      id: 'ford_paradox', 
      label: '经济短路', 
      type: 'trap', 
      x: 450, y: 720, // Center Cluster
      description: "亨利·福特的噩梦：消灭了生产者，也就消灭了消费者。",
      detailedMarkdown: `
### 经济短路 (The Economic Short-Circuit)

> **"消灭了生产者，也就消灭了消费者。"**

这是一个简单的宏观经济学会计恒等式。如果“制度滞后”未能解决分配问题，技术越进步，经济反而越脆弱。

#### 1. 亨利·福特的直觉
福特主动给工人 5 美元日薪（当时平均工资的 2 倍），不仅是为了留住人才，更是为了创造市场。**"如果我不给工人高工资，谁来买我的 T 型车？"**

#### 2. 现代的断裂 (The Blockage)
当制度（工会弱化、税收漏洞、零工经济）未能确保技术红利通过工资回流给大众时，经济血管就被血栓堵塞了：

1.  **生产端 (Supply)**：AI 与机器人疯狂提升效率，产出爆炸。
2.  **分配端 (Distribution)**：因为"去技能化"，工资占 GDP 比重持续下降（**制度性分配不公**）。
3.  **消费端 (Demand)**：大众购买力枯竭，无法消化过剩的产能。

**结果**：经济陷入**有效需求不足**的危机。这不是因为我们造不出东西，而是因为没人买得起。
      `,
      relatedConcepts: ["福特悖论", "有效需求不足", "宏观闭环", "分配正义"]
    },
    { 
      id: 'prosperity', 
      label: '包容性繁荣', 
      type: 'solution', 
      x: 760, y: 720, // Right Cluster
      description: "最好的结果：技术创造新工作，制度确保红利共享。",
      detailedMarkdown: `
### 长期繁荣 (Shared Prosperity)

这是第二次工业革命（1870-1950）实现的奇迹，也是我们当下的目标。它是对“制度滞后”的成功突围。

#### 成功的要素
1. **赋能型技术**：电力和内燃机不仅替代了蒸汽，更创造了数百万个前所未有的岗位（司机、电工、白领）。
2. **教育竞赛**：美国发起了 **“高中运动”** （High School Movement），让整整一代人掌握了操作新机器的技能，使劳动力供给跟上了技术需求。
3. **福利国家**：建立了社保、失业保险和工会谈判机制，平滑了转型期的阵痛。

**AI 时代的启示**：我们不能指望市场自动调节。必须主动设计“人机协作”的岗位，并建立全民基本收入 (UBI) 或全民再培训体系。
      `,
      relatedConcepts: ["互补性技术", "新就业形态", "福利国家", "高中运动"]
    },
    { 
      id: 'trap', 
      label: '技术陷阱', 
      type: 'trap', 
      x: 320, y: 1050, // Converged from Left and Center
      description: "最坏的结局：社会撕裂，动荡，以及潜在的技术停滞。",
      detailedMarkdown: `
### 技术陷阱 (The Technology Trap)

这是本书的标题，也是我们需要极力避免的深渊。它是所有负面路径的最终汇聚点。

#### 1. 罗马帝国的警示
罗马皇帝维斯帕先拒绝了发明家提供的高效运输石柱的机器，理由是：“我如何养活我的人民？”
在奴隶制下，劳动力极其廉价，且缺乏分配机制。统治者宁愿维持低效的就业以保稳定，也不愿采用技术。这导致了长达千年的技术停滞。

#### 2. 陷阱的两种形态
*   **停滞陷阱 (Stagnation Trap)**：为了维稳禁止技术（如罗马、清朝）。
    *   **结果**：社会稳定但贫困。
*   **贫困陷阱 (Inequality Trap)**：技术被采用，但红利被极少数“数字地主”垄断。
    *   **结果**：经济增长但社会撕裂，最终可能导致制度崩溃。

**终局风险**：我们可能正走向一种 **“新封建主义”** ，少数掌握算法和算力的人成为新贵族，而大众沦为无用阶级。
      `,
      relatedConcepts: ["停滞陷阱", "新封建主义", "贫困陷阱", "罗马警示"]
    },
  ],
  links: [
    { source: 'tech_shock', target: 'short_term', label: '冲击 (Shock)' },
    { source: 'short_term', target: 'institution_gap', label: '挑战 (Challenge)' },
    
    // Forking Paths - The Great Divergence
    { source: 'institution_gap', target: 'resistance', label: '政治响应失败' },
    { source: 'institution_gap', target: 'ford_paradox', label: '经济响应失败' },
    { source: 'institution_gap', target: 'prosperity', label: '制度突围成功' }, // Major Green Path
    
    // Convergence to Trap - The Vicious Cycles
    { source: 'ford_paradox', target: 'trap', label: '需求崩溃' }, // Major Red Path
    { source: 'resistance', target: 'trap', label: '社会动荡' }, // Major Red Path
    
    // Feedback Loop - The Virtuous Cycle
    { source: 'prosperity', target: 'tech_shock', label: '正向循环' }, // Major Blue Loop
  ]
};

export const ERAS: HistoricalEra[] = [
  {
    id: 'IR1',
    name: '第一次工业革命 (1750-1840)',
    yearStart: 1750,
    yearEnd: 1840,
    type: 'replacing',
    description: "蒸汽与纺织。机器直接替代了熟练工匠（去技能化），导致了长达半个世纪的工资停滞。",
    keyTechnologies: ['珍妮纺纱机', '蒸汽机', '动力织机'],
    socialImpact: "高度不平等，童工问题，卢德运动暴乱，恩格斯停滞。",
  },
  {
    id: 'IR2',
    name: '第二次工业革命 (1870-1920)',
    yearStart: 1870,
    yearEnd: 1920,
    type: 'enabling',
    description: "电力与内燃机。创造了全新的产业和岗位（再技能化），并伴随着“高中运动”带来的教育大扩张。",
    keyTechnologies: ['电力', '内燃机', '流水线', '化学工业'],
    socialImpact: "中产阶级崛起，工会成立，普及教育，大压缩（不平等缩小）。",
  },
  {
    id: 'IR3',
    name: '第三次工业革命 (1980-2023)',
    yearStart: 1980,
    yearEnd: 2023,
    type: 'replacing',
    description: "计算机化。具有「常规任务偏向性」(Routine-Biased)，替代了大量中等技能的白领和蓝领工作，导致中产阶级空心化。",
    keyTechnologies: ['个人电脑', '互联网', '工业机器人'],
    socialImpact: "中产阶级空心化，劳动力市场极化（哑铃型），赢家通吃。",
  },
  {
    id: 'AI_AGE',
    name: '人工智能时代 (2023-?)',
    yearStart: 2023,
    yearEnd: 2050,
    type: 'replacing',
    description: "生成式 AI 与认知自动化。从「工具」变为「通用目的认知技术」。职业阶梯的第一级（初级专业工作）正在被蒸发。",
    keyTechnologies: ['大语言模型', '生成式 AI', '具身智能'],
    socialImpact: "认知自动化，超级明星经济，数字地主阶级形成。",
  }
];

// Unified Comparison Insights (Canonical Truth)
export const COMPARISON_INSIGHTS: Record<string, string> = {
    // IR1 Comparisons
    'IR1_IR2': "【去技能化 vs 再技能化】第一次革命通过机械化将工匠变为普通操作工（技能贬值）；第二次革命通过电气化和新产业创造了全新的工程师和白领阶层（技能溢价）。前者引发冲突，后者带来融合。",
    'IR1_IR3': "【体力的替代 vs 脑力的替代】两者都属于“替代型”革命。IR1 摧毁了手工艺人（织工），IR3 摧毁了常规白领（文员）。两者都导致了劳动收入份额的下降和社会的极化，且初期都缺乏社会保障网。",
    'IR1_AI_AGE': "【历史的押韵：新恩格斯停顿】我们正站在新周期的起点。如同 19 世纪初，AI 带来了生产力的飞跃，但也可能导致长期的工资停滞。当时的卢德运动是对生计被毁的理性反应，今天我们看到的“技术抵制”和监管呼声也是同理。",
    
    // IR2 Comparisons
    'IR2_IR3': "【中产阶级的兴与衰】IR2 建立了庞大的中产阶级（橄榄型社会），而 IR3（计算机化）开始解构这一阶层（哑铃型社会）。IR2 时代，教育（高中运动）跑赢了技术；IR3 时代，技术跑赢了教育。",
    'IR2_AI_AGE': "【流水线悖论：正和 vs 零和】福特流水线通过降低产品成本创造了巨大的新需求，让普工也能致富（把蛋糕做大）。AI 则不同，它通过将认知成本归零直接摧毁了知识服务的稀缺性溢价，且不需要大量人类填补产能（挤出效应）。福特制造了“工作”，AI 旨在制造“无人闭环”。",

    // IR3 Comparisons
    'IR3_AI_AGE': "【从规则到概率】IR3 替代的是“基于规则”的常规任务（如计算、归档），因此高技能的创造性工作是安全的。但 AI 打破了这一防线，它能处理“非规则”的创造性任务（写作、编程）。避风港正在消失。",
};

// Data for Mirror Page: Macro Economic Paradox
export const FORD_VS_AI_DATA = {
    title: "流水线悖论：增量创造 vs 存量替代", 
    ford: {
        label: "福特范式 (1913)",
        target: "体力劳动 (肌肉)",
        economics: "正和博弈 (把蛋糕做大)",
        mechanism: "降本 → 需求爆发",
        impact: "去技能化，但就业大涨",
        insight: "汽车是新需求，需要无数工人填补产能。"
    },
    ai: {
        label: "AI 范式 (2024)",
        target: "认知劳动 (大脑)",
        economics: "零和/负和博弈 (挤出效应)",
        mechanism: "边际成本归零 → 供给过剩",
        impact: "智力溢价消失，中产坍塌",
        insight: "认知需求弹性有限，AI 旨在构建无人闭环。"
    }
};

// Data for Future Page: Micro Role Shift
export const COGNITIVE_PIPELINE_DATA = {
    title: "从体力解构到认知解构",
    columns: ["对比维度", "福特流水线 (1913)", "AI 认知流水线 (2025-)"],
    rows: [
        { dim: "解构对象", ford: "体力劳动 (造车)", ai: "认知劳动 (分析、创作、决策)" },
        { dim: "核心机制", ford: "任务标准化 + 分工", ai: "任务模块化 + AI协作" },
        { dim: "智慧转移", ford: "工匠大脑 → 流水线设计", ai: "知识工作者 → 系统架构" },
        { dim: "人类角色", ford: "执行者 → 监督者", ai: "执行者 → 定义者 + 评估者" }
    ],
    insight: "一条看不见的认知流水线正在成型。人类的价值从「环节中」迁移到了「两端」：上游定义目标，下游评估产出。"
};

export const FUTURE_SCENARIOS: FutureScenario[] = [
  {
    id: 'nordic',
    name: '路径 1：北欧模式 (包容性适应)',
    icon: Shield,
    color: 'text-green-400',
    mechanism: [
      '高税收 (50-60%)',
      '全民基本收入 (UBI)',
      '免费终身再培训'
    ],
    history: '瑞典 1990s 应对全球化时的“积极劳动力市场政策”。',
    outcome: ['✓ 高福利社会', '✓ 社会凝聚力强', '⚠️ 税基可能被侵蚀'],
    risk: '需要极强的社会共识，难以在异质化大国复制。'
  },
  {
    id: 'us',
    name: '路径 2：美国模式 (市场原教旨)',
    icon: Zap,
    color: 'text-cyan-400',
    mechanism: [
      '最小政府干预',
      '依赖市场自发调节',
      '赢家通吃'
    ],
    history: '1980s 里根-撒切尔革命。',
    outcome: ['❌ 新镀金时代', '❌ 社会极度撕裂', '✓ 创新活力最强'],
    risk: '政治动荡、民粹主义抬头、制度崩溃风险。'
  },
  {
    id: 'eu',
    name: '路径 3：欧陆模式 (防御性监管)',
    icon: Anchor,
    color: 'text-yellow-400',
    mechanism: [
      'GDPR 式严格监管',
      '就业保护法',
      'AI 伦理审查'
    ],
    history: '法国 35 小时工作制，德国解雇保护法。',
    outcome: ['⚠️ 相对经济衰退', '✓ 社会稳定性高', '❌ 创新外流'],
    risk: '在这个技术加速的时代，可能因效率低下而被全球边缘化。'
  }
];

export const PERSONAL_STRATEGIES = [
  {
    level: "战略定位",
    icon: Target,
    title: "错位竞争：寻找「锯齿状前沿」",
    skills: ["非结构化问题", "物理世界交互", "跨界缝合"],
    desc: "AI 的能力边界是不平整的。不要在 AI 擅长的领域（如海量数据、模式识别）硬碰硬。人类的护城河在于 AI 难以触及的缝隙：处理模糊的人际政治、应对突发的混乱现实、以及定义全新的问题。"
  },
  {
    level: "工作流重构",
    icon: Zap,
    title: "半人马模式：从执行者到指挥官",
    skills: ["AI 编排 (Orchestration)", "思维链设计", "幻觉鉴别"],
    desc: "未来不是「人 vs AI」，而是「人+AI」vs「人」。不要只把 AI 当搜索引擎。核心能力是将复杂任务拆解，像指挥军团一样调度 AI Agent，将你的单位时间产出杠杆化放大 100 倍。"
  },
  {
    level: "核心壁垒",
    icon: Brain,
    title: "稀缺的品味：从求解到提问",
    skills: ["审美判断 (Taste)", "批判性思维", "伦理决策"],
    desc: "当生成答案的边际成本趋近于零，稀缺的便不再是答案，而是「好问题」和「好品味」。你必须成为看门人 (Gatekeeper)，在海量生成的平庸内容中，筛选并注入只有人类具备的洞察与灵魂。"
  },
  {
    level: "情感价值",
    icon: Layers,
    title: "高感性：建立深度信任",
    skills: ["深度共情", "社群连接", "讲述故事"],
    desc: "技术越是高冷 (High-Tech)，人们越渴望温情 (High-Touch)。无论是医疗、教育还是咨询，那些涉及「人与人深度连接」、需要建立脆弱信任的领域，是硅基智能无法逾越的最后一公里。"
  }
];
