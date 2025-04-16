export function permutations<T>(arr: T[], k: number): string[] {
  const result: string[] = [];

  function generate(path: T[], options: T[]): void {
    if (path.length === k) {
      result.push(path.join(''));
      return;
    }

    for (let i = 0; i < options.length; i++) {
      const newPath = [...path, options[i]];
      const newOptions = [...options.slice(0, i), ...options.slice(i + 1)];
      generate(newPath, newOptions);
    }
  }

  generate([], arr);
  return result;
}
