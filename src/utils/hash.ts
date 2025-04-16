import { createHash } from 'node:crypto';

export function sha1(input: string): string {
  return createHash('sha1').update(input).digest('hex');
}

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function sha512(input: string): string {
  return createHash('sha512').update(input).digest('hex');
}

export function md5(input: string): string {
  return createHash('md5').update(input).digest('hex');
}
