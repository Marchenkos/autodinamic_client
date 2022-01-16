import ru from './LocaleStrings.json';

interface ILocaleStrings {
    checkout: {
        basket: {
            tableHeaders: string[];
            header: string;
            resultCard: {
                resultHeader: string;
                continueShopping: string;
                confirmOrder: string;
            };
            resultLabels: {
                quantity: string;
                totalPrice: string;
            };
            preview: {
                header: string;
            };
        };
    };
    productList: {
        buttons: {
            addToBasket: string;
            showDetails: string;
        };
    };
    account: {
        headers: {
            login: string;
        };
        buttons: {
            login: string;
        };
    };
    header: {
        search: {
            placeholder: string;
        };
    };
}

export const LocaleStrings: ILocaleStrings = ru;
