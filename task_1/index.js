import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

// console.log(decoded)

function decodeFields(encoded, translations) {
  function getUniqueIds(data) {
    let uniqueIds = new Set();
    data.forEach((obj) => {
      for (const key in obj) {
        if (key.endsWith("Id")) {
          uniqueIds.add(obj[key]);
        }
      }
    });
    return Array.from(uniqueIds);
  }

  const uniqueIds = getUniqueIds(encoded);
  console.log("Уникальные id из encoded:", uniqueIds);

  const decoded = encoded.map((obj) => {
    const decodedObj = {};
    for (const key in obj) {
      if (key.endsWith("Id")) {
        decodedObj[key] = translations[obj[key]] || obj[key];
      } else if (["groupId", "service", "formatSize", "ca"].includes(key)) {
        decodedObj[key] = obj[key];
      }
    }
    return decodedObj;
  });

  return decoded;
}

const decodedData = decodeFields(encoded, translations);
console.log("Расшифрованные данные:", decodedData);
