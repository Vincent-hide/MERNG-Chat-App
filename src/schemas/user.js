import Joi from 'joi';

// TODO these validations not working
const email = Joi.string().email().required().label('Email');
const username = Joi.string().alphanum().min(4).max(30).required().label('Username');
const name = Joi.string().min(4).max(254).required().label('Name');
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).label('Password');

export const signUp = Joi.object({
  email,
  username,
  name,
  password,
});

export const signIn = Joi.object({
  email,
  password
});

// old way
// export default Joi.object().keys({
//   email: Joi.string().email().required().label('Email'),
//   username: Joi.string().alphanum().min(4).max(30).required().label('Username'),
//   name: Joi.string().max(254).required().label('Name'),
//   password: Joi.string().regex(/"^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$"/)
//     .label('Password')
//     // .options({
//     //   language: {
//     //     string: {
//     //       regex: {
//     //         base: 'must have at least one lowercase letter, one uppercase letter, one digit, and one special character'
//     //       }
//     //     }
//     //   }
//     // })
// })

// password regex: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a

