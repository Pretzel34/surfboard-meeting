import React, { useState } from "react";
import '../App.css';
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
// @ts-ignore
import { IState } from "./footer.tsx";

// @ts-ignore
const Agenda = ({nw, type} : {IState, IProps}) => {


    const removeTopic = (topicId?) => {
        const newTopic = [...nw];
        newTopic.splice(0,topicId);
        console.log(newTopic);
    } 


    return (
        <Box sx={{ width: 275}}>
            <Card variant="outlined" sx={{ mr: 2}}>
                <CardContent>
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
                <CardActions sx={{ justifyContent: "center"}}>
                    <Button size="small">Edit</Button>
                    <Button size="small" color="error" onClick={() => removeTopic(nw[type].id)}>Remove</Button>
                </CardActions>
            </Card>
        </Box>

    )
}

export default Agenda;