// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { locale } = req.query;
    const { headers } = req;
    try {
        console.log(baseUrl + `admin/notifications?change_language=${locale}`);
        const response = await fetch(baseUrl + `admin/notifications?change_language=${locale}`,
            {
                headers: { 'Authorization': headers['authorization'] || '' }
            });
        if (!response.ok) {
            throw new Error('fetching notifications failed');
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
