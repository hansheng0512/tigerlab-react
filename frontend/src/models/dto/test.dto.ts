export type TestDetails = {
    name: string,
    route: string,
}

export type Test = {
    category: string,
    description: string,
    tests: TestDetails[]
}

export type TestDtoResponse = {
    tests: Test[]
}