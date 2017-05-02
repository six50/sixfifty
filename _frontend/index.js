import './index.scss';

import 'document-register-element';
import 'reactive-elements';

// Components
import Logo from './components/logo/logo';
import Model from './components/model_visualisation/model_visualisation';
import Countdown from './components/countdown/countdown';
import ConstituencyMap from './components/constituency_map/constituency_map';

// D3
import pollsTracker from './d3/polls_tracker';

// Utils
import randomiseLists from './utils/randomise_lists';


randomiseLists();

// Register components
document.registerReact('sixfifty-model', Model);
document.registerReact('sixfifty-logo', Logo);
document.registerReact('sixfifty-countdown', Countdown);
document.registerReact('sixfifty-map', ConstituencyMap);

// Initialise D3 visualisations
pollsTracker(document.querySelector('#polls-tracker'));
