const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const excludeFiles = ['_layout.astro', '_error.astro']; // Add any files you want to exclude

const getRoutes = (dir, routePrefix = '') => {
  let routes = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      routes = routes.concat(getRoutes(filePath, `${routePrefix}/${file}`));
    } else if (stat.isFile() && !excludeFiles.includes(file)) {
      const route = `${routePrefix}/${file.replace('.astro', '').replace('index', '')}`;
      routes.push(route);
    }
  });

  return routes;
};

const routes = getRoutes(pagesDir).map(route => ({ path: route, name: route }));

fs.writeFileSync('routes.json', JSON.stringify(routes, null, 2));
console.log('Route manifest generated.');
