import React from 'react'

var AnswerOptionsTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
    "fontSize": "20px"
};

var BadgeTextStyle = {
    "fontFamily": "Times New Roman, sans-serif",
    "fontWeight": "bold",
    "fontSize": "15px"
};

const NormalAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}
                            >
                            {option}
                            </li>);
}

const PassedAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item active"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle
                            }>
                            {option}
                            <span className="badge" style={BadgeTextStyle}>correct</span>
                            </li>);
}

const FailedAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item  active"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}
                            >
                            {option}
                            <span className="badge" style={BadgeTextStyle}>incorrect</span>
                            </li>);
}

const CorrectAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}
                            >
                            {option}
                            <span className="badge" style={BadgeTextStyle}>correct</span>
                            </li>);
}

const AnsweredAnswerOption = ({ option, onClick }) => {
    return (<li className="list-group-item disabled"
                            key={option} onClick={onClick}
                            style={AnswerOptionsTextStyle}
                            >
                            {option}
                            </li>);
}

module.exports = {
    NormalAnswerOption: NormalAnswerOption,
    PassedAnswerOption: PassedAnswerOption,
    FailedAnswerOption: FailedAnswerOption,
    CorrectAnswerOption: CorrectAnswerOption,
    AnsweredAnswerOption: AnsweredAnswerOption
}
