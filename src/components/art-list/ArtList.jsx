import React, { useEffect, useContext } from 'react';
import { CrudContext } from '../../context/crudContext';
import Art from '../art/Art';
import CustomSnackbar from '../snackbar/Snackbar';

// Styles
import 'animate.css/animate.min.css';
import './styles/ArtList.css';

const ArtList = ({ filterArtList, filteredTerm }) => {
  // Contexts
  const { artList } = useContext(CrudContext);

  // Scroll to the top to animate artList
  useEffect(() => {
    if (filteredTerm !== 'Splash') {
      document.getElementById('artList').scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredTerm]);

  // Differing CSS classes to unalign CSS Grid columns
  const alterColumns = () => {
    let column = '';
    const filteredArtList = filterArtList(artList);

    return filteredArtList.map((art, idx) => {
      switch (column) {
        case 'first':
          column = 'second';
          break;
        case 'second':
          column = 'third';
          break;
        default:
          column = 'first';
          break;
      }
      return (
        <div key={idx} className={column}>
          <Art
            id={art.id}
            art={art}
            modalId={idx}
            artList={filteredArtList}
            filteredTerm={filteredTerm}
          />
        </div>
      );
    });
  };

  return (
    <div
      id="artList"
      className={`ArtList ${
        filteredTerm !== 'Splash' ? 'artListPadding' : 'splashListPadding' // Change padding depending on if SplashList
      }`}
    >
      <div className="wrapper">{alterColumns()}</div>
      <CustomSnackbar />
    </div>
  );
};

export default ArtList;
