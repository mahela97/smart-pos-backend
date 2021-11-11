import * as admin from "firebase-admin";
import config from "../config/appConfig.json";

const data = config.firebase;

const serviceData: any = {
  type: data.type,
  project_id: data.project_id,
  private_key_id: data.private_key_id,
  private_key: data.private_key,
  client_email: data.client_email,
  client_id: data.client_id,
  auth_uri: data.auth_uri,
  token_uri: data.token_uri,
  auth_provider_x509_cert_url: data.auth_provider_x509_cert_url,
  client_x509_cert_url: data.client_x509_cert_url,
};

const firebaseInitialize = () => {
  if (admin.apps.length === 0)
    admin.initializeApp({
      credential: admin.credential.cert(serviceData),
    });

};

export default firebaseInitialize;
