import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [imageUrl, setImageUrl] = useState("/");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value.trim() === "") {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    // "Authorization": "Bearer YOUR_API_KEY",
                    "Authorization": "Bearer sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value.trim(),
                    n: 1,
                    size: "512x512",
                }),
            });

            if (!response.ok) {
                throw new Error('Error generating image');
            }

            const data = await response.json();
            const imageUrl = data?.data[0]?.url;
            if (imageUrl) {
                setImageUrl(imageUrl);
            }
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='ai-image-generator'>
            <div className='header'>AI image <span>generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={imageUrl === "/" ? defaultImage : imageUrl} alt="" />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}></div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder="Describe what you want to see" />
                <div className="generate-btn" onClick={imageGenerator}>Generate</div>
            </div>
        </div>
    );
};

export default ImageGenerator;


