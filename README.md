# sourcemap-issues

Run `node index.js`, and see `{ source: 'unknown', line: 15, column: 2, name: 'it' }` logged out. `column` should be 3.

FWIW it behaves the same using `source-map@0.7.1`:

```diff
diff --git i/index.js w/index.js
index 68d1e7c..00a59d7 100644
--- i/index.js
+++ w/index.js
@@ -13,13 +13,17 @@ const res = transform(fileContent, {
   plugins: ['transform-strict-mode'],
   sourceMaps: 'both',
 });
+(async () => {
+  const pos = await SourceMapConsumer.with(
+    JSON.stringify(res.map),
+    null,
+    function(consumer) {
+      return consumer.originalPositionFor({
+        column: 3,
+        line: 17,
+      });
+    },
+  );
 
-const consumer = new SourceMapConsumer(JSON.stringify(res.map));
-
-console.log(
-  // 17:3 in `res.code` has the `it('also works', () => {`
-  consumer.originalPositionFor({
-    column: 3,
-    line: 17,
-  }),
-);
+  console.log(pos);
+})();
diff --git i/package.json w/package.json
index cfd51c9..19a9bc2 100644
--- i/package.json
+++ w/package.json
@@ -6,6 +6,6 @@
   "dependencies": {
     "babel-core": "^6.26.0",
     "babel-plugin-transform-strict-mode": "^6.24.1",
-    "source-map": "^0.6.0"
+    "source-map": "^0.7.1"
   }
 }
diff --git i/yarn.lock w/yarn.lock
index fb14ee2..3081566 100644
--- i/yarn.lock
+++ w/yarn.lock
@@ -299,9 +299,9 @@ source-map@^0.5.6, source-map@^0.5.7:
   version "0.5.7"
   resolved "https://registry.yarnpkg.com/source-map/-/source-map-0.5.7.tgz#8a039d2d1021d22d1ea14c80d8ea468ba2ef3fcc"
 
-source-map@^0.6.0:
-  version "0.6.1"
-  resolved "https://registry.yarnpkg.com/source-map/-/source-map-0.6.1.tgz#74722af32e9614e9c287a8d0bbde48b5e2f1a263"
+source-map@^0.7.1:
+  version "0.7.1"
+  resolved "https://registry.yarnpkg.com/source-map/-/source-map-0.7.1.tgz#493620ba1692945d680b93862435bf0ed95a2aa4"
 
 strip-ansi@^3.0.0:
   version "3.0.1"
```
