// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from "formidable";

export default async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { locale } = req.query;
    const { headers, body } = req;
    const form = formidable({ multiples: true });

    const formData: any = new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject("error");
            }
            resolve({ fields, files });
        });
    });


    try {
        const { fields, files } = await formData;
        const bodyFormData = new FormData();
        for (const key in fields) {
            bodyFormData.append(key, fields[key]);
        }
        for (const key in files) {
            bodyFormData.append(key, files[key]);
        }
        console.log(typeof (bodyFormData));
        const response = await fetch(baseUrl + `admin/places?change_language=${locale}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': headers['authorization'] || '',
                    // 'Content-Type': 'multipart/form-data'
                },
                body: bodyFormData,
            });
        if (!response.ok) {
            throw new Error('add place failed');
        }
        const data = await response.json();
        console.log(data);
        if (data.error) {
            throw new Error(data.message);
        }
        res.status(200).json(data.data);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
export const config = {
    api: {
        bodyParser: false,
    },
    // // Specifies the maximum allowed duration for this function to execute (in seconds)
    // maxDuration: 5,
}
