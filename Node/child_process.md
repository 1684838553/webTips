1. [child_process.spawn(command[, args][, options])](http://nodejs.cn/api/child_process.html#child_processspawncommand-args-options)

2. [cross-spawn](https://www.npmjs.com/package/cross-spawn)

3. 子进程参数 cwd 执行目录

   ```typescript
   function sanitizePath(path: string): string {
     return path.replace(
       /^([a-z]):\\/i,
       (_, letter) => `${letter.toUpperCase()}:\\`
     );
   }
   ```
