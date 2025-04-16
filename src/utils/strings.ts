export {};

declare global {
  interface StringConstructor {
    whitespace: string;
    asciiLowercase: string;
    asciiUppercase: string;
    asciiLetters: string;
    digits: string;
    hexdigits: string;
    octdigits: string;
    punctuation: string;
    printable: string;
    punctuation2SQLi: string;
    printable2SQLi: string;
  }
}

/**
 * A collection of string constants.
 * @see https://github.com/python/cpython/blob/3.13/Lib/string.py
 */
String.whitespace = ' \t\n\r\v\f';
String.asciiLowercase = 'abcdefghijklmnopqrstuvwxyz';
String.asciiUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
String.asciiLetters = String.asciiLowercase + String.asciiUppercase;
String.digits = '0123456789';
String.hexdigits = String.digits + 'abcdef' + 'ABCDEF';
String.octdigits = '01234567';
String.punctuation = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
String.printable =
  String.digits + String.asciiLetters + String.punctuation + String.whitespace;

String.punctuation2SQLi = `!#$&()*+,-./:;<=>?@[]^\`{|}~%_`;
String.printable2SQLi =
  String.digits + String.asciiLetters + String.punctuation2SQLi;
