import {expect} from 'chai';
import { searchByYear } from "../src/components/Search/searchApi.js";

describe('Search by year',() => {
    it('should return an error if searchText is not a valid number', async function () {
        const result = await searchByYear('abc', 1);

        expect(result).to.deep.equal({ error: 'Invalid year: must be a valid number' });
    });

    it('should return an error if searchText is a float', async function () {
        const result = await searchByYear('2022.5', 1);

        expect(result).to.deep.equal({ error: 'Invalid year: must be a valid number' });
    });

    it('should return an error if year is greater than current year', async function () {
        const result = await searchByYear('2025', 1);

        expect(result).to.deep.equal({ error: 'Invalid year' });
    });
})
