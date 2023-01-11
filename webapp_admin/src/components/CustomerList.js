import customerModel from '../models/customers'

export default function CustomerList ({ customersInfo, reloadCustomers, setSelectedCustomer }) {
  async function changeCustomerStatus (id, status) {
    await customerModel.setCustomerStatus(id, status)
    reloadCustomers()
  }

  return (

    <div className='row'>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th> Id</th>
            <th> Namn</th>
            <th> E-mail</th>
            <th> Status</th>
            <th> Hantera</th>
          </tr>
        </thead>
        <tbody>
          {
                            customersInfo.map(
                              customer =>
                                <tr key={customer.id}>
                                  <td> {customer.id} </td>
                                  <td> {customer.last_name} {customer.first_name}</td>
                                  <td> {customer.email}</td>
                                  <td> {customer.status === 1 ? 'Aktiv' : 'Ej aktiv'}</td>
                                  <td>
                                    {customer.status === 1
                                      ? <button onClick={() => changeCustomerStatus(customer.id, 0)} className='customer-button'>Avaktivera </button>
                                      : <button onClick={() => changeCustomerStatus(customer.id, 1)} className='customer-button'>Aktivera </button>}
                                    <button className='customer-button' onClick={() => setSelectedCustomer(customer)}>Se information </button>
                                  </td>
                                </tr>
                            )
                        }
        </tbody>
      </table>
    </div>

  )
}
