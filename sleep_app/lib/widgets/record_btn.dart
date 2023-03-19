import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:sensors_plus/sensors_plus.dart';
import 'package:sleep_app/models/data.dart';
import 'package:sleep_app/models/diagnostic_model.dart';
import 'package:sleep_app/services/api_service.dart';
import 'package:stream_transform/stream_transform.dart';

class RecordButton extends StatefulWidget {
  const RecordButton({super.key});

  @override
  State<RecordButton> createState() => _RecordButtonState();
}

class _RecordButtonState extends State<RecordButton> {
  var btnText = ["Start Recording", "Stop Recording"];
  var isRecording = false;
  DateTime startTime = DateTime.now();
  final List<List<double>> _accelerometerData = List.filled(3, []);
  final List<List<double>> _gyroscopeData = List.filled(3, []);
  final _streamSubscriptions = <StreamSubscription<dynamic>>[];

  @override
  void initState() {
    super.initState();
    isRecording = false;
  }

  @override
  void dispose() {
    super.dispose();
    _stopStream();
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        shape: CircleBorder(),
        padding: EdgeInsets.all(24),
        backgroundColor: isRecording ? Color(0xFFDA6A6A) : Color(0xFF7F78AB),
        minimumSize: Size(230, 230),
      ),
      child: Text(
        isRecording ? btnText[1] : btnText[0],
        style: TextStyle(fontSize: 20),
      ),
      onPressed: () {
        if (isRecording == false) {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text("Do you want to start recording?"),
                actions: <TextButton>[
                  TextButton(
                    child: Text("Cancel"),
                    onPressed: () => Navigator.pop(context),
                  ),
                  TextButton(
                    child: Text("Yes"),
                    onPressed: () {
                      setState(() {
                        isRecording = true;
                        startTime = DateTime.now();
                      });
                      _record();
                      Navigator.pop(context);
                    },
                  ),
                ],
              );
            },
          );
        } else {
          setState(() {
            isRecording = false;
          });
          _stopStream();
          _insertData();
          print("Stopped recording");
        }
      },
    );
  }

  void _record() async {
    _accelerometerData.setAll(0, [[], [], []]);
    _gyroscopeData.setAll(0, [[], [], []]);
    _streamSubscriptions.add(
      accelerometerEvents.throttle(Duration(seconds: 1)).listen(
        (AccelerometerEvent event) {
          _accelerometerData[0].add(double.parse(event.x.toStringAsFixed(3)));
          _accelerometerData[1].add(double.parse(event.y.toStringAsFixed(3)));
          _accelerometerData[2].add(double.parse(event.z.toStringAsFixed(3)));
        },
      ),
    );
    _streamSubscriptions.add(
      gyroscopeEvents.throttle(Duration(seconds: 1)).listen(
        (GyroscopeEvent event) {
          _gyroscopeData[0].add(double.parse(event.x.toStringAsFixed(3)));
          _gyroscopeData[1].add(double.parse(event.y.toStringAsFixed(3)));
          _gyroscopeData[2].add(double.parse(event.z.toStringAsFixed(3)));
        },
      ),
    );
  }

  void _stopStream() {
    for (final subscription in _streamSubscriptions) {
      subscription.cancel();
    }
  }

  String _generateId() {
    var hexDigits = '0123456789abcdef';
    var rand = Random.secure();
    String id = "";
    for (int i = 0; i < 24; i++) {
      id += hexDigits[rand.nextInt(16)];
    }
    return id;
  }

  Future<void> _insertData() async {
    if (_accelerometerData[0].length < _gyroscopeData[0].length) {
      var l = _gyroscopeData[0].length;
      for (int i = 0; i < 3; i++) {
        _gyroscopeData[i].removeRange(_accelerometerData[0].length, l);
      }
    } else if (_accelerometerData[0].length > _gyroscopeData[0].length) {
      var l = _accelerometerData[0].length;
      for (int i = 0; i < 3; i++) {
        _accelerometerData[i].removeRange(_gyroscopeData[0].length, l);
      }
    }
    print("accel: ${_accelerometerData.length}");
    print("gyro: ${_gyroscopeData.length}");
    DateTime endTime =
        startTime.add(Duration(seconds: _accelerometerData[0].length));
    final data = DiagnosticsModel(
      id: _generateId(),
      patientId: DataModel.getId(),
      dataAcquisitionStartTime: startTime,
      dataAcquisitionEndTime: endTime,
      accelerationX: _accelerometerData[0],
      accelerationY: _accelerometerData[1],
      accelerationZ: _accelerometerData[2],
      angularAccelerationX: _gyroscopeData[0],
      angularAccelerationY: _gyroscopeData[1],
      angularAccelerationZ: _gyroscopeData[2],
    );
    final response = await ApiService.insertDiagnostic(data);
    print(response);
  }

  // Legacy: direct connection to DB
  // Future<void> _insertData() async {
  //   var id = M.ObjectId();
  //   final data = DiagnosticsModel(
  //       id: id,
  //       patientId: "testPatientID",
  //       dataAcquisitionStartTime: date,
  //       accelerationX: _accelerometerData[0],
  //       accelerationY: _accelerometerData[1],
  //       accelerationZ: _accelerometerData[2],
  //       angularAccelerationX: _gyroscopeData[0],
  //       angularAccelerationY: _gyroscopeData[1],
  //       angularAccelerationZ: _gyroscopeData[2],
  //       timeInterval: [0.0]);

  //   var result = await Database.insertDiagnostics(data);
  //   print(result);
  // }
}
