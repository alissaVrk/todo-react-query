import { initProviders, wrapComponentWithProviders } from "./libApp/providers";
import Todos from "./todo/components/Todos";
import { react2angular } from 'react2angular'
import {CurrentUser} from "./user/components/CurrentUser"
import { CounterComp } from "./counter/CounterComp";

const Todos_R = wrapComponentWithProviders(Todos);
const User_R = wrapComponentWithProviders(CurrentUser);
const Counter_r = wrapComponentWithProviders(CounterComp);

const initLib = () => initProviders(document.getElementById('root'));
initLib();

//poll for this shit..?
//@ts-ignore
angular
  .module('myApp.reactComps', [])
  .component('todoComp', react2angular(Todos_R, ['filter']))
  .component('userComp', react2angular(User_R, []))
  .component('counterComp', react2angular(Counter_r, []));

