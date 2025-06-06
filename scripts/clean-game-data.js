const fs = require('fs');
const path = require('path');

// 读取game.json文件
const filePath = path.join(process.cwd(), 'game.json');
let gameData;

try {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  gameData = JSON.parse(fileContents);
  console.log(`Successfully loaded game data with ${gameData.length} games.`);
} catch (error) {
  console.error('Error reading or parsing game.json:', error);
  process.exit(1);
}

// 清理函数：替换常见的错误编码字符
function cleanText(text) {
  if (!text) return text;
  
  // 检查文本中是否包含可能导致正则表达式错误的字符
  const hasRegexIssue = /(?<!\\)\/(?![^\/]*\/)/.test(text); // 检查未闭合的正斜杠
  
  let cleaned = text
    // 替换常见的错误编码的撇号和引号
    .replace(/鈥檙e/g, "'re")
    .replace(/鈥檝e/g, "'ve")
    .replace(/鈥檚/g, "'s")
    .replace(/鈥檛/g, "'t")
    .replace(/鈥檒l/g, "'ll")
    .replace(/鈥檇/g, "'d")
    .replace(/鈥檓/g, "'m")
    .replace(/鈥/g, "'")
    .replace(/鈥/g, '"')
    .replace(/鈥/g, '"')
    // 修复其他可能的编码问题
    .replace(/[\uFFFD\uFFFE\uFFFF]/g, '') // 替换无效的Unicode字符
    .replace(/[\u0080-\u009F]/g, '') // 替换控制字符
    .replace(/\\+(?![bnrt'"\\/])/g, '\\'); // 修复不正确的转义序列
  
  // 额外处理正则表达式相关的问题
  if (hasRegexIssue) {
    console.log('Found potential regex issue in:', text);
    // 转义所有未转义的正斜杠，或者替换为其他字符
    cleaned = cleaned.replace(/(?<!\\)\//g, '\\/');
  }
  
  // 处理不匹配的正则表达式分隔符
  cleaned = cleaned.replace(/(?<!\\)\/([^\/]*?)$/g, '\\/$1');
  
  return cleaned;
}

// 检查整个JSON字符串中是否有潜在问题
function checkForPotentialIssues(data) {
  // 将整个JSON转为字符串进行检查
  const jsonString = JSON.stringify(data);
  
  // 检查各种可能导致问题的模式
  const potentialIssues = [
    { pattern: /(?<!\\)\//g, name: "未转义的斜杠" },
    { pattern: /[\u0080-\u00FF]+/g, name: "非ASCII字符" },
    { pattern: /\\[^"\\\/bfnrtu]/g, name: "无效的转义序列" },
    { pattern: /[\uD800-\uDFFF]/g, name: "无效的Unicode代理对" }
  ];
  
  let hasIssues = false;
  potentialIssues.forEach(issue => {
    const matches = jsonString.match(issue.pattern);
    if (matches && matches.length > 0) {
      console.log(`找到潜在问题: ${issue.name}，出现 ${matches.length} 次`);
      hasIssues = true;
      
      // 打印一些匹配的上下文
      if (matches.length < 10) {
        matches.forEach(match => {
          const index = jsonString.indexOf(match);
          const context = jsonString.substring(
            Math.max(0, index - 20), 
            Math.min(jsonString.length, index + match.length + 20)
          );
          console.log(`  上下文: ...${context}...`);
        });
      }
    }
  });
  
  return hasIssues;
}

// 首先检查整个数据集是否有潜在问题
const hasGlobalIssues = checkForPotentialIssues(gameData);
if (hasGlobalIssues) {
  console.log("在数据中发现潜在问题，将尝试清理...");
}

// 处理游戏数据
let cleanedCount = 0;
gameData.forEach((game, index) => {
  const originalTitle = game.title;
  const originalDescription = game.description;
  const originalTags = game.tags;
  
  // 清理所有文本字段
  game.title = cleanText(game.title);
  game.description = cleanText(game.description);
  game.tags = cleanText(game.tags);
  
  // 检查是否有更改
  if (game.title !== originalTitle || 
      game.description !== originalDescription ||
      game.tags !== originalTags) {
    cleanedCount++;
    console.log(`清理游戏 #${index + 1}: ${originalTitle} -> ${game.title}`);
  }
});

console.log(`\n清理了 ${cleanedCount} 个游戏，共 ${gameData.length} 个。`);

// 再次检查清理后的数据
if (checkForPotentialIssues(gameData)) {
  console.log("警告：清理后的数据仍然可能存在问题。");
}

// 保存修复后的数据
try {
  const backupPath = path.join(process.cwd(), 'game.json.bak');
  fs.copyFileSync(filePath, backupPath);
  console.log(`备份已创建：${backupPath}`);
  
  fs.writeFileSync(filePath, JSON.stringify(gameData, null, 2), 'utf8');
  console.log(`更新后的游戏数据已保存到 ${filePath}`);
} catch (error) {
  console.error('保存清理后的游戏数据时出错:', error);
  process.exit(1);
}

console.log('游戏数据清理成功完成!'); 