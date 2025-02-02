import type {AllNavigatorParamList} from './routes/params';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllNavigatorParamList {}
  }
}
