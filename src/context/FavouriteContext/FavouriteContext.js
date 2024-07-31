import React, {createContext, useState, useContext} from 'react';

const FavouriteContext = createContext();

export const FavouriteProvider = ({children}) => {
  const [favourites, setFavourites] = useState([]);

  const onAddToFavourites = product => {
    setFavourites(prevFavourites => {
      if (!prevFavourites.find(fav => fav.id === product.id)) {
        return [...prevFavourites, product];
      }
      return prevFavourites;
    });
  };

  const removeFromFavourites = productId => {
    setFavourites(prevFavourites =>
      prevFavourites.filter(fav => fav.id !== productId),
    );
  };
  return (
    <FavouriteContext.Provider
      value={{favourites, onAddToFavourites, removeFromFavourites}}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);
