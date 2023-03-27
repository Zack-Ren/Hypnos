import { SaveIcon, TrashCanIcon } from "@fluentui/react-icons-northstar";
import { Card, Flex, Button, Text, TextArea, Segment, Dialog, } from "@fluentui/react-northstar";
import { FunctionComponent, useState } from "react";
import { Event } from "../../Models/Event";
import { updateEvent } from "../../Requests/UpdateEvent";
import { Diagnostic } from "../DiagnosticComponent/Diagnostic";
import { toLocalDateTime } from "../../Utils/UtilityFxs";


interface IEventComponentProps {
    event: Event;
    deleteEventCallback: (eventId: string) => void;
}
/**
 * Represents the Event Component
 * @returns 
 */
export const EventComponent: FunctionComponent<IEventComponentProps> = (props: IEventComponentProps) => {
    // State
    const [doctorNote, setDoctorNote] = useState<string>(props.event.doctorNotes);
    const [patientNote, setPatientNote] = useState<string>(props.event.patientNotes);

    // Handlers
    const onChangePatientNoteHandler = (
        event: any
    ) => {
        const e = event as React.ChangeEvent<HTMLInputElement>;
        setPatientNote(e.target.value);
    };

    const onChangeDoctorNoteHandler = (
        event: any
    ) => {
        const e = event as React.ChangeEvent<HTMLInputElement>;
        setDoctorNote(e.target.value);
    };

    /**
     * An handler that also processes an Update Request
     */
    const saveEventOnClickHanlder = async () => {
        const updatedEvent: Event = {...props.event, doctorNotes: doctorNote, patientNotes: patientNote}
        await updateEvent(props.event.id, updatedEvent);
    }

    // Logic
    const eventDate = toLocalDateTime(props.event.eventTime).split('-')[0];

    // Rendering Components
    return (
        <Flex column fill gap="gap.large">
            <Segment>
                <Card fluid aria-roledescription="card with avatar, image and action buttons">
                    <Card.Header>
                        <Flex space="between">
                            <Flex column gap="gap.small">
                                <Text content={`${eventDate} - Appointment`} weight="bold" size="largest"/>
                            </Flex>
                            <Flex gap="gap.small">
                                <Button icon={<SaveIcon size="large"/>} content="Save" primary onClick={saveEventOnClickHanlder}/>
                                <Dialog
                                    cancelButton="Keep"
                                    confirmButton="Delete"
                                    onConfirm={() => props.deleteEventCallback(props.event.id)}
                                    content="Are you sure you want to delete data associated with this appointment? All data, including graphs, prognosis, notes and other details will be permenantly erased."
                                    header="Appointment Deletion Confirmation"
                                    trigger={<Button icon={<TrashCanIcon size="large"/>} content="Delete" primary/>}
                                />
                            </Flex>
                        </Flex>
                        
                    </Card.Header>
                    <Card.Body>
                        <Flex column gap="gap.large">
                            <Flex gap="gap.large">
                                <Flex column fill gap="gap.small" styles={{padding: "20px 0px 0px 0px"}}>
                                    <Text content="Patient Notes" weight="semibold" size="large"/>
                                    <TextArea fluid inverted resize="vertical" placeholder="Summarize the patient's findings..." value={patientNote} onChange={onChangePatientNoteHandler}/>
                                </Flex>
                                <Flex column fill gap="gap.small" styles={{padding: "20px 0px 0px 0px"}}>
                                    <Text content="Doctor Notes" weight="semibold" size="large"/>
                                    <TextArea fluid inverted resize="vertical" placeholder="Summarize your findings..." value={doctorNote} onChange={onChangeDoctorNoteHandler}/>
                                </Flex>
                            </Flex>
                        </Flex>
                        
                    </Card.Body>
                    <Card.Footer styles={{padding: "30px 0px 0px 0px"}}>
                        <Flex column gap="gap.medium">
                            {props.event.setOfDiagnostics.map((diagnosticId, index) => {
                                return (
                                    <>
                                        <Diagnostic diagnosticId={`${diagnosticId}`} index={index} />
                                    </>
                                )
                            })}
                        </Flex>
                    </Card.Footer>
                </Card>
            </Segment>
        </Flex>
    );
}
