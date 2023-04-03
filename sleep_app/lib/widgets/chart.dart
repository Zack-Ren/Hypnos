import 'package:flutter/material.dart';
import 'package:sleep_app/models/acceleration_data.dart';
import 'package:sleep_app/models/diagnostic_model.dart';
import 'package:sleep_app/models/expansion_data.dart';
import 'package:sleep_app/models/gyroscope_data.dart';
import 'package:sleep_app/services/api_service.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:intl/intl.dart';

class Chart extends StatefulWidget {
  const Chart({super.key});

  @override
  ChartState createState() {
    return ChartState();
  }
}

class ChartState extends State<Chart> {
  late Future<List<ExpansionData>> expan;

  @override
  void initState() {
    super.initState();
    expan = _asyncLoad();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<ExpansionData>>(
      future: expan,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Theme(
            data: ThemeData(brightness: Brightness.dark),
            child: ExpansionPanelList(
              expansionCallback: (int index, bool isExpanded) {
                setState(() {
                  snapshot.data![index].isExpanded = !isExpanded;
                });
              },
              children: snapshot.data!.map<ExpansionPanel>((ExpansionData d) {
                int scale = scaleFactor(d.data.dataAcquisitionStartTime,
                    d.data.dataAcquisitionEndTime);
                List<DateTime> timestamps = generateTimestamps(
                    d.data.dataAcquisitionStartTime,
                    d.data.dataAcquisitionEndTime,
                    scale);
                List<AccelerationData> accelerationData = extractAcceleration(
                    d.data.accelerationX,
                    d.data.accelerationY,
                    d.data.accelerationZ,
                    timestamps,
                    scale);
                List<GyroscopeData> gyroscopeData = extractGyro(
                    d.data.angularAccelerationX,
                    d.data.angularAccelerationY,
                    d.data.angularAccelerationZ,
                    timestamps,
                    scale);

                return ExpansionPanel(
                  backgroundColor: Color(0xFF3A3A3A),
                  headerBuilder: (BuildContext context, bool isExpanded) {
                    return ListTile(
                      title: Text(
                        "${DateFormat('yMMMMd').format(d.data.dataAcquisitionStartTime)} -> ${DateFormat('HH:mm').format(d.data.dataAcquisitionStartTime)} - ${DateFormat('HH:mm').format(d.data.dataAcquisitionEndTime)}",
                        style: TextStyle(
                          color: Colors.white,
                          fontFamily: "Montserrat",
                        ),
                      ),
                    );
                  },
                  body: Column(
                    children: [
                      SfCartesianChart(
                          primaryXAxis: CategoryAxis(isVisible: false),
                          primaryYAxis: NumericAxis(
                              title: AxisTitle(
                                  text: "Acceleration (m/s^2)",
                                  textStyle: TextStyle(color: Colors.white)),
                              labelStyle: TextStyle(color: Colors.white)),
                          title: ChartTitle(
                            text: "Accelerometer Data",
                            textStyle: TextStyle(
                              color: Colors.white,
                              fontFamily: "Montserrat",
                            ),
                          ),
                          legend: Legend(
                              isVisible: true,
                              textStyle: TextStyle(color: Colors.white)),
                          series: <LineSeries<AccelerationData, DateTime>>[
                            LineSeries(
                                dataSource: accelerationData,
                                xValueMapper: (AccelerationData v, _) =>
                                    v.getDate,
                                yValueMapper: (AccelerationData v, _) =>
                                    v.getVal[0],
                                name: 'X',
                                color: Colors.cyan),
                            LineSeries(
                                dataSource: accelerationData,
                                xValueMapper: (AccelerationData v, _) =>
                                    v.getDate,
                                yValueMapper: (AccelerationData v, _) =>
                                    v.getVal[1],
                                name: 'Y',
                                color: Colors.orange),
                            LineSeries(
                              dataSource: accelerationData,
                              xValueMapper: (AccelerationData v, _) =>
                                  v.getDate,
                              yValueMapper: (AccelerationData v, _) =>
                                  v.getVal[2],
                              name: 'Z',
                            )
                          ]),
                      SfCartesianChart(
                        primaryXAxis: CategoryAxis(isVisible: false),
                        primaryYAxis: NumericAxis(
                            title: AxisTitle(
                                text: "Angular acceleration (rad/s)",
                                textStyle: TextStyle(color: Colors.white)),
                            labelStyle: TextStyle(color: Colors.white)),
                        title: ChartTitle(
                          text: "Gyroscope Data",
                          textStyle: TextStyle(
                            color: Colors.white,
                            fontFamily: "Montserrat",
                          ),
                        ),
                        legend: Legend(
                            isVisible: true,
                            textStyle: TextStyle(color: Colors.white)),
                        series: <LineSeries<GyroscopeData, DateTime>>[
                          LineSeries(
                              dataSource: gyroscopeData,
                              xValueMapper: (GyroscopeData v, _) => v.getDate,
                              yValueMapper: (GyroscopeData v, _) => v.getVal[0],
                              name: 'X',
                              color: Colors.cyan),
                          LineSeries(
                              dataSource: gyroscopeData,
                              xValueMapper: (GyroscopeData v, _) => v.getDate,
                              yValueMapper: (GyroscopeData v, _) => v.getVal[1],
                              name: 'Y',
                              color: Colors.orange),
                          LineSeries(
                            dataSource: gyroscopeData,
                            xValueMapper: (GyroscopeData v, _) => v.getDate,
                            yValueMapper: (GyroscopeData v, _) => v.getVal[2],
                            name: 'Z',
                          )
                        ],
                      )
                    ],
                  ),
                  canTapOnHeader: true,
                  isExpanded: d.isExpanded,
                );
              }).toList(),
            ),
          );
        } else if (snapshot.hasError) {
          return Text('${snapshot.error}');
        }
        return Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: const [CircularProgressIndicator()]);
      },
    );
  }

  /// Sets a scaling factor for the chart data based on the number of data points
  int scaleFactor(DateTime start, DateTime end) {
    int diff = end.difference(start).inSeconds;
    if (diff <= 60) {
      return 1;
    } else {
      return 10;
    }
  }

  /// Create a list of DateTime based on the start and end time of the recorded data
  List<DateTime> generateTimestamps(DateTime start, DateTime end, int scale) {
    List<DateTime> timestamps = [];
    for (var i = 0; i < end.difference(start).inSeconds; i += scale) {
      timestamps.add(start.add(Duration(seconds: i)));
    }
    return timestamps;
  }

  /// Pair acceleration data with a DateTime and scale accordingly
  List<AccelerationData> extractAcceleration(
      List<num> x, List<num> y, List<num> z, List<DateTime> t, int scale) {
    List<AccelerationData> data = [];

    for (int i = 0; i < t.length; i++) {
      data.add(
          AccelerationData([x[i * scale], y[i * scale], z[i * scale]], t[i]));
    }
    return data;
  }

  /// Pair gyroscope data with a DateTime and scale accordingly
  List<GyroscopeData> extractGyro(
      List<num> x, List<num> y, List<num> z, List<DateTime> t, int scale) {
    List<GyroscopeData> data = [];

    for (int i = 0; i < t.length; i++) {
      data.add(GyroscopeData([x[i * scale], y[i * scale], z[i * scale]], t[i]));
    }
    return data;
  }

  /// Load all sensor data from database and conver it to expansion panel data
  Future<List<ExpansionData>> _asyncLoad() async {
    List<DiagnosticsModel> response = await ApiService.getDiagnostic();
    List<ExpansionData> list = [];
    for (int i = 0; i < response.length; i++) {
      list.add(ExpansionData(response[i], false));
    }
    return list;
  }
}
