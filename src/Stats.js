export default function Stats({ items }) {
    if (!items.length) return <p className='stats'>
        <em>Start adding some items to your packing list 🚀</em>
    </p>;
    const total = items.length;
    const packed = items.filter((item) => item.packed).length;
    const percent = total > 0 ? Math.round((packed / total) * 100) : 0;

    return (
        <footer className="stats">
            <em>
                {percent === 100
                    ? "You got everything packed! 🎉 Happy travels ✈️"
                    : `You have ${total} item${total !== 1 ? 's' : ''} on your list 📃, and you already packed ${packed} ✅ (${percent}%)`}
            </em>
        </footer>
    );
}
