const { spawn } = require("child_process");

const ls = spawn("git", ["init"], {
  shell: true,
  encoding: "utf-8",
  cwd: "C:\\Users\\16848\\Desktop\\study-project\\demo1111",
});

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data.toString()}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data.toString()}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
