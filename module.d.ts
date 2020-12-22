declare namespace NodeJS {
    export interface ProcessEnv {
      PORT: number;
      
      POSTGRESS_HOST: string;
      POSTGRESS_USER: string;
      POSTGRESS_PASSWORD: string;
      POSTGRESS_DB: string;

      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_DEFAULT_REGION: string;

      APP_URL: string;
    }
  }