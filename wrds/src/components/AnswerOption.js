import React from 'react'

var AnswerOptionsTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
    "fontSize": "20px"
};

const NormalAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}>
                            {option}
                            </li>);
}

const PassedAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}>
                            {option}
                            <span class="badge">correct</span>
                            </li>);
}

const FailedAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}>
                            {option}
                            <span class="badge">incorrect</span>
                            </li>);
}

const CorrectAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}>
                            {option}
                            <span class="badge">correct</span>
                            </li>);
}


module.exports = {
    NormalAnswerOption: NormalAnswerOption,
    PassedAnswerOption: PassedAnswerOption,
    FailedAnswerOption: FailedAnswerOption,
    CorrectAnswerOption: CorrectAnswerOption
}
