import React, { useState } from 'react'

function reverseString(str: string){
    const strArray = str.trim().split(' ')
    const reversed =  strArray.map(el=> el.split('').reverse().join(''))
    return reversed.join(' ')
}

function SentenceConverter() {
    const [value, setValue] = useState<string>('')
    const [reversedString, setReversedString] = useState<string>('')

    function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    function handleReverseString(str: string) {
        const reversedString = reverseString(str)
        setReversedString(reversedString)
    }

    function saveReversedSentence(){
        alert('Saving reveresed sentence...')
    }
    return (
        <div>
            <div>SentenceConverter</div>
            <div>
                <input id={'reverse-ui-input'} placeholder='placeholderito' value={value} onChange={handleInputChange}></input>
                <button type={'button'} onClick={()=>handleReverseString(value)}>Reverse</button>
            </div>
            {reversedString && reversedString!=='' && 
                <div>
                    <h4>{reversedString}</h4>
                    <button type={'button'} onClick={saveReversedSentence}>Save reversed sentence</button>
                </div>}
        </div>
    )
}

export { SentenceConverter, reverseString } 