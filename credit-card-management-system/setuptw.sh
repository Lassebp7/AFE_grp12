#!/bin/bash

set -e

echo ">>> Installing Tailwind and PostCSS dependencies..."
npm install tailwindcss @tailwindcss/postcss postcss

echo ">>> Creating .postcssrc.json..."
cat > .postcssrc.json <<EOL
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
EOL

echo ">>> Updating src/styles.css..."
STYLES_FILE="src/styles.css"
if [ -f "$STYLES_FILE" ]; then
  if ! grep -q '@import "tailwindcss";' "$STYLES_FILE"; then
    echo -e '@import "tailwindcss";\n' | cat - "$STYLES_FILE" > temp && mv temp "$STYLES_FILE"
    echo "Added Tailwind import to $STYLES_FILE"
  else
    echo "Tailwind already imported in $STYLES_FILE"
  fi
else
  echo "STYLES_FILE not found – skipped updating"
fi

echo "Tailwind setup complete!"
