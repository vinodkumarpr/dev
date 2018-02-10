import React from 'react'
import WordList from './WordList.react'
import FilterEdit from './FilterEdit.react'

const DisplayWordList = ({ words, filter, onFilterWords, clearFilter, onWordSelected }) => {
    console.log("DisplayWordList rendering.. filter " + filter);
    if (words) {
        return (
            <div>
                <FilterEdit onFilterWords={onFilterWords} />
                <WordList words={words} onItemClick={onWordSelected}/>
                </div>)
    }
    return <div>None</div>;
}

export default DisplayWordList
