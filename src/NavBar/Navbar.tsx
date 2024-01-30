import { FC, RefObject, Dispatch, SetStateAction, KeyboardEvent } from 'react';
import './NavBar.css'

interface navProps {
    search: RefObject<HTMLInputElement>,
    setSearchValue: Dispatch<SetStateAction<string>>,
    gotData: boolean,
    setGotData: Dispatch<SetStateAction<boolean>>
}

const Navbar: FC<navProps> = ({ search, setSearchValue, gotData, setGotData }) => {

    const handleButtonClick = () => {
        setSearchValue(search.current?.value || '')
        setGotData(true)
        search.current ? search.current.value = '' : null;
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    return (
        <div className={'nav'} id={gotData ? 'resultNav' : 'homeNav'}>
            <div></div>
            <h1>photoMania</h1>
            <div className='search-bar'>
                <input
                    placeholder={gotData ? 'new search...' : 'search...'}
                    ref={search}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleButtonClick}>Search</button>
            </div>
            <div></div>
        </div>
    );
};

export default Navbar;
