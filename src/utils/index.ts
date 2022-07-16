import { parse } from 'yaml';
const path = require('path');
const fs = require('fs');

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv();
  // process.env 为nodejs中的环境对象,保存着系统的环境的变量信息
  // process.cwd() 方法返回 Node.js 进程的当前工作目录。
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  console.log(yamlPath, process.cwd());

  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
