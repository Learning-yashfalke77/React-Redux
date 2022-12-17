import { isEven } from "./src/math"

describe("isEven", () => {
    it("should given true if number is even", () => {
        // function under test
        const result = isEven(2)
        expect(result).toEqual(true)
    })

    it("should given false if number is not even", () => {
        // function under test
        const result = isEven(1)
        expect(result).toEqual(false)
    })
})