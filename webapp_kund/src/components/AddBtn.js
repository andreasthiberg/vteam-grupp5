import { useState } from 'react';
//import paymentModel from './../models/payment';
import { gql, useMutation } from '@apollo/client';

export default function AddBtn(props) {
    const [showFrom, setShowForm] = useState(false);
    const [selected, setSelected] = useState("");
    const [approved, setApproved] = useState(false);

    const UPDATE_CUSTOMER = gql`
            mutation UpdateCustomer($id: Int!, $balance: Int!) {
                updateCustomer(id: $id, balance: $balance) {
                    id
                    balance
                }
            }
        `;

    function goToFrom() {
        setShowForm(true);
    }

    function addBalance(event) {
        event.preventDefault();
        setApproved(true);
    }

    function complete(event) {
        event.preventDefault();
        let updatedBalance = parseInt(props.balance) + parseInt(selected)

        props.setBalance(updatedBalance);

        //paymentModel.updateBalance(updatedBalance);
        updateCustomer({
            variables: {
                id: props.user.id, 
                balance: updatedBalance
            }
        });
    }

    const [updateCustomer, { data }] = useMutation(UPDATE_CUSTOMER);
    console.log("updated customer", data);

    function changeValue(event) {
        setSelected(event.target.value);
    }

    if (showFrom) {
        return (
            <div>
            {(approved === true) ?
                <div>
                    <p>Swosh has authorized your money transfer to High5.</p>
                    <p>To complete the payment, please click the button.</p>
                    <button className="button1" onClick={complete}>Complete</button>
                </div>
                :
                <>
                    <div>
                        <form>
                            <label>Select how much you want to add to your balance:&nbsp;
                                <select value={selected} onChange={changeValue}>
                                    <option value="0"></option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="300">300</option>
                                    <option value="400">400</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                </select>
                            </label>
                        </form>
                </div>
                <div>
                    <button className="button1" onClick={addBalance}>Swosh</button>
                </div>
                </>
            }
            </div>
        );
    } else {
        return (
            <button className="button1" onClick={goToFrom}>Add</button>
        );
    }
}
