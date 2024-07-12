// // email.service.ts

// import { Injectable } from '@angular/core';
// import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmailService {

//   constructor() { }

//   sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
//     return new Promise((resolve, reject) => {
//       emailjs.send('service_y3lqfc8', 'template_a7kztuz', templateParams, 'YOUR_USER_ID')
//         .then((response: EmailJSResponseStatus) => {
//           console.log('Email sent!', response);
//           resolve(response);
//         }, (error) => {
//           console.error('Error sending email:', error);
//           reject(error);
//         });
//     });
//   }
// }
