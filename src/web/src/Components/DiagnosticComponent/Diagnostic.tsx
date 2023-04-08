import { AddIcon, Button, Card, ErrorIcon, Flex, Loader, Segment, Text, WindowMinimizeIcon } from "@fluentui/react-northstar";
import { AxiosResponse } from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, BarElement } from "chart.js";
import { FunctionComponent, useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { toLocalDateTime } from "../../Utils/UtilityFxs";
import { Analysis } from "../../Models/Analysis";
import { getAnalysis } from "../../Requests/GetAnalysis";

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
  BarElement,
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
    const [analytics, setAnalyticsData] = useState<Analysis | null>(null)
    const [showGraph, setShowGraph] = useState<boolean>(false);

    // Hooks
    useEffect(() => {
        const getAnalyticsData = async () => {
            const analyticsResponse: AxiosResponse<Analysis> = await getAnalysis(props.diagnosticId);
            setAnalyticsData(analyticsResponse.data);
            console.log(props);
        }

        getAnalyticsData();
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

    if (analytics === null) {
        return <Loader size="largest" />
    }

    const labels = generateLabel(analytics.accelerationX);

    // Data to be rendered
    const accelerationData = {
        labels: labels,
        datasets: [
            {
                label: "X-Axis Acceleration",
                data: analytics.accelerationX,
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(0,0,0, 0.5)',
            },
            {
                label: "Y-Axis Acceleration",
                data: analytics.accelerationY,
                borderColor: 'rgb(100, 100, 0)',
                backgroundColor: 'rgba(100, 100, 0, 0.5)',
            },
            {
                label: "Z-Axis Acceleration",
                data: analytics.accelerationZ,
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
                data: analytics.angularAccelerationX,
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(0,0,0, 0.5)',
            },
            {
                label: "Y-Axis Angular Acceleration",
                data: analytics.angularAccelerationY,
                borderColor: 'rgb(100, 100, 0)',
                backgroundColor: 'rgba(100, 100, 0, 0.5)',
            },
            {
                label: "Z-Axis Angular Acceleration",
                data: analytics.angularAccelerationZ,
                borderColor: 'rgb(0,100,0)',
                backgroundColor: 'rgba(0,100,0, 0.5)',
            }
        ]
    };

    const positionColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

    const sleepingPositionBackgroundColor: string[] = []
    const sleepingPositionDataNums: number[] = []

    analytics.sleepPositions.forEach(position => {
        switch (position){
            case "left-side":
                sleepingPositionDataNums.push(1);
                sleepingPositionBackgroundColor.push("#FF6384");
                break;
            case "back":
                sleepingPositionDataNums.push(2);
                sleepingPositionBackgroundColor.push("#36A2EB");
                break;
            case "right-side":
                sleepingPositionDataNums.push(3);
                sleepingPositionBackgroundColor.push("#FFCE56");
                break;
            case "stomach":
                sleepingPositionDataNums.push(4);
                sleepingPositionBackgroundColor.push("#4BC0C0");
                break;
        }
    });

    const sleepingPositionData = {
        labels: labels,
        datasets: [
            {
                label: "Sleeping Positions",
                data: sleepingPositionDataNums,
                backgroundColor: sleepingPositionBackgroundColor,
                borderColor: sleepingPositionBackgroundColor,
                borderWidth: 1,
                fill: false
            },
            {
                label: "Left-Side",
                data: [],
                backgroundColor: "#FF6384"
            },
            {
                label: "Back",
                data: [],
                backgroundColor: "#36A2EB"
            },
            {
                label: "Right-Side",
                data: [],
                backgroundColor: "#FFCE56"
            },
            {
                label: "Stomach",
                data: [],
                backgroundColor: "#4BC0C0"
            }
        ]
    }

    const sleepingOptions = {
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
            tooltip: {
                bodyFont: {
                    size: 15
                }
            }
        }
    }

    const breathingRateData = {
        labels: generateLabel(analytics.breathingRates),
        datasets: [
            {
                label: "Breathing Rate",
                data: analytics.breathingRates,
                borderColor: 'rgb(0,0,0)',
                backgroundColor: 'rgba(0,0,0, 0.5)'
            }
        ]
    }

    const startTime = toLocalDateTime(analytics.dataAcquisitionStartTime);    

    // Rendering component
    console.log(props);
    return (
        <>
            <Segment color='brand'>
                <Flex space="between">
                    <Flex vAlign="center" gap="gap.large">
                        <Text content={`${startTime}`} weight="bold" size="larger"/>
                        {!analytics.alert && <ErrorIcon size="largest" />}
                    </Flex>
                    <Button icon={showGraph ? <WindowMinimizeIcon /> : <AddIcon />} primary circular onClick={() => setShowGraph(!showGraph)}/> 
                </Flex>
            </Segment>
            {showGraph && 
            <Card fluid aria-roledescription="card with avatar, image and action buttons">
                <Card.Body>
                    <Flex column>
                        <Flex fill gap="gap.medium" space="around">
                            <Flex fill>
                                <Line data={accelerationData} title={"Acceleration Data"}/>
                            </Flex>
                            <Flex fill>
                                <Line data={angularAccelerationData} title={"Angular Acceleration Data"}/>
                            </Flex>
                        </Flex>
                        <Flex column gap="gap.medium">
                            <Flex fill>
                                <Line data={breathingRateData} title={"Breathing Rate Data"}/>
                            </Flex>
                            <Flex fill>
                                <Bar data={sleepingPositionData} options={sleepingOptions} title={"Sleeping Position Data"}/>
                            </Flex>
                        </Flex>
                    </Flex>
                    
                </Card.Body>
                <Card.Footer styles={{padding: "20px 0px 0px 0px"}}>
                </Card.Footer>
            </Card>}
        </>
    )
}
