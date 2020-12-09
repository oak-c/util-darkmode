# 设备主题模式监听

![](https://img.shields.io/badge/Language-TypeScript-orange.svg)
[![Build Status](https://travis-ci.com/oak-c/util-darkmode.svg?branch=main)](https://travis-ci.com/oak-c/util-darkmode)
[![Coverage Status](https://coveralls.io/repos/github/oak-c/util-darkmode/badge.svg)](https://coveralls.io/github/oak-c/util-darkmode)
[![](https://img.shields.io/npm/v/util-darkmode.svg)](https://www.npmjs.com/package/util-darkmode)

### 安装

```bash
# 安装
npm i util-darkmode
# 或者 yarn add util-darkmode
```

### 更新记录

### 说明

```typescript
/* ----------类型说明----------*/
export enum Theme {
    DARK = 'dark', // 暗黑模式
    LIGHT = 'light', // 明亮模式
    NO_PREF = 'no-preference', // 未设置
    NO_SUPP = 'no-support', // 不支持
}
export type DarkMode = (
    config: (activeTheme: Theme, themes: typeof Theme) => void
) => { removeListeners: () => void }

/* ----------使用方式----------*/
import { darkmode } from 'util-darkmode'

// 注册监听
const dm = darkmode((theme, themes) => {
    // 处理业务，也可直接判断 theme === 'dark'
    if (theme === Theme.DARK) {
        // ...
    }
})

// 注销监听
dm.removeListeners()
```
