import { ofType } from "redux-observable";
import { timer } from "rxjs";
import { APP } from "../action_types";
import { switchMap, mapTo, map } from "rxjs/operators";
import axios from "axios";

export default (action$: any) =>
  action$.pipe(
    ofType(APP.START_POLLING),
    switchMap(() => {
      return timer(1000, 10000).pipe(
        map(a => {
          return a;
        }),
        switchMap(() => {
          return axios.get(
            "https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,SEK,CZK,MYR"
          );
        }),
        mapTo({ type: APP.SUCCESS_POLLING })
      );
    })
  );
