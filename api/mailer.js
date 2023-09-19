const nodemailer = require("nodemailer");

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const urlParams = new URL(req.url, `http://${req.headers.host}`)
        .searchParams;
      const name = urlParams.get("name");
      const email = urlParams.get("email");
      const message = urlParams.get("message");

      if (!name || !email || !message ) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "name, email and message are required" }));
      }

      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "skillsbooster.mailer@mail.ru",
          pass: "1qBy5h1zHkFACmLevern",
        },
      });

      const mailOptions = {
        from: "Skillsbooster Mailer <skillsbooster.mailer@mail.ru>",
        to: "skillsbooster.info@mail.ru",
        subject: "Заявка из формы сайта",
        text: `
          Имя: ${name}
          Почта: ${email}

          Сообщение:
          ${message}
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      // console.log("Sent:", info.response);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Successfully sent!" }));
    } catch (error) {
      // console.error("Error:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Something went wrong" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Use POST http method" }));
  }
};
