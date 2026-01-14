import { docs, meta } from '../.source/server';

console.log('Total docs:', docs.length);
console.log('Total meta:', meta.length);

console.log('\nFirst doc:', JSON.stringify(docs[0], null, 2));
console.log('\nFirst meta:', JSON.stringify(meta[0], null, 2));

// Check for undefined paths
const docsWithUndefinedPath = docs.filter((d: any) => !d.file);
console.log('\nDocs with no file:', docsWithUndefinedPath.length);
if (docsWithUndefinedPath.length > 0) {
  console.log('Examples:', docsWithUndefinedPath.slice(0, 3));
}

const metasWithUndefinedPath = meta.filter((m: any) => !m.file);
console.log('\nMetas with no file:', metasWithUndefinedPath.length);
if (metasWithUndefinedPath.length > 0) {
  console.log('Examples:', metasWithUndefinedPath.slice(0, 3));
}
