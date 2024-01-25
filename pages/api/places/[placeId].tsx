import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { headers, method } = req;
    const { locale, placeId } = req.query;

    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(baseUrl + `admin/places/${placeId}?change_language=${locale}`, {
            method,
            headers: { 'Authorization': headers['authorization'] || '' }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }
        res.status(200).json(data.data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}