import { AddIcon, Button, Card, ErrorIcon, Flex, Loader, Segment, Text, WindowMinimizeIcon } from "@fluentui/react-northstar";
import { AxiosResponse } from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from "chart.js";
import { FunctionComponent, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Diagnostics } from "../../Models/Diagnostics";
import { getDiagnostic } from "../../Requests/GetDiagnostic";
import { toLocalDateTime } from "../../Utils/UtilityFxs";

/**
 * Interface for Diagnostic Props
 */
interface IDiagnosticProps {
    diagnosticId: string;
    index: number;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

/**
 * Diagnostic Comopnent that renders the data collected
 * @param props 
 * @returns 
 */
export const Diagnostic: FunctionComponent<IDiagnosticProps> = (props: IDiagnosticProps) => {
    // State
    const [diagnosticData, setDiagnosticData] = useState<Diagnostics | null>(null)
    const [showGraph, setShowGraph] = useState<boolean>(false);

    // Hooks
    useEffect(() => {
        const getDiagnosticData = async () => {
            const diagnosticResponse: AxiosResponse<Diagnostics> = await getDiagnostic(props.diagnosticId);
            setDiagnosticData(diagnosticResponse.data);
            console.log(props);
        }

        getDiagnosticData();
    },[props.diagnosticId, props]);

    // Auxillary Functions (logic)

    /**
     * Generates a contigious array starting from 0 to the length of the array passed in.
     * @param arr Represents any type of array with any type of elements
     * @returns A contigious array that has numbers 0 to the length of the array passed
     */
    const generateLabel = (arr: any[]) => {
        const newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push(i);
        } 
        return newArr;
    }

    if (diagnosticData === null) {
        return <Loader size="largest" />
    }

    const labels = generateLabel(diagnosticData.accelerationX);

    // Data to be rendered
    const accelerationData = {
        labels: labels,
        datasets: [
            {
                label: "X-Axis Acceleration",
                data: diagnosticData.accelerationX,
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(0,0,0, 0.5)',
            },
            {
                label: "Y-Axis Acceleration",
                data: diagnosticData.accelerationY,
                borderColor: 'rgb(100, 100, 0)',
                backgroundColor: 'rgba(100, 100, 0, 0.5)',
            },
            {
                label: "Z-Axis Acceleration",
                data: diagnosticData.accelerationZ,
                borderColor: 'rgb(0,100,0)',
                backgroundColor: 'rgba(0,100,0, 0.5)',
            }
        ]
    };

    const angularAccelerationData = {
        labels: labels,
        datasets: [
            {
                label: "X-Axis Angular Acceleration",
                data: diagnosticData.angularAccelerationX,
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(0,0,0, 0.5)',
            },
            {
                label: "Y-Axis Angular Acceleration",
                data: diagnosticData.angularAccelerationY,
                borderColor: 'rgb(100, 100, 0)',
                backgroundColor: 'rgba(100, 100, 0, 0.5)',
            },
            {
                label: "Z-Axis Angular Acceleration",
                data: diagnosticData.angularAccelerationZ,
                borderColor: 'rgb(0,100,0)',
                backgroundColor: 'rgba(0,100,0, 0.5)',
            }
        ]
    };

    const startTime = toLocalDateTime(diagnosticData.dataAcquisitionStartTime);    

    // Rendering component
    console.log(props);
    return (
        <>
            <Segment color='brand' inverted={props.index%2 === 0 ? true : false}>
                <Flex space="between">
                    <Flex vAlign="center" gap="gap.large">
                        <Text content={`${startTime}`} weight="bold" size="larger"/>
                        <ErrorIcon size="largest" />
                    </Flex>
                    <Button icon={showGraph ? <WindowMinimizeIcon /> : <AddIcon />} primary circular onClick={() => setShowGraph(!showGraph)}/> 
                </Flex>
            </Segment>
            {showGraph && 
            <Card fluid aria-roledescription="card with avatar, image and action buttons">
                <Card.Body>
                    <Flex fill gap="gap.medium" space="around">
                        <Flex fill>
                            <Line data={accelerationData} title={"Acceleration Data"}/>
                        </Flex>
                        <Flex fill>
                            <Line data={angularAccelerationData} title={"Angular Acceleration Data"}/>
                        </Flex>
                    </Flex>
                </Card.Body>
                <Card.Footer styles={{padding: "20px 0px 0px 0px"}}>
                </Card.Footer>
            </Card>}
        </>
    )
}
