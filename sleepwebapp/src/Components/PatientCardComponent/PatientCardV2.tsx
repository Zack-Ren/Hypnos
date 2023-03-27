import { Avatar, Button, Flex, Text, ChatIcon, EmailIcon, PersonIcon, Segment } from "@fluentui/react-northstar";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "../../Models/Patient";

/**
 * Prop interface for PatientCard
 */
interface IPatientCardProps {
  patient: Patient;
  index: number;
}
/**
 * Represents the PatientCard that is shown on the Patients Page
 * @param props Contains a patient
 * @returns V2 of the PatientCard - the vertical segment panels
 */
export const PatientCardV2: FunctionComponent<IPatientCardProps> = (props: IPatientCardProps) => {
  const navigate = useNavigate();
  const isPrimary = props.index%2 === 0 ? true : false
  
  return (
    <Segment color="brand" >
        <Flex space="between">
            <Flex gap="gap.medium" vAlign="center">
                <Avatar name={props.patient.name} image={props.patient.picture} size="larger" />
                <Text weight="bold" size="largest" content={props.patient.name} />
            </Flex>
            <Flex gap="gap.large" vAlign="center">
                <Button icon={<ChatIcon size="largest"/>}  text title="Chat" size="small"  primary circular />
                <Button icon={<EmailIcon size="largest"/>}  text title="Email" size="small" primary circular/>
                <Button icon={<PersonIcon size="largest" />} text title="Profile" size="small"  primary circular onClick={() => navigate(`/patient/${props.patient.id}`)}/>
            </Flex>
        </Flex>
    </Segment>
  )
}