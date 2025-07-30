# Movie Rental Refactoring Challenge

## Overview

This project refactors Martin Fowler's movie rental example from his book ["Refactoring"](https://www.martinfowler.com/books/refactoring.html). The original code contained several code smells and a pricing bug. This refactoring addresses these issues while implementing a clean architecture.

## Refactoring Process

### Initial Bug Discovery

The original code contained a pricing calculation bug in the Children's movie category:

```typescript
// Line 48 - DEFECT
thisAmount = (each.daysRented - 3) * 1.5  // Should be +=
```

This was overwriting the base price instead of adding to it. A 5-day children's rental was charging $3 instead of $4.50 - that's real money lost. Fixed this first before any refactoring.

### Refactoring Steps

The git history shows the progression:

1. **Started with tests** - Added comprehensive test coverage before touching any production code
2. **Fixed the bug** - Always fix bugs before refactoring
3. **Extract Method** - Broke down the 37-line `statement()` method into focused, testable units
4. **Move Method** - Relocated pricing logic from Customer to where it belongs (following Tell, Don't Ask)
5. **Replace Conditional with Polymorphism** - Implemented the Strategy pattern for pricing, eliminating switch statements
6. **Clean Architecture** - Separated concerns into proper layers (Domain, Application, Infrastructure, Presentation)

### Architecture Decisions

The final structure reflects modern best practices while staying pragmatic:

```
src/
├── domain/           # Core business logic
│   ├── entities/     # Customer, Movie, Rental
│   └── pricing/      # Strategy pattern for movie pricing
├── application/      # Use cases and orchestration
├── infrastructure/   # External concerns (Store)
└── presentation/     # Output formatting
```

### Key Improvements

**Before:**
- Everything crammed into one file
- 37-line method doing multiple things
- Switch statements for movie types
- Business logic mixed with formatting
- Primitive obsession with strings

**After:**
- Single Responsibility - each class has one job
- Open/Closed - add new movie types without changing existing code
- Dependency Inversion - depend on abstractions, not concretions
- Type safety with TypeScript
- 100% test coverage with meaningful tests

### Trade-offs and Decisions

Some deliberate simplifications:

- **No dependency injection framework** - overkill for this size project
- **No separate Money value object** - premature abstraction at this stage
- **Kept the Store pattern** - maintains backwards compatibility
- **No async/promises** - not needed for current requirements

These aren't oversights - they're conscious decisions based on YAGNI principles. The architecture supports adding these later if needed.

### Testing Approach

Rather than just unit tests, I focused on behavior:
- Integration tests verify the entire flow works correctly
- Edge cases for boundary conditions (exactly at rental thresholds)
- Specific regression test for the pricing bug
- Tests document the business rules clearly

## Running the Project

```bash
npm install          # Install dependencies
npm test            # Run all tests (81 passing)
npm run build       # Compile TypeScript
npm start           # Run the demo

# Development
npm run lint        # Check code quality
npm run typecheck   # Verify types
```

## Technical Approach

The refactoring follows Fowler's catalog of patterns:
- Extract Method for breaking down complex functions
- Move Method to relocate misplaced responsibilities  
- Replace Conditional with Polymorphism for type-based behavior
- Introduce Parameter Object for related data

The code structure now reflects the business domain directly through class and method names.

## Final Thoughts

Perfect code doesn't exist, but maintainable code does. This refactoring prioritizes clarity, testability, and extensibility over premature optimization. It's ready for the next feature request, whatever that might be.