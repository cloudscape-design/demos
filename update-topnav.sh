#!/bin/bash

# List of files that need updating (excluding already updated ones)
FILES=(
  "src/pages/product-detail-page/root.tsx"
  "src/pages/read-from-s3/root.tsx"
  "src/pages/server-side-table-property-filter/root.tsx"
  "src/pages/server-side-table/root.tsx"
  "src/pages/split-panel-comparison/root.tsx"
  "src/pages/split-panel-multiple/root.tsx"
  "src/pages/table-date-filter/root.tsx"
  "src/pages/table-editable/root.tsx"
  "src/pages/table-expandable/root.tsx"
  "src/pages/table-property-filter/root.tsx"
  "src/pages/table-saved-filters/root.tsx"
  "src/pages/table-select-filter/root.tsx"
  "src/pages/write-to-s3/root.tsx"
  "src/pages/form-unsaved-changes/app.tsx"
  "src/pages/form-validation/app.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    
    # Check if file already has DemoTopNavigation
    if grep -q "DemoTopNavigation" "$file"; then
      echo "  Skipping - already has DemoTopNavigation"
      continue
    fi
    
    # Add DemoTopNavigation to imports
    if grep -q "CustomAppLayout" "$file"; then
      sed -i.bak 's/CustomAppLayout,/CustomAppLayout, DemoTopNavigation,/g' "$file"
    fi
    
    # Add top-navigation.scss import if not present
    if ! grep -q "top-navigation.scss" "$file"; then
      # Find the last import line and add after it
      sed -i.bak '/^import.*scss.*;$/a\
import '\''../../styles/top-navigation.scss'\'';
' "$file"
    fi
    
    # Wrap CustomAppLayout with fragment and DemoTopNavigation
    # This is a simplified approach - may need manual adjustment
    sed -i.bak 's/return (/return (\
    <>\
      <DemoTopNavigation \/>/g' "$file"
    
    # Add closing fragment before last closing paren of return
    sed -i.bak 's/    \/>$/    \/>\
    <\/>/g' "$file"
    
    echo "  Updated $file"
  else
    echo "  File not found: $file"
  fi
done

# Clean up backup files
find src/pages -name "*.bak" -delete

echo "Done!"
