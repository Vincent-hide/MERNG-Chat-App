export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  SESS_NAME='sid',
  SESS_SECRET='ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2
} = process.env

export const IN_PROD = NODE_ENV === 'production';
