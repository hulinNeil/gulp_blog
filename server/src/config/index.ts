import dotenv from 'dotenv';
dotenv.config();

const config = {
  mysql: {
    host: process.env.DB_HOST, // staging.cenutv33u6bi.ap-southeast-1.rds.amazonaws.com
    user: process.env.DB_USER, // dhome
    password: process.env.DB_PASS, // futurify101
    database: process.env.DB_NAME, // dhome_data_dev
  },
  port: process.env.PORT || 4000,
};

export default config;
