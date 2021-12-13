import axios from 'axios';

const uploadFormData = async (formData) => {
  await Promise.all(
    Object.keys(formData).map(async (field) => {
      if (Object.prototype.isPrototypeOf.call(File.prototype, formData[field])) {
        const dt = new FormData();
        dt.append('file', formData[field]);
        dt.append('upload_preset', 'vs8gsai6');
        dt.append('cloud_name', 'danyel117');
        const options = {
          method: 'POST',
          url: 'https://api.cloudinary.com/v1_1/danyel117/image/upload',
          data: dt,
        };
        await axios
          .request(options)
          .then(function (response) {
            formData[field] = response.data.url;
          })
          .catch(function (error) {
            console.error('err', error);
          });
      }
    })
  );
  return formData;
};

export { uploadFormData };
