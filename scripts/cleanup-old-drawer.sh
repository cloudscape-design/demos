#!/bin/bash

# Cleanup script to remove old global drawer files after migration

echo "🧹 Cleaning up old global drawer files..."

# Remove old drawer implementation files
if [ -f "src/pages/commons/global-drawer-plugin.tsx" ]; then
  rm src/pages/commons/global-drawer-plugin.tsx
  echo "✓ Removed src/pages/commons/global-drawer-plugin.tsx"
fi

if [ -f "src/pages/commons/with-global-drawer.tsx" ]; then
  rm src/pages/commons/with-global-drawer.tsx
  echo "✓ Removed src/pages/commons/with-global-drawer.tsx"
fi

if [ -f "src/common/mount.tsx" ]; then
  rm src/common/mount.tsx
  echo "✓ Removed src/common/mount.tsx"
fi

if [ -f "scripts/add-global-drawer.js" ]; then
  rm scripts/add-global-drawer.js
  echo "✓ Removed scripts/add-global-drawer.js"
fi

if [ -f "GLOBAL_DRAWER_IMPLEMENTATION.md" ]; then
  rm GLOBAL_DRAWER_IMPLEMENTATION.md
  echo "✓ Removed GLOBAL_DRAWER_IMPLEMENTATION.md"
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Update src/pages/commons/common-components.tsx to remove old exports"
echo "2. Run 'npm run build' to verify everything still works"
echo "3. Test the pages in the browser"
