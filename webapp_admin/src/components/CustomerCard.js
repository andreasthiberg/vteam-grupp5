function CustomerCard({customer}) {
    return (
        <div className="card">
            <p className="fat">{customer.id}: {customer.last_name}, {customer.first_name}</p>
            <p className="slim">{customer.email} / {customer.balance} kr</p>
        </div>
    );
}

export default CustomerCard;