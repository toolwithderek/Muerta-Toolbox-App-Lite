import md5 from 'crypto-js/md5';
import sha224 from 'crypto-js/sha224';

export function CsvToJson(csvString) {
  const lines = csvString.split('\n');

  // Get headers (first line of CSV)
  const headers = lines[0].split(',');

  // Loop through remaining lines and create objects
  const objects = [];
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    objects.push(obj);
  }
  return objects;
}

export function formatStoreValue(data) {
  return JSON.parse(data);
}

export function decodeAppSettings(encodeData) {
  return JSON.parse(atob(encodeData));
}

export function camelCaseToTitleCase(str) {
  // Insert a space before any capital letters preceded by a lowercase letter
  var titleCase = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Capitalize the first letter of each word
  titleCase = titleCase.charAt(0).toUpperCase() + titleCase.slice(1);

  return titleCase;
}

export async function hashGenerator(algorithm, message) {
  switch (algorithm) {
    case 'MD5':
      return md5(message).toString();
    case 'SHA224':
      return sha224(message);
    default:
      const encoder = new TextEncoder();
      const data = encoder.encode(message);

      try {
        const hash = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hash));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
      } catch (error) {
        console.error(`Error generating hash for '${algorithm}': ${error}`);
        return null;
      }
  }
};

export function underscoreToTitle(str) {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
