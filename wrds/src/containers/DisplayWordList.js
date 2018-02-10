import {connect} from 'react-redux'
import {filterWords, clearFilter} from '../actions'
import DisplayWordListComponent from '../components/DisplayWordList.react'

const getWordsList = (words, filter) => {
    console.log("getWordsList filter " + filter);
    if (filter){
        return words.filter( word => word.word().startsWith(filter));
    }
    return words;
}

const MapStateToProps = state => {
    console.log("MapStateToProps " + state)
    return {
        words : getWordsList(state.words, state.filter)
    }
}

const MapDispatchToProps = dispatch => {
    return {
        onFilterWords: filter => {
            dispatch(filterWords(filter))
        },
        onClearFilter: () => {
            dispatch(clearFilter())
        }
    }
}

const DisplayWordList = connect (
    MapStateToProps,
    MapDispatchToProps
) (DisplayWordListComponent)

export default DisplayWordList;
