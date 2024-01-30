import { FC, useEffect, useState } from 'react';
import './result.css';
import Skeleton from '../../component/skeleton/skeleton';
import PopUp from '../../component/popUp/popUp';
import {ApiKeys} from '../../../hide';

interface ResultProp {
  searchValue: string;
}

export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

const Result: FC<ResultProp> = ({ searchValue }) => {
  const [imgData, setImgData] = useState<PixabayImage[]>(new Array(20).fill({}));
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [selectedImageProvider, setSelectedImageProvider] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const pixabayApiKey = ApiKeys.pixabayApiKey;
        const pexelsApiKey = ApiKeys.pexelsApiKey;
        const unsplashApiKey = ApiKeys.unsplashApiKey;
  
        const [pixabayResponse, pexelsResponse, unsplashResponse] = await Promise.all([
          fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${searchValue}`),
          fetch(`https://api.pexels.com/v1/search?query=${searchValue}`, {
            headers: {
              Authorization: pexelsApiKey,
            },
          }),
          fetch(`https://api.unsplash.com/search/photos?query=${searchValue}&per_page=${10}&client_id=${unsplashApiKey}`),
        ]);
  
        const [pixabayData, pexelsData, unsplashData] = await Promise.all([
          pixabayResponse.json(),
          pexelsResponse.json(),
          unsplashResponse.json(),
        ]);

        if (!unsplashResponse.ok) {
          const errorText = await unsplashResponse.text();
          throw new Error(`Unsplash API Error: ${errorText}`);
        }
  
        const combinedData = [
          ...(pixabayData.hits.filter((hit: PixabayImage) => hit.webformatWidth > hit.webformatHeight) || []),
          ...(pexelsData.photos || []),
          ...(unsplashData.results || []),
        ];
  
        setImgData(combinedData);
        setIsLoading(false);
        console.log('Data fetched');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, [searchValue]);  

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowBackToTop(scrollY > window.innerHeight);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setSelectedImageUrl(event.currentTarget.src);
    setSelectedImageProvider(event.currentTarget.alt)
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedImageUrl('');
    setIsPopupVisible(false);
  };

  return (
    <div className='result'>
      <h2>Results for: {searchValue}</h2>
      {isLoading ? (
        <div className='images'>
          {imgData.map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <div className='images'>
          {!imgData.length && <h2>No Results</h2>}
          {imgData.map((item: PixabayImage | any) => (
            <div key={item.id}>
              {item.previewURL && <img src={item.webformatURL} onClick={handleClick} alt='Pixabay' />}
              {item.src && <img src={item.src.landscape} onClick={handleClick} alt='Pexels' />}
              {item.urls && <img src={item.urls.regular} onClick={handleClick} alt='Unsplash' />}
            </div>
          ))}
        </div>
      )}

      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          Back to Top
        </button>
      )}

      {isPopupVisible && (
        <PopUp selectedImageUrl={selectedImageUrl} selectedImageProvider={selectedImageProvider} closePopup={closePopup} />
      )}
    </div>
  );
};

export default Result;