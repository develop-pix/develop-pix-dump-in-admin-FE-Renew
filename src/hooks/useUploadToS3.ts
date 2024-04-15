import AWS from 'aws-sdk';

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = async (blob: Blob): Promise<string> => {
  const s3 = new AWS.S3({
    region: import.meta.env.VITE_S3_REGION,
    accessKeyId: import.meta.env.VITE_S3_ACCESSKEY_ID,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESSKEY,
  });

  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME as string;
  const key = `dumpin_admin/image_${new Date().getTime()}`;
  const uploadParams: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: key,
    Body: blob,
  };

  try {
    await s3.upload(uploadParams).promise();
    const fileUrl = `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/${key}`;

    return fileUrl;
  } catch (err) {
    console.error('Error', err);
    throw err;
  }
};
