# Wargame utils for web hacking

Based on Got. Cookie is automatically handled.
And it has some useful functions for web hacking.

## Installation

```bash
pnpm install
```

## Usage

```ts
import { Logger } from '@utils';
import { request, server } from '@web';

Logger.setLevel('DEBUG');

const s = server().listen(3000);
s.get('/', (req, res) => res.redirect(301, '/test'));
s.get('/test', (req, res) => {
  res.setHeader('X-TEST', 'test').sendStatus(200);
});

const r = request({
  prefixUrl: 'http://localhost:3000',
});

r.setHeader('X-TEST', 'test');
r.setCookie('test', 'test');

await r.get('').text();

Logger.debug('debug');
Logger.info('info');
Logger.success('success');
Logger.error('error');
```
