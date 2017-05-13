import './index.scss';

import 'document-register-element';
import 'reactive-elements';

// Components
import Logo from './components/logo/logo';
import Model from './components/model_visualisation/model_visualisation';
import Countdown from './components/countdown/countdown';
import Prediction from './components/prediction/prediction';
import CurrrentPolls from './components/current_polls/current_polls';
import ConstituencyMap from './components/constituency_map/constituency_map';

// D3
import PollsTracker from './d3/polls_tracker/polls_tracker';

// Utils
import randomiseLists from './utils/randomise_lists';
import './utils/data_hub';

// Promise Polyfill
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

randomiseLists();

// Register components
document.registerReact('sixfifty-model', Model);
document.registerReact('sixfifty-logo', Logo);
document.registerReact('sixfifty-countdown', Countdown);
document.registerReact('sixfifty-map', ConstituencyMap);
document.registerReact('sixfifty-current-polls', CurrrentPolls);
document.registerReact('sixfifty-prediction', Prediction);

// Initialise D3 visualisations
const pollsTracker = document.querySelector('#polls-tracker');
if (pollsTracker) {
  new PollsTracker(pollsTracker);
}
