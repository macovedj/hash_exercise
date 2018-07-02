import hashTable from './hash_table';

describe('Hash Table', () => {
    let myTable;

    test('hashFunction hashes as expected with expected characters', () => {
        myTable = hashTable();
        expect(myTable.hashFunction('foo')).toEqual(414949)
    })

    test('hashFunction hashes as expected with unexpected characters', () => {
        myTable = hashTable();
        expect(myTable.hashFunction('foo.')).toEqual(414949111)
    })

    test('puts when key type is string', () => {
        myTable = hashTable();
        expect(myTable.put("foo", 1)).toEqual([414949, 1, { 'multipleKeys': false }]);
    })

    test('successive puts are handled correctly when key is first assigned', () => {
        myTable = hashTable();
        myTable.put('foo', 1);
        expect(myTable.put('bar', 2)).toEqual([373652, 2, { 'multipleKeys': false }]);
    })

    test('successive puts are handled correctly when key is reAssigned', () => {
        myTable = hashTable();
        myTable.put('foo', 1);
        expect(myTable.put('foo', 2)).toEqual([414949, [1, 2], { 'multipleKeys': true }]);
        expect(myTable.put('foo', 3)).toEqual([414949, [1, 2, 3], { 'multipleKeys': true }]);
    })

    test('get works correctly if key is defined once', () => {
        myTable = hashTable();
        myTable.put('foo', 1);
        expect(myTable.get('foo')).toEqual(1);
    })

    test('get works correctly if key is not defined', () => {
        myTable = hashTable();
        myTable.put('foo', 1);
        expect(myTable.get('bar')).toEqual('That key doesn\'t have a value assigned to it yet.  You may add one using the put method if you like');
    })

    test('get works correctly if key is duplicated and index is provided', () => {
        myTable = hashTable();
        myTable.put('foo', 1);
        myTable.put('foo', 'hello');
        expect(myTable.get('foo', 0)).toEqual(1);
        expect(myTable.get('foo', 1)).toEqual('hello');
    })

    test('get works correctly if key is duplicated and index is not provided', () => {
        myTable = hashTable();
        myTable.put('foo', 1);
        myTable.put('foo', 'hello');
        expect(myTable.get('foo')).toEqual('The hash of that key has many values tied to it, please give an array index to get the desired value from the following array of possibly intended values as an additional argument to your get method: [1,"hello"]');
    })
})