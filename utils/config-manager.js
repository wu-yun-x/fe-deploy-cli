const fs = require('fs');
const path = require('path');
const { errorLog } = require('../utils/index');

const packageJsonPath = path.join(process.cwd(), 'package.json');

let deployConfigExt = 'js';

try {
    const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
    const packageData = JSON.parse(packageJson);
    if (packageData.type === 'module') {
        deployConfigExt = 'cjs';
    }
} catch (err) {
    errorLog('无法读取 package.json 文件或解析其内容');
    process.exit(1);
}

const deployPath = path.join(process.cwd(), './deploy');
const deployConfigPath = path.join(deployPath, `deploy.config.${deployConfigExt}`);

module.exports = {
    deployConfigPath,
    deployConfigExt,
    readDeployConfig() {
        if (fs.existsSync(deployConfigPath)) {
            return require(deployConfigPath);
        } else {
            errorLog('deploy.config 文件不存在');
            return null;
        }
    }
};