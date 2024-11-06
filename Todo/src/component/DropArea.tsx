import { useState } from "react";


type DropAreaProps = {
    onDrop: (position: number) => void;
};


const DropArea = ({ onDrop }: DropAreaProps) => {
    const [showDrop, setShowDrop] = useState<Boolean>(false)

    return (
        <section className={showDrop ? "flex justify-center items-center h-20 border-2 border-dashed border-slate-600 rounded-md mb-2 mr-1 py-2 text-gray-400" : "opacity-0"} onDragEnter={() => setShowDrop(true)} onDragLeave={() => setShowDrop(false)} onDrop={(e) => {
            e.preventDefault();
            const position = 0;
            onDrop(position);
            setShowDrop(false);
        }} onDragOver={(e) => e.preventDefault()}>
            Drop Here
        </section>
    );
};

export default DropArea;
