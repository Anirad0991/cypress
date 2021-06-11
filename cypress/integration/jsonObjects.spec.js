/// <reference types="cypress"/>

describe('JSON objects', () => {

    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2"}

        const simpleArraysOfValues = ["one", "two", "three"]

        const arrayofObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]

        const typeOfData = {"string": "this is a string", "number": 10}

        const mix = {
            "FirstName": "Darina",
            "LastName": "Katyk",
            "Age": "31",
            "students": [
                {
                    "FirstName": "Sara",
                    "LastName": "Konor",
                },
                {
                    "FirstName": "Sara1",
                    "LastName": "Konor1",
                }

            ]
        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArraysOfValues[1])
        console.log(arrayofObjects[2].key3)
        console.log(mix.students[1].LastName)

    })


})