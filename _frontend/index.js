import './index.scss';

import 'document-register-element';
import 'reactive-elements';

import Logo from './components/logo/logo';
import Model from './components/model_visualisation/model_visualisation';
import Countdown from './components/countdown/countdown';
import ConstituencyMap from './components/constituency_map/constituency_map';
import randomiseLists from './utils/randomise_lists';


randomiseLists();

document.registerReact('sixfifty-model', Model);
document.registerReact('sixfifty-logo', Logo);
document.registerReact('sixfifty-countdown', Countdown);
document.registerReact('sixfifty-map', ConstituencyMap);
