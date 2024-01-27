// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { locale, categoryId } = req.query;
    try {
        const response = await fetch(baseUrl + `admin/categories?change_language=${locale}`);
        if (!response.ok) {
            throw new Error('fetching categories failed');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.message);
        }
        // let sub_cats: any[] = [];
        // data.data.forEach((cat: any) => {
        //     sub_cats = [...sub_cats, ...cat.sub_cats];
        // });
        res.status(200).json(categoryId ? data.data.find((cat: any) => cat.id === Number(categoryId))?.sub_cats : []);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
