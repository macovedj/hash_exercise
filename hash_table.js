const hashTable = () => {
    let keys = [];
    let indices = [];
    let table = [];
    let keyString;
    let multipleKeys;
    const notAssigned = 'That key doesn\'t have a value assigned to it yet.  You may add one using the put method if you like';
    const duplicateKeyMessage = 'That key has many values tied to it, please give an array index to get the desired value from the following array: ';

    const put = (key, index) => {
        typeof key === 'string' ? keyString = key : keyString = JSON.stringify(key);
        if (get(key, 0) === notAssigned) {
            keys.push(keyString);
            indices.push(index);
            multipleKeys = false;
            table.push([keyString, index, { multipleKeys }]);
        return table
        }

        for (var pair of table) {
            if (pair[0] === keyString && pair[2].multipleKeys === false) {
                pair[1] = [pair[1]];
                pair[1].push(index);
                pair[2].multipleKeys = true;
            } else if (pair[0] === keyString && pair[2].multipleKeys === true) {
                pair[1].push(index);
            }
        }

        return table
        
    }

    const get = (key, index = -1) => {
        typeof key === 'string' ? keyString = key : keyString = JSON.stringify(key);
        
        for (var pair of table) {
            if (pair[0] === keyString && pair[2].multipleKeys === false) {
                return pair[1]
            } else if (pair[0] === keyString && index !== -1 && pair[2].multipleKeys === true) {
                return pair[1][index]
            } else if (pair[0] === keyString && index === -1 && pair[2].multipleKeys === true) {
                return duplicateKeyMessage + JSON.stringify(pair[1])
            }
        }

        return notAssigned
    }

    return { put, get }
}

export default hashTable;