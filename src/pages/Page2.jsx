import React from 'react';
import useFormData from 'hooks/useFormData';
import { uploadFormData } from 'utils/uploadFormData';

const Page2 = () => {
  const { formData, updateFormData, form } = useFormData(null);
  const submitForm = async (e) => {
    e.preventDefault();
    console.log('beforeUpload', formData);
    const uploadedFD = await uploadFormData(formData);
    console.log('after', uploadedFD);
  };
  return (
    <div>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <input type='file' name='test_cloudinary' />
        <button type='submit'>Ok</button>
      </form>
    </div>
  );
};

export default Page2;
