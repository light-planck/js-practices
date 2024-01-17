echo '--callback valid--'
node src/scripts/callback/valid-db-operations.js
echo ''

echo '--callback invalid--'
node src/scripts/callback/invalid-db-operations.js
echo ''

echo '--promise valid--'
node src/scripts/promise/valid-db-operations.js
echo ''

echo '--promise invalid--'
node src/scripts/promise/invalid-db-operations.js
echo ''

echo '--async await valid--'
node src/scripts/async-await/valid-db-operations.js
echo ''

echo '--async await invalid--'
node src/scripts/async-await/invalid-db-operations.js
echo ''
