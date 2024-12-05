import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve('..', '..', 'ssl', 'kerim.key')),
      cert: fs.readFileSync(path.resolve('..', '..', 'ssl', 'kerim.crt')),
    },
    host: '0.0.0.0',
    port: 5173,
  },
  define: {
    'import.meta.env.SERVER_IP': JSON.stringify('https://192.168.1.104'), // SUNUCUNU IPV4UNU GIRIN 
  },
});


// SSL KULLANMIYORSANIZ ASAGIDA KI GIBI YAPIN
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//   },
//   define: {
//     'import.meta.env.SERVER_IP': JSON.stringify('http://192.168.1.104'),
//   },
// });