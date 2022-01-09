import { initProviders, wrapComponentWithProviders } from "./libApp/providers";
import Todos from "./todo/components/Todos";
import { react2angular } from 'react2angular'
import {CurrentUser} from "./user/components/CurrentUser"

initProviders();
export const Todos_R = wrapComponentWithProviders(Todos);
export const User_R = wrapComponentWithProviders(CurrentUser);


//poll for this shit..?
//@ts-ignore
angular
  .module('myApp.reactComps', [])
  .component('todoComp', react2angular(Todos_R, ['filter']))
  .component('userComp', react2angular(User_R, []));

