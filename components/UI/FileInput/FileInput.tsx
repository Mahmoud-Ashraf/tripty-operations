import { useRef } from 'react';
import classes from './file-input.module.scss';

const FileInput = ({ placeholder, photoShape, ...restProps }: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };

    return (
        <>
            <input className={classes.hidden} ref={fileInputRef} type='file' {...restProps} />
            <button className={classes.button} onClick={handleButtonClick} type="button">
                <span className={classes.placeholder}>{placeholder}</span>
                {
                    fileInputRef?.current?.files?.length && fileInputRef?.current?.files?.length > 0 ?
                        <span className={classes.files}>
                            {
                                Array.from(fileInputRef.current?.files || []).map(file => (
                                    <span className={classes.fileName} key={file.name}>{file.name}</span>
                                ))
                            }
                        </span>
                        :
                        <span className={classes.plus}>+</span>
                }
                <div>
                    {photoShape && <span className={classes.photoShape}>{photoShape}</span>}
                </div>
            </button>
        </>
    )
}

export default FileInput;