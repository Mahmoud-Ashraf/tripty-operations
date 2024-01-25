import FileInput from "@/components/UI/FileInput/FileInput";
import useTranslate from "@/hooks/use-translate";

const MediaForm = ({ data, handleChange }: any) => {
    const { translate } = useTranslate();
    return (
        <>
            <FileInput name="logo" value={data.logo} onChange={handleChange} placeholder={translate('placeholder.logo')} photoShape={translate('shapes.square')} />
            <FileInput name="featured_image" value={data.featured_image} onChange={handleChange} placeholder={translate('placeholder.featured_image')} photoShape={translate('shapes.horizontal')} />
            <FileInput name="gallery" value={data.gallery} multiple onChange={handleChange} placeholder={translate('placeholder.gallery')} photoShape={translate('shapes.vertical')} />
            <FileInput name="horizontal_video" value={data.horizontal_video} onChange={handleChange} placeholder={translate('placeholder.horizontal_video')} photoShape={translate('shapes.horizontal')} />
            <FileInput name="vertical_video" value={data.vertical_video} onChange={handleChange} placeholder={translate('placeholder.vertical_video')} photoShape={translate('shapes.vertical')} />
        </>
    )
}

export default MediaForm;