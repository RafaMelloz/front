import { Data } from "../interfaces/data";

export function calculateOverLimitExpense(maxSpending: number, unexpectedCosts: Data[]) {
    let value = 0;

    for (let i = 0; i < unexpectedCosts.length; i++) {
        value += unexpectedCosts[i].value ? parseFloat(unexpectedCosts[i].value) : 0;
    }

    return value > maxSpending ? value - maxSpending : 0;
}
