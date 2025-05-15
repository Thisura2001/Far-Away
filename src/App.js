import './index.css';
import { useState } from "react";

function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleOnSubmit(e) {
        e.preventDefault();
        if (!description) return;

        const newItem = {
            description,
            quantity: Number(quantity),
            packed: false,
            id: Date.now(),
        };

        onAddItems(newItem);
        setDescription('');
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleOnSubmit}>
            <h3>What do you need for your 🥰 trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>{num}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items , onDeleteItem,onUpdateItem}) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item item={item} onDeleteItem={()=>onDeleteItem(item.id)}  onUpdateItem={()=>onUpdateItem(item.id)}key={item.id} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item , onDeleteItem ,onUpdateItem}) {
    return (
        <li>
            <input type='checkbox'value={item.packed} onChange={()=>{onUpdateItem(item.id)}}/>
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            {item.quantity} {item.description}
        </span>
            <button className="" onClick={onDeleteItem}>❌</button>
        </li>
    );
}

function Stats({ items }) {
    const total = items.length;
    const packed = items.filter((item) => item.packed).length;
    const percent = total > 0 ? Math.round((packed / total) * 100) : 0;

    return (
        <footer className="stats">
            <em>
                You have {total} item{total !== 1 ? 's' : ''} on your list, and you already packed {packed} ({percent}%)
            </em>
        </footer>
    );
}

function App() {
    const [items, setItems] = useState([]);

    function handleItemAdd(item) {
        setItems((items) => [...items, item]);
    }
    function handleDeleteItem(id){
        setItems((items)=>items.filter(item=>item.id !== id))
    }
    function handleToggle(id){
        setItems((items)=>items.map(item=>item.id === id ? {...item, packed: !item.packed} : item))
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleItemAdd} /> 
            <PackingList items={items} onDeleteItem = {handleDeleteItem} onUpdateItem={handleToggle}/>
            <Stats items={items} />
        </div>
    );
}

export default App;
