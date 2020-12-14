import multer, { Options } from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'lovely-food-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file,cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  }),
}

export default {
  storage: storageTypes['local'],
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
  },
  fileFilter: (req, file, cb) => {
    const mimeTypes = [
      'image/jpeg',
      'image/png'
    ];

    if (!mimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }

    cb(null, true);
  },
} as Options;