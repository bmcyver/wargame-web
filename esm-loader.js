import path from 'node:path';

export const resolve = (specifier, context, nextResolve) => {
  /**
   * Handle relative specifiers
   */
  if (
    specifier.startsWith('.') &&
    !specifier.endsWith('.js') &&
    !specifier.endsWith('.ts')
  ) {
    if (specifier.endsWith('/')) {
      const newSpecifier = specifier + 'index.ts';
      return nextResolve(newSpecifier, context);
    }
    const newSpecifier = specifier + '.ts';
    return nextResolve(newSpecifier, context);
  }

  /**
   * Handle custom specifiers
   */
  if (specifier.startsWith('@')) {
    switch (specifier) {
      case '@web':
        return nextResolve(
          'file:///' + path.resolve(import.meta.dirname, './src/web/index.ts'),
          context,
        );
      case '@utils':
        return nextResolve(
          'file:///' +
            path.resolve(import.meta.dirname, './src/utils/index.ts'),
          context,
        );
      default:
        break;
    }
  }

  return nextResolve(specifier, context);
};
