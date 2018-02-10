import React from 'react'
import WordList from './WordList.react'
import FilterEdit from './FilterEdit.react'

const DisplayWordList = ({ words, filter, onFilterWords, clearFilter, onWordSelected, onQuizLaunch }) => {
    console.log("DisplayWordList rendering.. filter " + filter);
    if (words) {
        return (
            <div>
                <FilterEdit onFilterWords={onFilterWords} onQuizLaunch={onQuizLaunch}/>
                <WordList words={words} onItemClick={onWordSelected}/>
                </div>)
    }
    return <div>None</div>;
}

export default DisplayWordList
