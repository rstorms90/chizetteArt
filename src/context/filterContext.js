import React, { createContext, useState } from "react"


export const FilterContext = createContext()

export function FilterProvider(props) {
  
  const [filteredTerm, setFilteredTerm] = useState('Splash')

  // Alter filteredTerm based on Drawer click
  const configureFilteredTerm = (ev) => {
    ev.preventDefault()
    // Check if filter search came from splashlist or drawer
    let updateFilteredTerm = 
        ev.currentTarget.dataset.medium
        || ev.currentTarget.children[0].innerText

    if (updateFilteredTerm === 'All') {
      setFilteredTerm('All')
    } else if (updateFilteredTerm === 'Art') {
      setFilteredTerm('Art')
    } else if (updateFilteredTerm === 'Jewelry') {
      setFilteredTerm('Jewelry')
    } else if (updateFilteredTerm === 'Photos'){
      setFilteredTerm('Photos')
    } else {
      setFilteredTerm('All')
    }
  }

  // Filter artList based on filteredTerm
  const filterArtList = (artList) => {
    // Filter SplashList
    let artCounter = 0
    let jewelryCounter = 0
    let photoCounter = 0
    let artArr = []
    let jewelryArr = []
    let photoArr = []
    let splashList = []

    if (filteredTerm === 'Splash') {
      artList.map((art) => {
        const medium = art.medium
        // First Three Art
        if (!medium.includes('Jewelry') && !medium.includes('Photograph') && artCounter < 3) {
          artCounter++
          artArr.push(art)
        }
        // First Three Jewelry
        if (medium.includes('Jewelry') && jewelryCounter < 3) {
          jewelryCounter++
          jewelryArr.push(art)
        }
        // First Three Photography
        if (medium.includes('Photograph') && photoCounter < 3) {
          photoCounter++
          photoArr.push(art)
        }
        // Concatenate into one array
        splashList = artArr.concat(jewelryArr, photoArr)
      })
      return splashList
      
    } else {
      let filteredArtArray = artList.filter((art) => {
        const medium = art.medium
        // Filter by Photos
        if (filteredTerm === 'Photos') {
          return medium.includes('Photograph')
          // Filter by Art
        } else if (filteredTerm === 'Art') {
          return !medium.includes('Photograph') 
                  && !medium.includes('Jewelry')
          // Filter by Jewelry
        } else if (filteredTerm === 'Jewelry') {
          return medium.includes('Jewelry')
          // Don't Filter
        } else if (filteredTerm === 'All') {
          return medium
        } else {
          return medium
        }
      })
      return filteredArtArray
    }
  }

  return (
    <FilterContext.Provider
      value={{
        filteredTerm,
        configureFilteredTerm,
        filterArtList
      }}
    >
      {props.children}
    </FilterContext.Provider>
  )
}

