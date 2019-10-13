
export default interface Transaction{
    detail:string;
    wallets: {
        from: {
            currency: string;
            symbol: string;
        };
        to: {
            currency: string;
            symbol: string;
        };
    };
    from:{
        before: string;
        diff: string;
        after: string;
    }
    to: {
        before: string;
        diff: string;
        after: string;
    }

    exchange: string;
    time: number;
}