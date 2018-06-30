import hashTable from './hash_table';

describe('Hash Table', () => {
    let myTable;

    test('logs get correctly', () => {
        myTable = hashTable();
        expect(myTable.put(1,1)).toEqual('you tried to push!!!');
    })

    test('logs put correctly', () => {
        myTable = hashTable();
        expect(myTable.get(1)).toEqual('you tried to get!!!');
    })
})