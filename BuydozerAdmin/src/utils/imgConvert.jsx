
const imgConvert = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
      console.log("String Base64:", reader.result);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
};

export default imgConvert