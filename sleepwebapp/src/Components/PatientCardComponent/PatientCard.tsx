import { Avatar, Button, Card, DownloadIcon, Flex, Grid, MoreIcon, Segment, StarIcon, Text, Image, ChatIcon, TrashCanIcon, EditIcon, ArrowDownIcon, EmailIcon, PersonIcon } from "@fluentui/react-northstar";
import { FunctionComponent } from "react";
import { Patient } from "../../Models/Patient";

interface IPatientCardProps {
  patient: Patient
}
/**
 * Represents the PatientCard that is shown on the Patients Page
 * @param props 
 * @returns 
 */
export const PatientCard: FunctionComponent<IPatientCardProps> = (props: IPatientCardProps) => {
  return (
      <Card aria-roledescription="card avatar">
        <Card.Header fitted>
          <Flex gap="gap.smaller">
            <Avatar
              image={props.patient.picture}
              name={props.patient.name}
              status="unknown"
            />
            <Flex column gap="gap.smaller">
              <Text content={props.patient.name} weight="bold" />
              <Text content={props.patient.phoneNumber} size="small" />
            </Flex>
            <Flex column>
                <Flex gap="gap.smaller">
                  <Button icon={<ChatIcon />} text title="Chat" size="small" primary circular/>
                  <Button icon={<PersonIcon />} content="Profile" title="Profile" size="small" primary/>
                </Flex>
              <Flex gap="gap.smaller">
                <Button icon={<EmailIcon />} text size="small" primary circular/>
              </Flex>

            </Flex>
          </Flex>
        </Card.Header>
      </Card>
  )
    // return (
    //       <Card centered aria-roledescription="card with avatar, image and action buttons" styles={{maxHeight: "500px"}}>
    //         <Card.Header>
    //           <Image src={props.patient.picture} circular/>
    //         </Card.Header>
    //         <Card.Body>
    //           <Flex column gap="gap.small">
    //             <Text content={props.patient.email} align="center" />
    //             <Text content={props.patient.name} weight="bold" />
    //             <Text content={props.patient.phoneNumber} size="small" />

    //           </Flex>
    //         </Card.Body>
    //         <Card.Footer styles={{width: "100%"}}>
    //           <Flex space="between">
    //           </Flex>
    //         </Card.Footer>
    //       </Card>
    // );
}