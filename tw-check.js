let localDir = __dirname;
let installedDir = process.env.INIT_CWD;

const fs = require('fs');

let check = () => {
  if (localDir === installedDir) return;

  //if they are not using tailwind return early
  if (!fs.existsSync(`${installedDir}/tailwind.config.js`))
    return console.log('no tw');

  const files = [
    'react-calendar.cjs.development.js',
    'react-calendar.cjs.production.min.js',
    'react-calendar.esm.js',
  ];

  for (let file of files) {
    let filePath = `${localDir}/dist/${file}`;
    let contents = fs.readFileSync(filePath, { encoding: 'utf8' });
    fs.writeFileSync(filePath, contents.replace(/rc-/g, ''));
  }
};
check();
