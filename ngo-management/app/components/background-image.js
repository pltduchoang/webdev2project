"use client";
import { useEffect, useState } from 'react';
import fetchRandomImage from "../_services/unsplashservices"

export default function BackgroundImage ({}) {
    
    const [imageUrl, setImageUrl] = useState('');
    const [photographer, setPhotographer] = useState('');

    useEffect(() => {
        let isMounted = true;
      
        const getImage = async () => {
          try {
            const data = await fetchRandomImage();
    
            if (isMounted && data) {
                setImageUrl(data.urls.regular);
    
                setPhotographer(data.user.name);
                console.log(data);
            }
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
      
        getImage();
      
        return () => {
          isMounted = false; // Set isMounted to false when component unmounts
          setImageUrl(''); // Reset imageUrl when component unmounts
        };
      }, []);

    return(
        <main>
            <div className="min-h-screen backgroundLightColor opacity-70 w-full fixed top-0 left-0"
                style={{zIndex: -1}}>  
            </div>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Random Unsplash Image"
                    className="min-w-full min-h-screen object-cover fixed top-0 left-0"
                    style={{ zIndex: -3 }} 
                />
            )}
            {photographer && (
                <p className="fixed bottom-0 right-0 m-4 text-white text-xs"
                    style={{zIndex: -2}}>
                Photo by {photographer}
                </p>
            )}
        </main>
    )
}