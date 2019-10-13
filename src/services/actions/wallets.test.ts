import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { loadWallets } from "./app";
import {
  setFromWallet,
  setToWallet,
  setLeftWallet,
  setRightWallet,
  exchange,
  getTransaction,
  updateWallets,
  setValue,
  triggerConversion,
  saveTransaction,
  resetWallets
} from "./wallets";
import { rates, rate2 } from "../../__mocks__/rates";
import {
  wallets,
  balances,
  balances_ok,
  balances_not_ok
} from "../../__mocks__/wallets";
import { APP, WALLETS, CONVERT } from "../action_types/";

const mockStore = configureMockStore([thunk]);

describe("Wallets actions", () => {
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

describe("Set from wallet", () => {
  it("should set 'fromWallet' without throw an error", async () => {
    const store = mockStore({ Wallets: { balances } });
    await store.dispatch(setFromWallet(wallets[0]));
    const actions = await store.getActions();
    //console.log(actions)
    expect.assertions(2);
    expect(actions[0].type).toEqual(WALLETS.FROM);
    expect(actions[1].type).toEqual(CONVERT.RUN);
  });
});

describe("Set to wallet", () => {
  it("should set 'toWallet' without throw an error", async () => {
    const store = mockStore({ Wallets: { balances } });
    await store.dispatch(setToWallet(wallets[1]));
    const actions = await store.getActions();
    expect.assertions(2);
    expect(actions[0].type).toEqual(WALLETS.TO);
    expect(actions[1].type).toEqual(CONVERT.RUN);
  });
});

describe("Set selected wallets", () => {
  it("should set left side selection without throw an error", async () => {
    const store = mockStore({ Wallets: { balances } });
    await store.dispatch(setLeftWallet(wallets[0]));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(WALLETS.LEFT);
  });

  it("should set right side selection without throw an error", async () => {
    const store = mockStore({ Wallets: { balances } });
    await store.dispatch(setRightWallet(wallets[1]));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(WALLETS.RIGHT);
  });
});

describe("Perform exhange", () => {
  it("should perform exchange without throw an error", async () => {
    const store = mockStore({
      Wallets: {
        balances: balances_ok,
        wallets,
        fromWallet: wallets[0],
        toWallet: wallets[1]
      }
    });
    await store.dispatch(exchange());
    const actions = await store.getActions();
    expect.assertions(9);
    expect(actions.length).toBe(10);
    expect(actions[0].type).toEqual(WALLETS.RESET);
    expect(actions[1].type).toEqual(WALLETS.ADD_TRANSACTION);
    expect(actions[3].type).toEqual(WALLETS.SET_VALUE);
    expect(actions[3].payload).toBe("");
    expect(actions[5].type).toEqual(WALLETS.ADD);
    expect(actions[6].type).toEqual(WALLETS.FROM);
    expect(actions[7].type).toEqual(CONVERT.RUN);
    expect(actions[8].type).toEqual(WALLETS.TO);
  });

  it("should not perform due to invalid balance", async () => {
    const store = mockStore({
      Wallets: {
        balances: balances_not_ok,
        wallets,
        fromWallet: wallets[0],
        toWallet: wallets[1]
      }
    });
    await store.dispatch(exchange());
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });
});

describe("Transactions ", () => {
  it("it should create transaction", async () => {
    const transaction = getTransaction(wallets[0], wallets[1], balances_ok);
    expect.assertions(3);
    expect(transaction.detail).toBe("You have transfered -3.23 € to $.");
    expect(transaction.from.after).toBe("10.23 €");
    expect(transaction.to.after).toBe("150.45 $");
  });

  it("it should not save transaction", async () => {
    const store = mockStore();
    await store.dispatch(saveTransaction());
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });

  it("it should not save transaction", async () => {
    const transaction = getTransaction(wallets[0], wallets[1], balances_ok);
    const store = mockStore();
    await store.dispatch(saveTransaction({ foo: "" }));
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });

  it("it should save transaction", async () => {
    const transaction = getTransaction(wallets[0], wallets[1], balances_ok);
    const store = mockStore();
    await store.dispatch(saveTransaction(transaction));
    const actions = await store.getActions();
    expect.assertions(2);
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe(WALLETS.ADD_TRANSACTION);
  });
});

describe("Update wallets ", () => {
  it("it should create wallets", async () => {
    const store = mockStore();
    await store.dispatch(updateWallets(wallets));
    const actions = await store.getActions();
    expect.assertions(2);
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual(WALLETS.ADD);
  });

  it("it should not create wallets", async () => {
    const store = mockStore();
    await store.dispatch(updateWallets({}));
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });

  it("it should not create wallets", async () => {
    const store = mockStore();
    await store.dispatch(updateWallets());
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });
});

describe("Update wallets ", () => {
  it("it should set value", async () => {
    const store = mockStore();
    await store.dispatch(setValue("12.3"));
    const actions = await store.getActions();
    expect(actions.length).toBe(1);
  });

  it("it should not reset walets", async () => {
    const store = mockStore();
    await store.dispatch(resetWallets());
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });
});

describe("Conversion", () => {
  it("it should not trigger conversion", async () => {
    const store = mockStore();
    await store.dispatch(triggerConversion(""));
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });

  it("it should not trigger conversion", async () => {
    const store = mockStore();
    await store.dispatch(triggerConversion());
    const actions = await store.getActions();
    expect(actions.length).toBe(0);
  });

  it("it should trigger conversion", async () => {
    const store = mockStore();
    await store.dispatch(triggerConversion("12.5", wallets[0], wallets[1]));
    const actions = await store.getActions();
    expect(actions.length).toBe(1);
  });
});
