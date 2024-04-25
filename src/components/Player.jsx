import React, { useState } from 'react'
export default function Player({name,symbol,isActive,onChangeName}) {
    const [isEditing, setisEditing] = useState(false)
    const [changeName, setChangeName] = useState(name)

    function handleClick(){
      setisEditing((editing)=>!editing)
      if(isEditing){
        onChangeName(symbol,changeName)
      }
    }

    function handleChange(event){
        setChangeName(event.target.value)
    }

    let playerName = <span className="player-name">{changeName}</span>
    
    if(isEditing){
        playerName = <input type="text" onChange={()=>handleChange(event)} value={changeName} />
    }

    return <li className={isActive ? 'active' :''}>
        <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit" }</button>
    </li>
}

