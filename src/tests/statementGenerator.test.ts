import { IStatementData, StatementGenerator } from "../services/statementGenerator";


describe('StatementGenerator', () => {

    it('should generate a full statement for a customer with multiple rentals', () => {

        const mockData: IStatementData = {
            customerName: 'Frodo Baggins',
            rentalLineItems: [
                { title: 'The Fellowship of the Ring', charge: 9 },
                { title: 'The Two Towers', charge: 2 },
                { title: 'The Return of the King', charge: 1.5 }
            ],
            totalAmount: 12.5,
            totalFrequentRenterPoints: 3
        };

        const expectedStatement =
            "Rental record for Frodo Baggins\n"+
	        "\tThe Fellowship of the Ring\t9\n"+
	        "\tThe Two Towers\t2\n"+
	        "\tThe Return of the King\t1.5\n"+
            "Amount owed is 12.5\n"+
            "You earned 3 frequent renter points.";
        const result = StatementGenerator.generate(mockData);
        expect(result).toBe(expectedStatement);

    });

    it('should generate a correct statement for a customer with zero rentals', () => {
        
        const mockData: IStatementData = {
            customerName: 'John Smith',
            rentalLineItems: [],
            totalAmount: 0,
            totalFrequentRenterPoints: 0
        };

        const expectedStatement =
            "Rental record for John Smith\n"+
            "Amount owed is 0\n"+
            "You earned 0 frequent renter points.";

        const result = StatementGenerator.generate(mockData);
        expect(result).toBe(expectedStatement);
    });

    it('should generate a correct statement for a customer with only one rental', () => {
        const mockData: IStatementData = {
            customerName: 'Sam',
            rentalLineItems: [
                { title: 'Jaws', charge: 6.5 }
            ],
            totalAmount: 6.5,
            totalFrequentRenterPoints: 1
        };

        const expectedStatement =
            "Rental record for Sam\n"+
	        "\tJaws\t6.5\n"+
            "Amount owed is 6.5\n"+
            "You earned 1 frequent renter points.";
        const result = StatementGenerator.generate(mockData);
        expect(result).toBe(expectedStatement);
    });
});