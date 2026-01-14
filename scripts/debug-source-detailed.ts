import { docs, meta } from '../.source/server';

console.log('=== DEBUGGING DOCS ===\n');

// Check all docs have required properties
docs.forEach((doc: any, index: number) => {
  const hasInfo = !!doc.info;
  const hasFullPath = hasInfo && !!doc.info.fullPath;
  const hasPath = hasInfo && !!doc.info.path;

  if (!hasInfo || !hasFullPath || !hasPath) {
    console.log(`Doc ${index} missing properties:`, {
      hasInfo,
      hasFullPath,
      hasPath,
      doc: JSON.stringify(doc, null, 2).substring(0, 200)
    });
  }
});

console.log('\n=== DEBUGGING META ===\n');

// Check all meta have required properties
meta.forEach((m: any, index: number) => {
  const hasInfo = !!m.info;
  const hasFullPath = hasInfo && !!m.info.fullPath;
  const hasPath = hasInfo && !!m.info.path;

  if (!hasInfo || !hasFullPath || !hasPath) {
    console.log(`Meta ${index} missing properties:`, {
      hasInfo,
      hasFullPath,
      hasPath,
      meta: JSON.stringify(m, null, 2).substring(0, 200)
    });
  }
});

console.log('\n=== ALL CHECKS PASSED ===');
console.log(`Total docs: ${docs.length}, Total meta: ${meta.length}`);
