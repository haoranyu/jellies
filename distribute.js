const fs = require("fs");
const path = require("path");

function displayFile(param) {
  fs.stat(param, function(err, stats) {
    if (stats.isDirectory()) {
      fs.readdir(param, function(err, file) {
        if (file) {
          file.forEach(e => {
            const absolutePath = path.resolve(path.join(param, e));
            displayFile(absolutePath);
            const aimPath =
              path.resolve(
                "src/components/" +
                  absolutePath
                    .substring(absolutePath.lastIndexOf("/") + 1)
                    .slice(0, -4)
              ) + "/style.css";
            fs.copyFileSync(absolutePath, aimPath, () => {});
          });
        }
      });
    }
  });
}

function removeDir(pathname) {
  if (fs.existsSync(pathname)) {
    if (fs.statSync(pathname).isDirectory()) {
      let arr = [];
      arr = fs.readdirSync(pathname);
      arr.forEach((item) => {
        removeDir(pathname + "/" + item);
      });
      fs.rmdirSync(pathname);
    } else {
      fs.unlinkSync(pathname);
    }
  }
}

displayFile("./theme/");
removeDir("./theme/");
