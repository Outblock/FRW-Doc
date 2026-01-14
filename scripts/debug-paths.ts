import { docs } from '../.source/server';

console.log('Sample doc paths:');
docs.slice(0, 5).forEach((doc: any) => {
  console.log({
    path: doc.info.path,
    fullPath: doc.info.fullPath,
  });
});

console.log('\nLooking for index page:');
const indexPage = docs.find((d: any) => d.info.path === 'index.mdx' || d.info.path.includes('index'));
if (indexPage) {
  console.log('Found:', indexPage.info);
} else {
  console.log('Not found!');
}
