import ModuleModel from './model/ModuleModel';
import {stateContainer} from 'uadp-react';
import Root from './component/Root';

let app = new stateContainer();

app.model(ModuleModel);

app.ready(function (dispatch) {
	dispatch({type: 'listModuleTree'});
	dispatch({type: 'listModule'});
});

app.start(Root, 'root');