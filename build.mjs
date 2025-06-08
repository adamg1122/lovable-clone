import { build } from 'vite';

build({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
  .then(() => console.log('✅ Build completed'))
  .catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
