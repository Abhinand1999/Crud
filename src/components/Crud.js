import React, { useState } from 'react'

function Crud() {

    const Phone = [{
        id: 1,
        Name: 'Realme',
        price: 20000
    },
    {
        id: 2,
        Name: 'Redme',
        price: 7000
    }]


    const [list, setList] = useState(Phone)
    const [update, setUpdate] = useState(-1)

    function handleSubmit(event) {
        event.preventDefault();
        const Name = event.target.elements.Name.value
        const price = event.target.elements.price.value
        const NewList = {
            id: list.length + 1,
            Name,
            price
        }
        setList((prevList) => {
            return prevList.concat(NewList)
        })
    }


    function EditList({ l, list, setList }) {


        function handleInput(e) {
            const NewList = list.map(li => (
                li.id === l.id ? { ...li, [e.target.name]: e.target.value } : li
            ))
            setList(NewList)
        }




        return (
            <tr>

                <td><input type='text' name='Name' value={l.Name} onChange={handleInput}></input></td>
                <td><input type='text' name='price' value={l.price} onChange={handleInput}></input></td>
                <td><button type='submit' className='submit'>Submit</button></td>
            </tr>

        )
    }

    function handleEdit(id) {
        setUpdate(id)
    }
    function handleUpdate(e) {
        e.preventDefault()
        setUpdate(-1)
    }
    function handleDelete(id)
    {
        const newlist= list.filter((l)=>l.id!==id)
        setList(newlist)
    }

    return (
        <div>
            <div>
                <form className='addform' onSubmit={handleSubmit}>
                    <input type='text' name='Name' placeholder='Enter the phone name'>
                    </input>
                    <input type='text' name='price' placeholder='price'></input>
                    <button type='submit' className='add' >Add</button>
                </form>
                <form onSubmit={handleUpdate}>
                    <table align='center'>
                        {list.map((l) => (
                            update === l.id ? <EditList key={l.id} l={l} list={list} setList={setList} /> :
                                <tr>
                                    <td>
                                        {l.Name}
                                    </td>
                                    <td>
                                        {l.price}
                                    </td>

                                    <td>
                                        <button className='edit' onClick={() =>handleEdit(l.id)}>Edit</button>
                                        <button className='delete' onClick={()=>handleDelete(l.id)} >delete</button>
                                    </td>
                                </tr>)

                        )}

                    </table>
                </form>
            </div>
        </div>
    )
}

export default Crud