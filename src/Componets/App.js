import '../index.css';
import { useState } from "react";
import  Logo  from './Logo';
import  Form  from './Form';
import  PackingList  from './PackingList';
import  Stats  from './Stats';

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
    function clearList(){
        setItems([]);
    }
     

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleItemAdd} /> 
            <PackingList items={items} onDeleteItem = {handleDeleteItem} onUpdateItem={handleToggle} onClearItem={clearList}/>
            <Stats items={items} />
        </div>
    );
}

export default App;
