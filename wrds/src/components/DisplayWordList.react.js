import React from 'react'
import WordList from './WordList.react'
import FilterEdit from './FilterEdit.react'

const DisplayWordList = ({ words, filter, onFilterWords, clearFilter }) => {
    console.log("DisplayWordList rendering... words: " + words + " filter " + filter);
    if (words) {
        return (
            <div sf style={{ backgroundColor: '#f0f0f0', margin: 10, height: 'calc(100vh - 20px)' }}>
            <div className="col-md-4" style={{ backgroundColor: '#f0f0f0', margin: 10, height: 'calc(100vh - 40px)', overflowY: 'scroll' }}>
                <FilterEdit onFilterWords={onFilterWords} />
                <WordList words={words} />
            </div>
            </div>);

    }
    return <div>None</div>;
}

export default DisplayWordList
