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
  static async sendRegisterSuccess(email: string, name: string, password: string) {
    this.sendHtmlEmail([email], 'Welcom to Your Blog', 'registerSuccess', { name, password });
  }

  static async sendTextEmail(emails: string[], title: string, content: string) {
    const mailOptions: any = {
      from: user,
      to: emails,
      subject: title,
      text: content,
    };
    emailTransport.sendMail(mailOptions);
  }

  static async sendHtmlEmail(emails: string[], title: string, templateName: string, data?: any) {
    const templatePath = path.resolve(__dirname, `./emailTemplates/${templateName}.ejs`);
    const template = ejs.compile(fs.readFileSync(templatePath, { encoding: 'utf-8' }));
    const html = template(data);
    const mailOptions: any = {
      from: user,
      to: emails,
      subject: title,
      html: html,
    };
    const result = { code: 200, message: 'send success' };
    try {
      await emailTransport.sendMail(mailOptions);
    } catch (e) {
      result.code = 500;
      result.message = e;
    }
    return result;
  }
}

export default emailService;
