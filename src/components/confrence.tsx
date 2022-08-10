import {selectPeers, useHMSStore} from "@100mslive/react-sdk";
import React from "react";
// @ts-ignore
import Peer from "./peer.tsx";
import '../App.css';
// @ts-ignore
import Agenda from "./agenda.tsx";

function Conference() {
    const peers = useHMSStore(selectPeers);
    return (
    <div className="room-section">
        <div className="conference-section">
            <div className="peers-container">
                {peers.map((peer) => (
                <Peer key={peer.id} peer={peer} />
                ))}
            </div>
        </div>

    </div> 
    )
}
export default Conference;