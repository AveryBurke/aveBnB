//this is just to make sure Jest is running with the correct mock enviornment variables
// ""yarn docker:up && ./scripts/wait-for-it.sh database:5433 && yarn prisma migrate deploy && 
describe(".env", () => {
    it("should be the test db url", () => {
        expect(process.env.DATABASE_URL).toBe("postgresql://prisma:prisma@localhost:5433/tests")
    })
})