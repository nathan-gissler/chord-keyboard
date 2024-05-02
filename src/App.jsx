import { useEffect, useState } from "react"
import ChordKeyboard from "./ChordKeyboard.jsx"
import Instruments from "./instruments.json"

export default function App() {
  const [instrumentId, setInstrumentId] = useState('acoustic_grand_piano')
  const [instrumentName, setInstrumentName] = useState('Piano')
  const [displayItems, setDisplayItems] = useState(false)

  let selectItems = Instruments.map((instru, index) => (
    <div key={index} onClick={() => {
      setInstrumentId(instru.id)
      setInstrumentName(instru.name)
      setDisplayItems(false)
    }}>
      <div>{instru.name}</div>
    </div>
  ))

  return (
    <div className="app">
      <div className="select-instrument" onClick={() => {setDisplayItems(true)}}>
        <div>
          {instrumentName}
        </div>
      </div>
      <div className="select-items" style={{display: displayItems ? 'flex' : 'none'}}>
        {selectItems}
      </div>
      <ChordKeyboard instrumentId={instrumentId} />
    </div>
  )
}
