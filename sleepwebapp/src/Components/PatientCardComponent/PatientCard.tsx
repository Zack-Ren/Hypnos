import { Avatar, Button, Card, Flex, Text, ChatIcon, EmailIcon, PersonIcon } from "@fluentui/react-northstar";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../Models/Patient";

/**
 * Prop interface for PatientCard component
 */
interface IPatientCardProps {
  patient: Patient
}
/**
 * Represents the PatientCard that is shown on the Patients Page
 * @param props Contains a patient as the only prop
 * @returns A PatientCard
 */
export const PatientCard: FunctionComponent<IPatientCardProps> = (props: IPatientCardProps) => {
  const navigate = useNavigate();
  return (
      <Card aria-roledescription="card avatar">
        <Card.Header fitted>
          <Flex gap="gap.smaller">
            <Avatar
              image={props.patient.picture}
              name={props.patient.name}
              status="success"
            />
            <Flex column gap="gap.smaller">
              <Text content={props.patient.name} weight="bold" />
              <Text content={props.patient.phoneNumber} size="small" />
            </Flex>
            <Flex column>
                <Flex gap="gap.smaller">
                  <Button icon={<ChatIcon />} text title="Chat" size="small" primary circular/>
                  <Button icon={<PersonIcon />} content="Profile" title="Profile" size="small" primary onClick={() => navigate(`/patient/${props.patient.id}`)}/>
                </Flex>
              <Flex gap="gap.smaller">
                <Button icon={<EmailIcon />} text size="small" primary circular/>
              </Flex>

            </Flex>
          </Flex>
        </Card.Header>
      </Card>
  )
}