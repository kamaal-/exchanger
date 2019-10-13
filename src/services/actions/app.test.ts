import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { loadWallets } from "./app";
import { rates, rate2 } from "../../__mocks__/rates";
import { APP, WALLETS } from "../action_types/";

const mockStore = configureMockStore([thunk]);

describe("Application main state", () => {
  it("create new wallets from rates and update the state with it", async () => {
    const store = mockStore();
    await store.dispatch(loadWallets({ rates }));
    const actions = await store.getActions();
    expect.assertions(2);
    expect(actions[0].type).toBe(APP.LOAD_WALLETS_STARTED);
    expect(actions[1].type).toBe(WALLETS.ADD);
  });

  it("create new wallets from new rates and update the state with it", async () => {
    const store = mockStore();
    await store.dispatch(loadWallets({ rates: rate2 }));
    const actions = await store.getActions();

    expect.assertions(2);
    expect(actions[0].type).toBe(APP.LOAD_WALLETS_STARTED);
    expect(actions[1].type).toBe(WALLETS.ADD);
  });
});
