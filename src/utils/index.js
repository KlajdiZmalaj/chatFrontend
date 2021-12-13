/**
 * @name b64toBlob
 * @description Function that converts base64 into a blob or url.
 * @param {string} b64Data b64 string splited (without ex: image/png || application/pdf)
 * @param {string} contentType content type ex: image/png , application/pdf
 * @returns {array} return array [0,1] first value is the url string and second is blob file
 */

 export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = b64Data.includes(",")
      ? window.atob(b64Data.split(",")[1])
      : window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return [URL.createObjectURL(blob), blob];
  };