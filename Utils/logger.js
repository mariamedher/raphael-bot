const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/ledger.json');

// Ensure file exists
if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, '[]');
}

function logUsage(type, member, command, details = '') {
  const timestamp = new Date().toISOString();

  const entry = {
    type,
    user: {
      tag: member.user.tag,
      id: member.user.id,
      nickname: member.nickname || member.user.username, // fallback to username if no nickname
    },
    command,
    details,
    timestamp
  };

  try {
    const currentLogs = JSON.parse(fs.readFileSync(logFilePath));
    currentLogs.push(entry);
    fs.writeFileSync(logFilePath, JSON.stringify(currentLogs, null, 2));
  } catch (err) {
    console.error('❌ Failed to write to ledger.json:', err);
  }
}

module.exports = { logUsage };