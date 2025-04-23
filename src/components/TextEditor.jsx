import '../App.css';
import { jsPDF } from "jspdf";
import React, {useState} from 'react';


const TextRegion = () => 
{

    const[text, setText] = useState("");
    /* Event Handler for download the text file. */
    const handleTextDownload = () =>
    {
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "textfile.txt";
        a.click();
        window.URL.revokeObjectURL(url);
    };


    const handlePdfDownload = () =>
    {
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(text, 180); // wrap text to fit page width
        doc.text(lines, 10, 10);
        doc.save("textfile.pdf");
    };


    return (
        <div>

            <h2>Welcome to your own editor</h2>
            <textarea value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your text here..."
                name="textArea" id="" cols={60} rows={35}
                className="styled-textarea" 
            />

            <div className="button-group">
                <button
                    onClick={handleTextDownload}
                    className="custom-button blue"
                >
                    Save as .txt
                </button>


                <button
                    onClick={handlePdfDownload}
                    className="custom-button green"
                >
                    Save as .pdf
                </button>
        
            </div>
        </div>
    );
};

export default TextRegion;