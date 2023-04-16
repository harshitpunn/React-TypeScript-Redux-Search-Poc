import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepositories = (searchTerm: string) => {
  return async (dispatch:Dispatch<Action>) =>{
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES
    });

    try {
      const {data}:any = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: searchTerm
        }
      });

      const searchNames = data.objects.map((result:any)=>{
        return result.package.name
      })

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCESS,
        payload: searchNames
      });

    }
    catch(error: any) {
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: error.message
      });
    }
  }
}