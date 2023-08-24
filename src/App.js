import { useState } from 'react';

const initialShoppingItems = [
    {
        name: 'Cake',
        id: crypto.randomUUID(),
        price: 3.5,
        numberOfItems: 3,
    },

    {
        name: 'Chocolate',
        id: crypto.randomUUID(),
        price: 1.5,
        numberOfItems: 5,
    },

    {
        name: 'Spinach',
        id: crypto.randomUUID(),
        price: 2.0,
        numberOfItems: 2,
    },
];

export default function App() {
    const [shoppingItems, setShoppingItems] = useState(initialShoppingItems);

    function handleAddItem(item) {
        setShoppingItems(items => [...items, item]);
    }

    function handleDeleteItem(id) {
        setShoppingItems(shoppingItems.filter(item => item.id !== id));
    }

    return (
        <div className='app'>
            <AddItems onAddItem={handleAddItem} />
            <ShoppingList
                shoppingItems={shoppingItems}
                onDeleteItem={handleDeleteItem}
            />
            <Total shoppingItems={shoppingItems} />
        </div>
    );
}

function AddItems({ onAddItem }) {
    const [numberOfItems, setNumberOfItems] = useState(1);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');

    const id = crypto.randomUUID();

    function handleSubmit(e) {
        e.preventDefault();

        if (!name) return;

        const newItem = {
            name,
            id,
            price,
            numberOfItems,
        };

        console.log(newItem);

        setPrice(price * numberOfItems);

        onAddItem(newItem);

        setName('');
        setNumberOfItems(1);
        setPrice(0);
    }

    return (
        <form className='add-items' onSubmit={handleSubmit}>
            <select
                value={numberOfItems}
                onChange={e => setNumberOfItems(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type='text'
                placeholder='cake...?'
                value={name}
                onChange={e => setName(e.target.value)}
            ></input>
            <input
                placeholder='price of item...'
                value={price}
                onChange={e => setPrice(e.target.value)}
            ></input>
            <button className='add-button'>Add</button>
        </form>
    );
}

function ShoppingList({ shoppingItems, onDeleteItem }) {
    return (
        <ul className='list'>
            {shoppingItems.map(item => (
                <Item
                    item={item}
                    key={item.id}
                    onDeleteItem={onDeleteItem}
                    numberOfItems={item.numberOfItems}
                />
            ))}
        </ul>
    );
}

function Item({ item, onDeleteItem }) {
    const newPrice = item.price * item.numberOfItems;
    return (
        <>
            <li>
                <input type='checkbox'></input>
                <p>
                    {item.numberOfItems}x {item.name}: <span>£{newPrice}</span>
                </p>
                <button
                    className='delete-item'
                    onClick={() => onDeleteItem(item.id)}
                >
                    ❌
                </button>
            </li>
        </>
    );
}

function Total({ shoppingItems }) {
    const totalPrice = shoppingItems.map(item =>
        Number(item.price * item.numberOfItems)
    );
    const total = totalPrice.reduce((acc, curr) => acc + curr, 0);
    return (
        <div className='total'>
            <h3>Total Cost: £{total}</h3>
        </div>
    );
}
