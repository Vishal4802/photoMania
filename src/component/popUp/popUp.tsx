import { FC } from 'react';
import './popUp.css';

interface ImageDetailsPopupProps {
  selectedImageUrl: string;
  selectedImageProvider: string;
  closePopup: () => void;
}

const PopUp: FC<ImageDetailsPopupProps> = ({ selectedImageUrl, selectedImageProvider, closePopup }) => {

  let hrefLink: string = `https://${selectedImageProvider}.com`;

  return (
    <div className="popup">
      <div className="popup-content">
        {selectedImageUrl && (
          <>
            <img src={selectedImageUrl}/>
            <div className="popup-buttons">
              <h2>
                Image Provider: {' '}
                <a href={hrefLink} target="_blank" rel="noopener noreferrer">
                  {selectedImageProvider}
                </a>
              </h2>
              <button onClick={closePopup}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUp;
