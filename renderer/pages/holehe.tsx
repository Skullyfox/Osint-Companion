import React , {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { shell } from 'electron';

function Holehe() {
    const [holeheStatus, setHoleheStatus] = useState('Checking...');
    const [results, setResults] = useState([]);
    const [pending, setPending] = useState(false);
    const [pendingInstall, setPendingInstall] = useState(false);
    const [email, setEmail] = useState('');
    const [platform, setPlatform] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const openInstallation = (event) => {
        const url = event.target.dataset.link;
        shell.openExternal(url);
    };

    const installHolehe = () => {
        setPendingInstall(true);
        ipcRenderer.invoke('install-holehe', {platform: platform}).then(
            (result) => {setPendingInstall(false); setHoleheStatus('Holehe is installed'); console.log(result)},
            (error) => {setPendingInstall(false); console.log(error)}
        )
    };

    const investigate = () => {
        setPending(true);
        ipcRenderer.invoke('only-used', {email: email, platform: platform}).then(
            (result) => {setPending(false); setResults(result); console.log(result)},
            (error) => {setPending(false); console.log(error)}
        )
    };

    useEffect(()=>{
        const platform = localStorage.getItem('platform');
        setPlatform(platform);

        ipcRenderer.invoke('check-holehe', {platform : platform}).then(
            (isInstalled) => setHoleheStatus(isInstalled ? 'Holehe is installed' : 'not installed'),
            (error) => setHoleheStatus('Failed to check Holehe installation')
        );
    }, []);

    return (
        <React.Fragment>
        <Head>
            <title>Osint Companion | Holehe</title>
        </Head>
        <div className='container p-5 grid grid-col-1 w-full  pt-10'>
            <div className='flex items-center justify-start h-10'>
                <FontAwesomeIcon className={`mr-2 animate-pulse ${  holeheStatus === 'not installed'
                    || holeheStatus === 'Checking...'  ? 'text-rose-400 ' : 'text-indigo-600'}`} icon={faCircle} />
                <p>Holehe : <span className={  holeheStatus === 'not installed'
                    || holeheStatus === 'Checking...' ? "text-rose-400" : "text-indigo-600"}>{holeheStatus}</span></p>
            </div>
            <div className="buttonsContainer">
                {pendingInstall ?
                    <button 
                        type='button' disabled className='bg-slate-300 rounded-md p-2 max-w-max my-3 text-slate-900'
                        onClick={installHolehe}>
                            <FontAwesomeIcon className="animate-spin" icon={faSpinner} /> Install Pending ...
                    </button> :
                    <button 
                        type='button' disabled={holeheStatus != 'not installed'} className={holeheStatus != 'not installed' ? 
                        "bg-slate-500 rounded-md p-2 max-w-max mb-3 text-slate-900" : 
                        "bg-slate-300 rounded-md p-2 max-w-max mb-3 text-slate-900"}
                        onClick={installHolehe}>
                            <FontAwesomeIcon icon={faGithub} /> Automatic Installation
                    </button> 
                }

                <button 
                    data-link="https://github.com/megadose/holehe"
                    disabled={holeheStatus != 'not installed'}
                    type='button' className={holeheStatus != 'not installed' ? 
                    "bg-slate-500 rounded-md p-2 max-w-max mx-3 text-slate-900" : 
                    "bg-slate-300 rounded-md p-2 max-w-max mx-3 text-slate-900"}
                    onClick={openInstallation}>
                        <FontAwesomeIcon icon={faGithub} /> Manual Installation
                </button>
            </div>

            <input
                className="border-slate-200 text-slate-500 
                    placeholder-slate-400 
                    contrast-more:border-slate-300 contrast-more:placeholder-slate-300
                    p-3 rounded-md max-w-max"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email@domain.com"
                />

                {results.length > 0 ? <div className='flex flex-col items-start justify-center my-3'> { results.map(el => <p>✅ {el}</p>)}</div> : null}
            
            {pending ? <button type='button' className='bg-blue-300 rounded-md p-2 max-w-max my-3'>
            <FontAwesomeIcon className="animate-spin" icon={faSpinner} /> Loading
                </button>: <button  type='button' className='bg-indigo-700 rounded-md p-2 max-w-max my-3' onClick={investigate}>Investigate</button>}

            <Link href="/home">back</Link>
        </div>
        </React.Fragment>
    )
}

export default Holehe
