const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'uploads', 'banners');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const downloads = [
  { name: 'licey.jpg', url: 'https://tvardita.md/sites/default/files/2019-05/' + encodeURIComponent('Лицей') + '.jpg' },
  { name: 'library.jpg', url: 'https://tvardita.md/sites/default/files/2019-05/' + encodeURIComponent('Библиотека') + '.jpg' },
  { name: 'music_school.jpg', url: 'https://tvardita.md/sites/default/files/2020-01/colej1_0.jpg' },
  { name: 'ergobrix.jpg', url: 'https://tvardita.md/sites/default/files/2020-01/' + encodeURIComponent('ццц') + '.jpg' },
  { name: 'taraclia_district.jpg', url: 'https://tvardita.md/sites/default/files/2019-06/' + encodeURIComponent('Район Тараклия') + '.jpg' },
  { name: 'taraclia_city.jpg', url: 'https://tvardita.md/sites/default/files/2019-06/' + encodeURIComponent('Мэрия Тараклия') + '.jpg' },
  { name: 'gov.jpg', url: 'https://tvardita.md/sites/default/files/2019-06/' + encodeURIComponent('ПРАВИТЕЛЬСТВО') + '.jpg' }, // Trying to guess government URL based on pattern
  { name: 'fisc.jpg', url: 'https://tvardita.md/sites/default/files/2019-06/fisc.jpg' },
  { name: 'grt.png', url: 'https://grt.md/logo.png' },
  { name: 'tuk.png', url: 'https://tuk.md/wp-content/uploads/2026/01/tuklogo2.png' }
];

downloads.forEach(({name, url}) => {
  const dest = path.join(dir, name);
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download ${name} from ${url}: ${response.statusCode}`);
      return;
    }
    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
