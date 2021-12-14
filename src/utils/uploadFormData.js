import axios from 'axios';

const uploadFormData = async (formData) => {
  const formDataCopy = { ...formData };
  await Promise.all(
    Object.keys(formDataCopy).map(async (field) => {
      if (
        Object.prototype.isPrototypeOf.call(File.prototype, formDataCopy[field])
      ) {
        const dt = new FormData();
        dt.append('file', formDataCopy[field]);
        dt.append('upload_preset', 'vs8gsai6');
        dt.append('cloud_name', 'danyel117');
        const options = {
          method: 'POST',
          url: 'https://api.cloudinary.com/v1_1/danyel117/image/upload',
          data: dt,
        };
        await axios.request(options).then((response) => {
          formDataCopy[field] = response.data.url;
        });
        // Falta captura de error del request
        // .catch((error) => {
        //   console.error('err', error);
        // });
      }
    })
  );
  return formDataCopy;
};

export { uploadFormData };
