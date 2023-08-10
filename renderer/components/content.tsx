import { XCircle, Move } from 'lucide-react';
import { ipcRenderer } from 'electron';

function Content ({ children }) {
    const CloseApp = () => {
        ipcRenderer.invoke('close-app');
    }

    return (
        <div className="w-11/12 bg-gray-950 max-h-screen overflow-y-scroll relative">
            <div className="absolute right-5 top-5 flex gap-5">
                <Move strokeWidth={1} id="draggableZone" className='text-indigo-500'/>
                <XCircle strokeWidth={1} onClick={CloseApp}
                    className='text-indigo-900 hover:cursor-pointer hover:text-indigo-500'/>
            </div>
            {children}
        </div>
    )
}

export default Content;