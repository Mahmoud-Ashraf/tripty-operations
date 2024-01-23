// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { locale } = req.query;
    try {
        const response = await fetch(baseUrl + `front/tags?change_language=${locale}`);
        if (!response.ok) {
            throw new Error('fetching tags failed');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }
        res.status(200).json(data.data);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
