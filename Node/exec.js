const { exec } = require("child_process");

function processExec(command, folder) {
  return new Promise((resolve) => {
    exec(command, { cwd: folder }, (err, data) => {
      if (err !== null) {
        resolve({ status: "error", message: err.toString() });
      } else {
        resolve({ status: "success", message: data.toString() });
      }
    });
  });
}

const path = "C:\\Users\\***\\Desktop\\study-project\\ninja";
function sanitizePath(path) {
  return path.replace(
    /^([a-z]):\\/i,
    (_, letter) => `${letter.toUpperCase()}:\\`
  );
}
processExec("ninja --version", sanitizePath(path)).then((res) => {
  console.log(res);
});
