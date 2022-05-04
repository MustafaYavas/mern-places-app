import { useRef, useState, useEffect } from 'react';

import Button from './Button'; 
import styles from './ImageUpload.module.css';
import inputStyles from './Input.module.css';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(() => {
        if(!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file])

    const pickedHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if(e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <div className={inputStyles['form-control']}>
            <input 
                type='file' 
                id={props.id} 
                style={{display: 'none'}} 
                accept='.jpg,.png,.jpeg'
                ref={filePickerRef}
                onChange={pickedHandler}
            />
            <div className={`${styles['image-upload']} ${props.center && styles.center}`}>
                <div className={styles['image-upload__preview']}>
                    {previewUrl && <img src={previewUrl} alt='Preview' />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type='button' onClick={pickImageHandler}>Pick Image</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload;