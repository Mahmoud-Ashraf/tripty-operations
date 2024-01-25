import { ChangeEvent, useEffect, useRef, useState } from 'react';
import classes from './file-input.module.scss';

const FileInput = ({ placeholder, photoShape, onChange, name, ...restProps }: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    // const [previews, setPreviews] = useState<any>([]);

    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };

    const removeImage = (i: string) => {
        setFiles(files.filter(x => x.name !== i));
    }

    useEffect(() => {
        onChange({ target: { value: files, name } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const handleUploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...Array.from(e.target.files)]);
        }
    }
    return (
        <div className={classes.container}>
            <input className={classes.hidden} ref={fileInputRef} type='file' onChange={handleUploadFiles} />
            <button className={classes.button} onClick={handleButtonClick} type="button">
                <span className={classes.placeholder}>{placeholder}</span>
                {
                    <span className={classes.plus}>+</span>
                }
                <div>
                    {photoShape && <span className={classes.photoShape}>{photoShape}</span>}
                </div>
            </button>
            <div className={classes.files}>
                {
                    files?.map((file: any, index: number) => (
                        <div key={file.name + '-' + index} className={classes.fileImage}>
                            <div className={classes.remove} onClick={() => removeImage(file.name)}><span>X</span></div>
                            {
                                file.type.includes('image') &&
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={URL.createObjectURL(file)} alt={`${file.name} preview`} className={classes.fileName} />
                            }
                            {
                                file.type.includes('video') &&
                                // eslint-disable-next-line @next/next/no-img-element
                                <video src={URL.createObjectURL(file)} className={classes.fileName} />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FileInput;