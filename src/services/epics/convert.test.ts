import { TestScheduler } from "rxjs/testing";
import { CONVERT } from "../action_types";
import convert from "./convert";
import { wallets } from "../../__mocks__/wallets";

const testScheduler = new TestScheduler((actual, expected) => {
  describe("Converter start", () => {
    it("Should pass", () => {
      expect(expected[0].notification.value.type).toBe(CONVERT.RUN);
    });
  });
});

testScheduler.run(({ hot, cold, expectObservable }) => {
  //const {input, fromWallet, toWallet}
  const action$ = cold("-a", {
    a: {
      type: CONVERT.DO,
      payload: { input: "12", fromWallet: wallets[0], toWallet: wallets[1] }
    }
  });
  const output$ = convert(action$);

  expectObservable(output$).toBe("---a", {
    a: {
      type: CONVERT.RUN,
      payload: {}
    }
  });
});
