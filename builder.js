const shell = require('shelljs');
const fs = require('fs');

console.log('开始打包到生产环境!');
if (shell.exec('roadhog build').code !== 0) {
    shell.echo('Error: build commit failed!');
    shell.exit(1);
}
    
console.log('成功打包成功!');
fs.exists('assets', exists => {
    if (exists) {
        if (shell.rm('-rf', 'assets').code !== 0) {
            shell.echo('Error: delete assets failed!');
            shell.exit(1);
        }
        if (shell.mv('-n', 'dist', 'assets').code !== 0) {
            shell.echo('Error: build commit failed!');
            shell.exit(1);
        }
    } else {
        if (shell.mv('-n', 'dist', 'assets').code !== 0) {
            shell.echo('Error: build commit failed!');
            shell.exit(1);
        }
    }
});
