import React, { useEffect } from "react";
import { useAVToggle } from "@100mslive/react-sdk";
import {
    selectIsConnectedToRoom,
    useHMSActions,
    useHMSStore,
    selectPeers,
  } from "@100mslive/react-sdk";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faMicrophoneSlash, faMicrophone, faVideo, faVideoSlash,faUserPlus, 
         faArrowUpRightFromSquare, faMessage, faFaceSmile, faGear, faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Card, CardActions, CardContent, Grid } from "@mui/material";
// @ts-ignore
// import Agenda from "./agenda.tsx";
import {useState} from 'react';
import { TopicOutlined } from "@mui/icons-material";

export interface IState {
    topic: {
        id: number;
        title: string;
        timeEstimate: string;
        description: string;
        edit?: boolean; 
    }[]
};

export interface IProps{
    topics: IState,
    type: number
}

function Footer() {
    const [topic, setTopic] = useState<IState['topic']>([
        {
            id: 0,
            title: 'Client 1',
            timeEstimate: '2 weeks',
            description: 'Client is requesting additional input boxes',
            edit: false
        },
        {
            id: 1,
            title: 'Client 2',
            timeEstimate: '3 weeks',
            description: 'Client is requesting a style change',
            edit: false
        },
        {
            id: 2,
            title: 'Client 3',
            timeEstimate: '4 weeks',
            description: 'Client want to add functionality',
            edit: false
        },
    ])
    const [val1] = useState();
    const [val2] = useState();
    const [val3] = useState();

    const peers = useHMSStore(selectPeers);


    const userCount = peers.length;

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();

    const {isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo
    } = useAVToggle();

    useEffect(() => {
        window.onunload = () => {
            if(isConnected) {
                hmsActions.leave();
            }
        }
    }, [hmsActions, isConnected]);

    const addNewTopic = (newId ) => {
        const newTopic = [...topic];
        newTopic.push({id: newId++, title: 'Client', timeEstimate: 'Unknown', description: "Add description here", edit: false});
        console.log(topic.length++);
        setTopic(newTopic);
    }

    const removeTopic = (topicId?) => {
        const newTopic = [...topic];
        newTopic.splice(topicId,topicId);
        console.log(newTopic);
        setTopic(newTopic);
    } 

    const Agenda = ({nw, type}) => {
        const handleEdit = (inputId) => {
            // setBool(true);
            const newTopic = [...topic];
            newTopic[inputId].edit = true;
            setTopic(newTopic);
            // console.log(topic);
        }
        const handleFinishEdit = (inputId) => {
            // setBool(false);
            const newTopic = [...topic];
            newTopic[inputId].edit = false;
            setTopic(newTopic);
            console.log(topic);

        }

        const handleTitleChange = (topicId, e) => {
            const newTopic = [...topic];
            newTopic[topicId].title = e;
            // setTopic(newTopic);
            // console.log(topic[topicId]);
        }

        const handleTimeChange = (topicId, e) => {
            const newTopic = [...topic];
            newTopic[topicId].timeEstimate = e;
            // setTopic(newTopic);
            // console.log(topic[topicId]);
        }
        const handleDescriptionChange = (topicId, e) => {
            const newTopic = [...topic];
            newTopic[topicId].description = e;
            // setTopic(newTopic);
            // console.log(topic[topicId]);
        }
    
        const showBtn = (typeId) => {
            if (typeId === false){
                return <Button size="small" onClick={() => handleEdit(nw[type].id)} >Edit</Button>
            } else{
                return <Button size="small" color="warning"onClick={() => handleFinishEdit(nw[type].id)} >Done Editing</Button>

            }
        }
        return (
            <Box sx={{ width: 275}}>
                <Card variant="outlined" sx={{ mr: 2, minHeight: 250, alignItems: 'space-between'}}>
                    <CardContent hidden={nw[type].edit === false ? false : true}>
                        <Typography variant="h6" component="div" color="text.primary" gutterBottom>
                            Topic: {nw[type].title}
                        </Typography>
                        <Typography sx={{ mb: 1}}>
                            Time Estimate: {nw[type].timeEstimate}
                        </Typography>
                        <Typography >
                            Description: {nw[type].description}
                        </Typography>
                    </CardContent>
                    <CardContent hidden={nw[type].edit === true ? false : true}>
                        <Typography className="row " variant="h6" component="div" color="text.primary" gutterBottom>
                            <label className="label">Topic: </label>
                            <input
                                required
                                value={val1}
                                onChange={e => handleTitleChange(nw[type].id, e.target.value)}
                                id="title"
                                type="text"
                                name="title"
                                placeholder={nw[type].title}
                                className="input-footer"
                            />
                        </Typography>
                        <Typography sx={{ mb: 1}} className="row ">
                        <label className="label">Time Estimate: </label>
                            <input
                                required
                                value={val2}
                                onChange={e => handleTimeChange(nw[type].id, e.target.value)}
                                id="title"
                                type="text"
                                name="title"
                                placeholder={nw[type].timeEstimate}
                                className="input-footer"
                            />
                        </Typography>
                        <Typography >
                            <label className="label">Description: </label>
                            <input
                                required
                                value={val3}
                                onChange={e => handleDescriptionChange(nw[type].id, e.target.value)}
                                id="description"
                                type="text"
                                name="title"
                                placeholder={nw[type].description}
                                className="input-footer"
                            />
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ placeContent: "flex-end center"}}>
                        {showBtn(nw[type].edit)}
                        <Button size="small" color="error" onClick={() => removeTopic(nw[type].id)}>Remove</Button>
                    </CardActions>
                </Card>
            </Box>
    
        )
    }


    return (
        <div className="footer_whole center-sp-col">
            <div className="ag-ct">
                <Grid container rowSpacing={1} columnSpacing={{xs:1, sm:2, md:3}}>
                    <Grid item sm={12}>
                        <Accordion sx={{backgroundColor: "#4da6ff"}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography color={'white'}>Agenda</Typography>
                            </AccordionSummary>
                            <AccordionDetails className="row w-full">
                                {topic.map((nw, type) => (
                                    <Agenda nw={topic} type={type} key={nw.id}/>
                                ))}
                            </AccordionDetails>
                            <AccordionDetails>
                                <div className="add-topic">
                                    <Button sx={{ color: 'white'}} onClick={() => addNewTopic(topic.length)}>Add Topic</Button>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                </Grid>

            </div>
            <div className="main_control">
                <div className="main_controls_section">
                    <div className="main_controls_button" onClick={toggleAudio}>
                    {isLocalAudioEnabled ? (
                    <><FontAwesomeIcon icon={faMicrophone} size="lg" /><span className="button_name">Mute</span></>
                    
                    ): (
                    <><FontAwesomeIcon icon={faMicrophoneSlash} size="lg" /><span className="button_name">Unmute</span></>
                    )} 
                    </div>

                    <div className="main_controls_button" onClick={toggleVideo}>
                    {isLocalVideoEnabled ? (
                    <><FontAwesomeIcon icon={faVideo} size="lg" /><span className="button_name">Stop Video</span></>
                    ): (
                    <><FontAwesomeIcon icon={faVideoSlash} size="lg" /><span className="button_name">Start Video</span></>
                    )} 
                    </div>

                </div>

                <div className="main_controls_section">
                    <div className="main_controls_button">
                        <div>
                        <FontAwesomeIcon icon={faUserPlus} size="lg" /><>{userCount}</>
                        </div>
                        <span className="button_name">Participants</span>
                    </div>
                    <div className="main_controls_button">
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare}  size="lg" color="" />
                        <span className="button_name">Share Screen</span>
                    </div>
                    <div className="main_controls_button">
                        <FontAwesomeIcon icon={faMessage} size="lg" />
                        <span className="button_name">Chat</span>
                    </div>
                    <div className="main_controls_button">
                        <FontAwesomeIcon icon={faFaceSmile} size="lg"/>
                        <span className="button_name">Reactions</span>
                    </div>
                    <div className="main_controls_button">
                        <FontAwesomeIcon icon={faGear} size="lg"/>
                        <span className="button_name">Settings</span>
                    </div>
                    <div className="main_controls_button">
                        <FontAwesomeIcon icon={faEllipsis} size="lg" />
                        <span className="button_name">More</span>
                    </div>
                </div>

                <div className="main_controls_section">
                <div className="main_controls_button">
                        {isConnected && (
                            <button
                            id="leave-btn"
                            className="btn-danger"
                            onClick={() => hmsActions.leave()}
                            >
                            Leave
                            </button>
                        )}
                </div>
                </div>
                
            </div>
        </div>


    )
}

export default Footer;
