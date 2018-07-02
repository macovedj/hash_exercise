const hashTable = () => {
    let keys = [];
    let indices = [];
    let values = [];
    let table = [];
    let keyString;
    let multipleKeys;
    let hash;
    const notAssigned = 'That key doesn\'t have a value assigned to it yet.  You may add one using the put method if you like';
    const duplicateHashMessage = 'The hash of that key has many values tied to it, please give an array index to get the desired value from the following array of possibly intended values as an additional argument to your get method: ';
    const hasher = {
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4, 
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "A": 10,
        "B": 11,
        "C": 12,
        "D": 13,
        "E": 14,
        "F": 15,
        "G": 16,
        "H": 17,
        "I": 18,
        "J": 19,
        "K": 20,
        "L": 21,
        "M": 22,
        "N": 23,
        "O": 24,
        "P": 25,
        "Q": 26,
        "R": 27,
        "S": 28,
        "T": 29,
        "U": 30,
        "V": 31,
        "W": 32,
        "X": 33,
        "Y": 34,
        "Z": 35,
        "a": 36,
        "b": 37,
        "c": 38,
        "d": 39,
        "e": 40,
        "f": 41,
        "g": 42,
        "h": 43,
        "i": 44,
        "k": 45,
        "l": 46,
        "m": 47,
        "n": 48,
        "o": 49,
        "p": 50,
        "q": 51,
        "r": 52,
        "s": 53,
        "t": 54,
        "u": 55,
        "v": 56,
        "w": 57,
        "x": 58,
        "y": 59,
        "z": 60,
    }

    const hashFunction = (key) => {
        typeof key === 'string' ? keyString = key : keyString = JSON.stringify(key);
        let hash = keyString.split("").map(char => hasher[char] ? hasher[char] : 111)
        .reduce((acc, cur) => parseInt(acc.toString() + cur.toString()));
        return hash        
    }

    const put = (key, value) => {
        typeof key === 'string' ? hash = hashFunction(key) : hash = hashFunction(JSON.stringify(key));
        if (get(key, 0) === notAssigned) {
            keys.push(keyString);
            indices.push(hash);
            multipleKeys = false;
            table[hashFunction(keyString)] = [hash, value, { multipleKeys }];
        return table[hash]
        }

        for (var triple of table) {
            if (triple !== undefined) {
                if (triple[0] === hash && triple[2].multipleKeys === false) {
                    triple[1] = [triple[1]];
                    triple[1].push(value);
                    triple[2].multipleKeys = true;
                } else if (triple[0] === hash && triple[2].multipleKeys === true) {
                    triple[1].push(value);
                }
            }
        }

        return table[hash]
        
    }

    const get = (key, index = -1) => {
        typeof key === 'string' ? hash = hashFunction(key) : hash = hashFunction(JSON.stringify(key));
        
        for (var triple of table) {
            if (triple !== undefined) {
                if (triple[0] === hash && triple[2].multipleKeys === false) {
                    return triple[1]
                } else if (triple[0] === hash && index !== -1 && triple[2].multipleKeys === true) {
                    return triple[1][index]
                } else if (triple[0] === hash && index === -1 && triple[2].multipleKeys === true) {
                    return duplicateHashMessage + JSON.stringify(triple[1])
                }
            }
        }
        
        return notAssigned
    }

    return { put, get, hashFunction }
}

export default hashTable;