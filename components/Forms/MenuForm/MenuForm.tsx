import FileInput from "@/components/UI/FileInput/FileInput";
import MainInput from "@/components/UI/MainInput/MainInput";
import useTranslate from "@/hooks/use-translate";

const MenuForm = ({ data, handleChange }: any) => {
    const { translate } = useTranslate();
    return (
        <>
            <FileInput name="menu_images" value={data.menu_images} multiple onChange={handleChange} placeholder={translate('placeholder.menu_images')} />
            <MainInput type="text" name="menu_url" value={data.menu_url || data.menu} onChange={handleChange} placeholder={translate('placeholder.menu_url')} />
        </>
    )
}

export default MenuForm;