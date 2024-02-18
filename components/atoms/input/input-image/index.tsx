import React, { ChangeEvent } from 'react';

type InputImage = {
    onChange: (file: File | null) => void;
    currentImage?: string;
}

const InputImage: React.FC<InputImage> = ({ onChange, currentImage }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onChange(file);
    };

    return (
        <>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {currentImage && <img src={currentImage} alt="current image" />}
        </>
    );
};

export default InputImage;
