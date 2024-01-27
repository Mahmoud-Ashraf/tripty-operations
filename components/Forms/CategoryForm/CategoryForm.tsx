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
    const getSubCategories = () => {
        sendRequest(
            {
                url: `/api/subCategories?categoryId=${data.main_category}`,
                method: 'GET'
            },
            (data: any) => {
                setSubCategories(data);
            },
            (err: any) => console.error(err)
        )
    }

    useEffect(() => {
        getCategories();
        getTags();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (data.main_category)
            getSubCategories();
    }, [data.main_category])
    return (
        <>
            <MainSelect options={categories.map((category: any) => { return { value: category.id, label: category.name } })} name="main_category" value={data.main_category || data?.category || null} onChange={handleChange} placeholder={translate('placeholder.categories')} required />
            <MainSelect options={subCategories.map((subCat: any) => { return { value: subCat.id, label: subCat.name } })} multi name="sub_cats" value={data?.sub_cats} onChange={handleChange} placeholder={translate('placeholder.subCategories')} />
            <MainSelect options={tags.map((tag: any) => { return { value: tag.id, label: tag.name } })} multi name="tags" value={data?.tags || []} onChange={handleChange} placeholder={translate('placeholder.tags')} required />
        </>
    )
}

export default CategoryForm;