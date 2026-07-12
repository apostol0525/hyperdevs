export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'hyperdev message <onboarding@resend.dev>',
        to: 'borisstejman35@gmail.com',
        reply_to: email,
        subject: `Новая заявка от ${name}`,
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
      }),
    });

    if (!response.ok) throw new Error('Resend error');

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Не удалось отправить' });
  }
}
