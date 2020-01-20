export default function (str) {
  if (typeof str === 'string') {
    // remove whitespaces in the end and in the start of a string
    const trimmedStr = str.trim();

    // return str with removed whitespaces in the middle of a string
    return trimmedStr.split(' ').join('');
  }

  return null;
}
