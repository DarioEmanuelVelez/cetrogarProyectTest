import { config } from 'dotenv';

/**
 * Carga las variables de entorno del archivo .env (credenciales sensibles).
 * Los valores reales NUNCA se versionan: ver .gitignore (.env está ignorado).
 */
config();

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Falta la variable de entorno "${key}" en el archivo .env`);
  }
  return value;
};

export const CREDENTIALS = {
  VALID: {
    email: requiredEnv('USER_EMAIL'), // devvcordoba@gmail.com
    password: requiredEnv('USER_PASSWORD'), // Locoporvos23
  },
  INVALID: {
    email: 'usuario.inexistente@prueba.com',
    password: 'ContrasenaInvalida123',
  },
} as const;

export const PRODUCT = {
  // Ajustar este valor a un producto existente del catalogo de Cetrogar.
  NAME: 'televisor',
} as const;
