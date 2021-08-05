import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useEffect} from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';


export default function AgeDemo(){
    const serverURL = 'http://localhost:3000'
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [ageCountList, setAgeCountList] = useState([]);

    useEffect(()=>{
        // console.log(selectedItem);
        axios.get(serverURL+'/users/age?item='+selectedItem)
            .then(res =>{
                    console.log(res.data);
                     setAgeCountList(res.data);




            });
        ageCountList.forEach(item=>{
            console.log(item.age);
            console.log(item.count);
        })
    },[selectedItem]);

    useEffect(()=>{
        axios.get(serverURL+'/items')
            .then(res =>{
                setItems(res.data);
            })
    },[]);



    return(
        <div>
            <h4 style={{textAlign: 'left'}}>Age Demographic Of Users With {selectedItem === '' ? '___' : selectedItem}</h4>
            <Dropdown style={{textAlign: 'left'}}>


                <DropdownButton onSelect={(e) => setSelectedItem(e)} title='item'>
                    {items.map((item, index)=>{
                        return <Dropdown.Item eventKey={item} key={index}>{item}</Dropdown.Item>
                    })}
                </DropdownButton>
            </Dropdown>

            {selectedItem !== '' ? <Table style={{width: '30%'}}>
                <tbody>
                <tr>
                    <th>Age</th>
                    <th>Count</th>
                </tr>


                {
                    ageCountList.map((obj, index) => {
                        return (
                            <tr key={index}>
                                <td>{obj.age}</td>
                                <td>{obj.count}</td>

                            </tr>
                        )
                        }
                    )
                }


                </tbody>
            </Table>: null}
        </div>
    )
}
