import './index.scss';

import 'document-register-element';
import 'reactive-elements';

import Logo from './components/logo/logo';
import ConstituencyMap from './components/constituency_map/constituency_map';
import randomiseLists from './utils/randomise_lists';


randomiseLists();

document.registerReact('sixfifty-logo', Logo);
document.registerReact('sixfifty-map', ConstituencyMap);
