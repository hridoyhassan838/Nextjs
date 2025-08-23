const { exec } = require('child_process');
const chokidar = require('chokidar');

// watch করা ফোল্ডার
const folder = '.';
// watcher সেটআপ
const watcher = chokidar.watch(folder, {
  ignored: /node_modules|\.git|\.next/, // বাদ দেওয়ার ফোল্ডার
  persistent: true,
});

function updateTree() {
  exec(`tree -a -I 'node_modules|.next|.git' -L 5 > website_structure.txt`, (err, stdout, stderr) => {
    if (err) console.error(err);
    else console.log('✅ website_structure.txt update');
  });
}

// change, add, unlink সব ট্রিগার
watcher.on('all', (event, path) => {
  console.log(event, path);
  updateTree();
});

// প্রথমবারও আপডেট
updateTree();