# Wargame utils for webhacking

Based on axios. Cookie is automatically handled.

And it has some useful functions like logger, hashes, random string, etc.

## Installation
```bash
pnpm install
```

## Usage
```ts
import { create } from '@web'; // Must ends with a slash

const r = create({ // based on axios instance
    baseURL: '<url>',
    ignoreHttpErrors: true, // Ignore all http errors (NOT network errors)
    DEBUG: true, // Enable debug mode
});
```

## will be updated soon
pwn utils.. :D (when I start pwn..)