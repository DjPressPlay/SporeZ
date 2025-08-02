export default defineConfig({
  plugins: [react()],
  root: ".", // ✅ ensure this points to where `index.html` is
  build: {
    rollupOptions: {
      input: "public/index.html", // ⚠️ Only if you insist on keeping it in /public
    },
  },
});
