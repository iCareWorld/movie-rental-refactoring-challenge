export interface IStatementData {
    customerName: string;
    rentalLineItems: { title: string; charge: number }[];
    totalAmount: number;
    totalFrequentRenterPoints: number;
}

/**
 * A static class for generating plain-text rental statements.
 */
export class StatementGenerator {

    /**
     * Generates a formatted plain-text rental statement from the provided data.
     * @param {IStatementData} data  An object containing all the necessary information to generate the statement.
     * @returns {string} A formatted, multi-line string representing the customer's rental statement.
     */
    static generate(data: IStatementData): string {
        let statementText = `Rental record for ${data.customerName}\n`;

        for (const item of data.rentalLineItems) {
            statementText += `\t${item.title}\t${item.charge}\n`;
        }

        statementText += `Amount owed is ${data.totalAmount}\n`;
        statementText += `You earned ${data.totalFrequentRenterPoints} frequent renter points.`;

        return statementText;
    }
}