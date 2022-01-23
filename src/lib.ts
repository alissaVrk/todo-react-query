import { initProviders, wrapComponentWithProviders } from "./libApp/providers";
import Todos from "./todo/components/Todos";
import { react2angular } from 'react2angular'
import {CurrentUser} from "./user/components/CurrentUser"
import { CounterComp } from "./counter/CounterComp";
import {ItemsCount} from './dixie/ItemsCount'
import { initDixieDB } from "./dixie/dt";

const Todos_R = wrapComponentWithProviders(Todos);
const User_R = wrapComponentWithProviders(CurrentUser);
const Counter_r = wrapComponentWithProviders(CounterComp);
const ItemsCount_R = wrapComponentWithProviders(ItemsCount);

const initLib = () => {
  initDixieDB();
  initProviders(document.getElementById('root'));
}

declare global {
  interface Window {
    // add you custom properties and methods
    initReactApp:() => void
  }
}

window.initReactApp = initLib;

//poll for this shit..?
//@ts-ignore
angular
  .module('myApp.reactComps', [])
  .component('todoComp', react2angular(Todos_R, ['filter']))
  .component('userComp', react2angular(User_R, []))
  .component('counterComp', react2angular(Counter_r, []))
  .component('itemsCount', react2angular(ItemsCount_R, []));

