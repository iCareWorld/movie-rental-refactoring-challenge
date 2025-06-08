export interface IStatementData {
    customerName: string;
    rentalLineItems: { title: string; charge: number }[];
    totalAmount: number;
    totalFrequentRenterPoints: number;
}

export class StatementGenerator {

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