import React, { useState } from 'react'
import Select from "react-select"
import { Rnd } from "react-rnd";
import "./Custom.css"
import * as html2canvas from 'html2canvas';
import saveAs from "file-saver"

const Custom = () => {

    var color = [
        { value: 1, label: "white" },
        { value: 2, label: "black" },
        { value: 3, label: "red" },
        { value: 4, label: "blue" },
        { value: 5, label: "yellow" },
        { value: 6, label: "green" },
        { value: 7, label: "orange" },
        { value: 8, label: "gray" },

    ]
    const [first, setfirst] = useState(color.label)

    const [second, setSecond] = useState('')

    var changeHandler = e => {
        setfirst(e.label)
    }
    const designHandler = (event) => {
        const getuser = event.target.value
        setSecond(getuser)
    }

    function refresh() {
        window.location.reload();
    }
    const submit = (id) => {
        if (second === '2') { document.getElementById("one").style.border = "none"; }
        else if (second === '3') { document.getElementById("two").style.border = "none"; }
        else if (second === '4') { document.getElementById("three").style.border = "none"; }
        else if (second === '5') { document.getElementById("four").style.border = "none"; }
        else if (second === '6') { document.getElementById("five").style.border = "none"; }
        html2canvas(document.getElementById("tshirt-div")).then(function (canvas) {
            const image = canvas.toDataURL("image/jpeg");
            console.log(image)
            const dataURI = image;
            saveAs(dataURI, 'Design.png');
        });
    }
    return (
        <div className='containerForCustom'>
            <style>{`#tshirt-div{background-color:${first};}`}</style>
            <div id="tshirt-div">
                <div className="tshirt-backgroundpicture"></div>
                <div id="drawingArea" className="drawing-area">
                    {second === '2' && (<Rnd default={{ x: 60, y: 100, width: 320, height: 200, }} id="one" className="one"></Rnd>)}
                    {second === '3' && (<Rnd default={{ x: 60, y: 100, width: 320, height: 200, }} id="two" className="two"></Rnd>)}
                    {second === '4' && (<Rnd default={{ x: 60, y: 100, width: 320, height: 200, }} id="three" className="three"></Rnd>)}
                    {second === '5' && (<Rnd default={{ x: 60, y: 100, width: 320, height: 200, }} id="four" className="four"></Rnd>)}
                    {second === '6' && (<Rnd default={{ x: 60, y: 100, width: 320, height: 200, }} id="five" className="five"></Rnd>)}
                </div>
            </div>
            <div className="settings">

                <label for="tshirt-design">T-Shirt Design:</label>
                <select onChange={(e) => (designHandler(e))}>
                    <option value="1">Choose a Design</option>
                    <option value="2">Design 1</option>
                    <option value="3">Design 2</option>
                    <option value="4">Design 3</option>
                    <option value="5">Design 4</option>
                    <option value="6">Design 5</option></select>
                <label for="tshirt-color">T-Shirt Color:</label>
                <Select options={color} onChange={(e) => (changeHandler(e))} isOptionSelected="size"></Select>
                <button className="button" onClick={submit}>Save Custom</button>
                <button className="button" onClick={refresh}>Reset</button>

                <div id='output'></div>
            </div>

        </div>
    )
}

export default Custom