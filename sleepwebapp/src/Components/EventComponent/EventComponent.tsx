import { SaveIcon } from "@fluentui/react-icons-northstar";
import { Card, Flex, Button, Text, TextArea, Accordion, Segment, AccordionTitle, AccordionContent, Divider } from "@fluentui/react-northstar";
import { FunctionComponent, useState } from "react";
import { Event } from "../../Models/Event";
import { updateEvent } from "../../Requests/UpdateEvent";
import { Diagnostic } from "../DiagnosticComponent/Diagnostic";

interface IEventComponentProps {
    event: Event;
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
        const updateEventResponse = await updateEvent(props.event.id, updatedEvent);
    }

    // Rendering Components
    return (
        <Flex column fill gap="gap.large">
            <Card fluid aria-roledescription="card with avatar, image and action buttons">
                <Card.Header>
                    <Flex column gap="gap.small">
                        <Text content="Appointment Notes" weight="bold" size="largest"/>
                        <Text content="12/20/2023" weight="light" size="small" />
                    </Flex>
                </Card.Header>
                <Card.Body>
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
                </Card.Body>
                <Card.Footer styles={{padding: "20px 0px 0px 0px"}}>
                    <Flex space="between">
                        <Button icon={<SaveIcon size="large"/>} title="Favourite" content="Save" primary onClick={saveEventOnClickHanlder}/>
                    </Flex>
                </Card.Footer>
            </Card>
            <Flex column>
                {props.event.setOfDiagnostics.map((diagnosticId) => {
                    return (
                        <>
                            <Diagnostic diagnosticId={`${diagnosticId}`} />
                            <Divider size={1}/>
                        </>
                    )
                })}
            </Flex>
        </Flex>
    );
}