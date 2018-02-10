
import { QUIZ_TIMER_START, QUIZ_TIMER_TICK, QUIZ_TIMER_STOP, QUIZ_TIMER_ELAPSED } from '../constants/actiontypes'

let timers = [];

const quiztimerapi = store => next => action => {

    switch (action.type) {
        case QUIZ_TIMER_START:
            var timer = {
                token: action.token,
                elapsed: 0,
                duration: action.duration ? action.duration : 30
            }
            timer.interval = setInterval((timer) => store.dispatch({ type: QUIZ_TIMER_TICK, timer: timer, elaspedtime : timer.elapsed }), 1000, timer);
            timers.push(timer);
            break;
        case QUIZ_TIMER_TICK:
            if (action.timer.elapsed == action.timer.duration) {
                store.dispatch({ type: QUIZ_TIMER_ELAPSED, timer: action.timer });
            } else {
                action.timer.elapsed++;
            }
            break;
        case QUIZ_TIMER_ELAPSED:
            clearInterval(action.timer.interval);
            break;
        case QUIZ_TIMER_STOP:
            timers = timers.filter((timer) => {
                if (timer.token === action.token) {
                    clearInterval(timer.interval);
                    return false;
                }
                return true;
            })
            break;
    }
    next(action);
};

export default quiztimerapi