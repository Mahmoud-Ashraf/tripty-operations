// import MainInput from "@/components/UI/MainInput/MainInput";
import MainSelect from "@/components/UI/MainSelect/MainSelect";
import useHTTP from "@/hooks/use-http";
import useTranslate from "@/hooks/use-translate";
import { useEffect, useState } from "react";

const CategoryForm = ({ data, handleChange }: FormProps) => {
    const { translate } = useTranslate();
    const { isLoading, error, sendRequest } = useHTTP();
    const [categories, setCategories] = useState<any>([]);
    const [subCategories, setSubCategories] = useState([]);
    const [tags, setTags] = useState<any>([]);

    const getCategories = () => {
        sendRequest(
            {
                url: '/api/categories',
                method: 'GET'
            },
            (data: any) => {
                setCategories(data);
            },
            (err: any) => console.error(err)
        )
    }

    const getTags = () => {
        sendRequest(
            {
                url: '/api/tags',
                method: 'GET'
            },
            (data: any) => {
                setTags(data);
            },
            (err: any) => console.error(err)
        )
    }

    useEffect(() => {
        getCategories();
        getTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <MainSelect options={categories.map((category: any) => { return { value: category.id, label: category.name } })} name="categories" value={data.categories || data?.category || null} onChange={handleChange} placeholder={translate('placeholder.categories')} required />
            <MainSelect options={subCategories} multi name="sub_categories" value={data?.sub_categories} onChange={handleChange} placeholder={translate('placeholder.subCategories')} required />
            <MainSelect options={tags.map((tag: any) => { return { value: tag.id, label: tag.name } })} multi name="tags" value={data?.tags || []} onChange={handleChange} placeholder={translate('placeholder.tags')} required />
        </>
    )
}

export default CategoryForm;