import prisma from '../../../../lib/prisma.js';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists.' });
      return;
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ email: user.email });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
