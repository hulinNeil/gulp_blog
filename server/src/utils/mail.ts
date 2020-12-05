import config from '../config';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const { service, user, password } = config.email;

const emailTransport = nodemailer.createTransport({
  service,
  auth: {
    user,
    pass: password,
  },
});

class emailService {
  static async sendTextEmail(emails: string[], title: string, content: string) {
    const mailOptions: any = {
      from: user,
      to: emails,
      subject: title,
      text: content,
    };
    emailTransport.sendMail(mailOptions);
  }

  static async sendHtmlEmail(emails: string[], title: string, templateName: string) {
    const templatePath = path.resolve(__dirname, `./emailTemplates/${templateName}.ejs`);
    const template = ejs.compile(fs.readFileSync(templatePath, { encoding: 'utf-8' }));
    const html = template({ name: '--------' });
    const mailOptions: any = {
      from: user,
      to: emails,
      subject: title,
      html: html,
    };
    const result: any = { code: 200, message: 'send success', data: [] };
    try {
      const ss = await emailTransport.sendMail(mailOptions);
      console.log('============', ss);
    } catch (e) {
      result.code = 500;
      result.message = e;
    }
    return result;
  }
}

export default emailService;
